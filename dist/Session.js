"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Rsa_1 = require("./Crypto/Rsa");
const Aes_1 = require("./Crypto/Aes");
const Pbkdf2_1 = require("./Crypto/Pbkdf2");
exports.ALLOWED_ENVIROMENTS = ["SANDBOX", "PRODUCTION"];
exports.URL_ENVIROMENTS = {
    SANDBOX: "https://public-api.sandbox.bunq.com",
    PRODUCTION: "https://api.bunq.com"
};
class Session {
    constructor(storageInterface, loggerInterface) {
        this.apiKey = null;
        this.apiKeyIdentifier = null;
        this.encryptionKey = false;
        this.allowedIps = [];
        this.isOAuthKey = false;
        // rsa key storage
        this.publicKey = null;
        this.publicKeyPem = null;
        this.privateKey = null;
        this.privateKeyPem = null;
        this.serverPublicKey = null;
        this.serverPublicKeyPem = null;
        // installation info
        this.installCreated = null;
        this.installUpdated = null;
        this.installToken = null;
        this.deviceId = null;
        // session info
        this.sessionToken = null;
        this.sessionTokenId = null;
        this.sessionId = null;
        this.sessionExpiryTime = null;
        this.sessionTimeout = 0;
        this.sessionExpiryTimeChecker = null;
        this.userInfo = {};
        this.storageInterface = storageInterface;
        this.logger = loggerInterface;
        this.environmentType = "SANDBOX";
    }
    /**
     * Checks default values and looks in storage interface
     * @param {{forceNewKeypair: boolean}} options
     * @returns {Promise<void>}
     */
    async setup(apiKey, allowedIps = [], environment = "SANDBOX", encryptionKey = false) {
        if (this.apiKey && this.apiKey !== apiKey) {
            this.logger.debug("current apiKey set and changed");
        }
        if (this.environment !== null && environment !== this.environment && !!apiKey) {
            // we can't keep the session data if the environment changes
            await this.destroyInstallationMemory();
        }
        // create a unique identifier for this api key
        if (typeof apiKey === "string") {
            const derivedApiKey = await Pbkdf2_1.derivePasswordKey(apiKey.substring(0, 8), apiKey.substring(8, 16), 10000);
            // if already set and changed, we reset data stored in memory
            if (this.apiKeyIdentifier && this.apiKeyIdentifier !== derivedApiKey.key) {
                await this.destroyInstallationMemory();
            }
            this.apiKeyIdentifier = derivedApiKey.key;
        }
        this.apiKey = apiKey;
        this.allowedIps = allowedIps;
        this.environmentType = environment;
        // nothing to do if we don't have an encryption key
        if (!encryptionKey) {
            return false;
        }
        // validate the key
        if (!Aes_1.validateKey(encryptionKey)) {
            throw new Error("Invalid EAS key given! Invalid characters or length (16,24,32 length)");
        }
        this.encryptionKey = encryptionKey;
        // check if storage interface has a session stored
        const loadedStorage = await this.loadSession();
        // if there is no stored session but we have an key we setup a new keypair
        if (loadedStorage === false && this.encryptionKey !== false) {
            // setup the required rsa keypair
            await this.setupKeypair();
        }
        return true;
    }
    /**
     * Updates the encryption key and stores data using that new key
     * @param {string} encryptionKey
     * @returns {Promise<boolean>}
     */
    async setEncryptionKey(encryptionKey) {
        // validate the key
        if (!Aes_1.validateKey(encryptionKey)) {
            throw new Error("Invalid EAS key given! Invalid characters or length (16,24,32 length)");
        }
        this.encryptionKey = encryptionKey;
        // overwrite the session data with the new encryption key
        await this.storeSession();
        return true;
    }
    /**
     * Setup the keypair and generate a new one when required
     * @param {boolean} forceNewKeypair
     * @param {boolean} ignoreCI - if true the hardcoded certs won't be used even if process.env.CI is set
     * @returns {Promise<boolean>}
     */
    async setupKeypair(forceNewKeypair = false, bitSize = 2048, ignoreCI = false) {
        if (forceNewKeypair === false && this.publicKey !== null && this.privateKey !== null) {
            return true;
        }
        // check if we are in a CI environment
        if (typeof process !== "undefined" && process.env.ENV_CI === "true" && ignoreCI === false) {
            // use the stored CI variables instead of creating a new on
            this.publicKeyPem = process.env.CI_PUBLIC_KEY_PEM;
            this.privateKeyPem = process.env.CI_PRIVATE_KEY_PEM;
            this.publicKey = await Rsa_1.publicKeyFromPem(this.publicKeyPem);
            this.privateKey = await Rsa_1.privateKeyFromPem(this.privateKeyPem);
        }
        else {
            // generate a new keypair and format as pem
            const keyPair = await Rsa_1.createKeyPair(bitSize);
            const { publicKey, privateKey } = await Rsa_1.keyPairToPem(keyPair);
            this.publicKey = keyPair.publicKey;
            this.privateKey = keyPair.privateKey;
            this.publicKeyPem = publicKey;
            this.privateKeyPem = privateKey;
        }
        return true;
    }
    /**
     * Checks if a session is stored and verifies/loads it into this instance
     * @returns {Promise.<boolean>}
     */
    async loadSession() {
        this.logger.debug(" === Loading session data === " + this.storageKeyLocation);
        // try to load the session interface
        const encryptedSession = await this.asyncStorageGet(this.storageKeyLocation);
        // no session found stored
        if (encryptedSession === undefined || encryptedSession === null) {
            this.logger.debug("No stored session found");
            return false;
        }
        let session;
        try {
            // decrypt the stored sesion
            session = await this.decryptSession(encryptedSession);
        }
        catch (error) {
            this.logger.debug("Failed to decrypt session");
            this.logger.debug(error);
            // failed to decrypt the session, return false
            return false;
        }
        // api keys dont match, this session is outdated
        if (this.apiKey !== false && this.apiKey !== null && session.apiKey !== this.apiKey) {
            this.logger.debug("Api key changed or is different (api key could be empty)");
            return false;
        }
        // different environment stored, destroy old session
        if (session.environment !== this.environment) {
            this.logger.debug("Environment changed, delete existing session");
            await this.destroySession();
            return false;
        }
        this.environment = session.environment;
        // overwrite our current properties with the stored version
        this.publicKeyPem = session.publicKeyPem;
        this.privateKeyPem = session.privateKeyPem;
        this.serverPublicKeyPem = session.serverPublicKeyPem;
        if (this.privateKeyPem !== null) {
            this.privateKey = await Rsa_1.privateKeyFromPem(session.privateKeyPem);
        }
        if (this.publicKeyPem !== null) {
            this.publicKey = await Rsa_1.publicKeyFromPem(session.publicKeyPem);
        }
        if (this.serverPublicKeyPem !== null) {
            this.serverPublicKey = await Rsa_1.publicKeyFromPem(session.serverPublicKeyPem);
        }
        this.installToken = session.installToken;
        this.installCreated = session.installCreated;
        this.installUpdated = session.installUpdated;
        this.sessionId = session.sessionId;
        this.sessionToken = session.sessionToken;
        this.sessionTimeout = session.sessionTimeout;
        this.sessionExpiryTime = new Date(session.sessionExpiryTime);
        this.deviceId = session.deviceId;
        this.userInfo = session.userInfo;
        this.logger.debug(`sessionId: ${session.sessionId}`);
        this.logger.debug(`installCreated: ${session.installCreated}`);
        this.logger.debug(`installUpdated: ${session.installUpdated}`);
        this.logger.debug(`sessionExpiryTime: ${session.sessionExpiryTime}`);
        this.logger.debug(`deviceId: ${session.deviceId}`);
        // if we have a stored installation but no session we reset to prevent
        // creating two sessions for a single installation
        if (this.verifyInstallation() && this.verifyDeviceInstallation() && !this.verifySessionInstallation()) {
            await this.destroyApiSession(true);
            return false;
        }
        try {
            this.logger.debug(`sessionToken: ${session.sessionToken === null ? null : session.sessionToken.substring(0, 5)}`);
            this.logger.debug(`installToken: ${session.installToken === null ? null : session.installToken.substring(0, 5)}`);
        }
        catch (error) { }
        return true;
    }
    /**
     * Stores this session using the storageInterface
     * @returns {Promise.<void>}
     */
    async storeSession() {
        const dataToStore = {
            environment: this.environment,
            apiKey: this.apiKey,
            publicKeyPem: this.publicKeyPem,
            privateKeyPem: this.privateKeyPem,
            serverPublicKeyPem: this.serverPublicKeyPem,
            installUpdated: this.installUpdated,
            installCreated: this.installCreated,
            installToken: this.installToken,
            sessionId: this.sessionId,
            sessionToken: this.sessionToken,
            sessionExpiryTime: this.sessionExpiryTime,
            sessionTimeout: this.sessionTimeout,
            userInfo: this.userInfo,
            deviceId: this.deviceId
        };
        const serializedData = JSON.stringify(dataToStore);
        // encrypt the data with our encryption key
        return await this.encryptSession(serializedData);
    }
    /**
     * Resets all values to default and remove data from storage
     * @returns {Promise<void>}
     */
    async destroySession() {
        this.logger.debug(` -> #destroySession() `);
        this.apiKey = null;
        this.userInfo = {};
        await this.destroyApiSession();
        await this.destroyApiInstallation();
        await this.destroyApiDeviceInstallation();
        return await this.asyncStorageRemove(this.storageKeyLocation);
    }
    /**
     * Removes info from the object, keeps stored data in
     * @param {boolean} save
     * @returns {Promise<boolean>}
     */
    async destroyInstallationMemory() {
        this.logger.debug(` -> #destroyInstallationMemory() `);
        this.userInfo = {};
        this.sessionId = null;
        this.sessionToken = null;
        this.sessionTokenId = null;
        this.sessionTimeout = null;
        this.sessionExpiryTime = null;
        this.publicKey = null;
        this.publicKeyPem = null;
        this.privateKey = null;
        this.privateKeyPem = null;
        this.serverPublicKey = null;
        this.serverPublicKeyPem = null;
        this.installUpdated = null;
        this.installCreated = null;
        this.installToken = null;
        this.deviceId = null;
    }
    /**
     * Destroys only the data associated with the api session
     * @param {boolean} save
     * @returns {Promise<undefined>}
     */
    async destroyApiSession(save = false) {
        this.logger.debug(` -> #destroyApiSession(${save}) `);
        this.userInfo = {};
        this.sessionId = null;
        this.sessionToken = null;
        this.sessionTokenId = null;
        this.sessionTimeout = null;
        this.sessionExpiryTime = null;
        if (save)
            return await this.storeSession();
    }
    /**
     * Destroys only the data associated with the installation
     * @param {boolean} save
     * @returns {Promise<undefined>}
     */
    async destroyApiInstallation(save = false) {
        this.logger.debug(` -> #destroyApiInstallation(${save}) `);
        this.publicKey = null;
        this.publicKeyPem = null;
        this.privateKey = null;
        this.privateKeyPem = null;
        this.serverPublicKey = null;
        this.serverPublicKeyPem = null;
        this.installUpdated = null;
        this.installCreated = null;
        this.installToken = null;
        if (save)
            return await this.storeSession();
    }
    /**
     * Destroys only the data associated with the device installation
     * @param {boolean} save
     * @returns {Promise<undefined>}
     */
    async destroyApiDeviceInstallation(save = false) {
        this.logger.debug(` -> #destroyApiDeviceInstallation(${save}) `);
        this.deviceId = null;
        if (save)
            return await this.storeSession();
    }
    /**
     * Attempt to decrypt the session data with our stored IV and encryption key
     * @param encryptedSession
     * @returns {Promise<any>}
     */
    async decryptSession(encryptedSession) {
        const IV = await this.asyncStorageGet(this.storageIvLocation);
        if (this.encryptionKey === false) {
            throw new Error("No encryption key is set, failed to decrypt session");
        }
        // attempt to decrypt the string
        const decryptedSession = await Aes_1.decryptString(encryptedSession, this.encryptionKey, IV);
        return JSON.parse(decryptedSession);
    }
    /**
     * Attempt to encrypt the session data with encryption key
     * @param sessionData
     * @returns {Promise<boolean>}
     */
    async encryptSession(sessionData) {
        if (!this.encryptionKey)
            return false;
        // attempt to decrypt the string
        const encryptedData = await Aes_1.encryptString(sessionData, this.encryptionKey);
        // store the new IV and encrypted data
        const ivStorageSuccess = this.asyncStorageSet(this.storageIvLocation, encryptedData.iv);
        const dataStorageSuccess = this.asyncStorageSet(this.storageKeyLocation, encryptedData.encryptedString);
        // await here so we do the storage calls asyncronously
        await ivStorageSuccess;
        await dataStorageSuccess;
        return true;
    }
    /**
     * @param data
     * @param {string} data_location
     * @param {string} iv_location
     * @returns {Promise<boolean>}
     */
    async storeEncryptedData(data, location) {
        if (!this.encryptionKey)
            return false;
        // attempt to decrypt the string
        const encryptedData = await Aes_1.encryptString(JSON.stringify(data), this.encryptionKey);
        // store the new IV and encrypted data
        const ivStorage = this.asyncStorageSet(`${location}_IV`, encryptedData.iv);
        const dataStorage = this.asyncStorageSet(location, encryptedData.encryptedString);
        await ivStorage;
        await dataStorage;
        return true;
    }
    /**
     * @param {string} data_location
     * @param {string} iv_location
     * @returns {Promise<any>}
     */
    async loadEncryptedData(data_location, iv_location = null) {
        // set default value for IV location in case none is given
        iv_location = iv_location === null ? `${data_location}_IV` : iv_location;
        // load the data from storage
        const storedData = await this.asyncStorageGet(data_location);
        const storedIv = await this.asyncStorageGet(iv_location);
        // check if both values are found
        if (storedData === undefined || storedData === null || storedIv === undefined || storedIv === null) {
            return false;
        }
        if (this.encryptionKey === false) {
            throw new Error("No encryption key is set, failed to decrypt data");
        }
        // attempt to decrypt the data
        const decryptedSession = await Aes_1.decryptString(storedData, this.encryptionKey, storedIv);
        return JSON.parse(decryptedSession);
    }
    /**
     * Wrapper around the storage interface for remove calls
     * @param key
     * @param {boolean} silent
     * @returns {Promise<any>}
     */
    async asyncStorageRemove(key, silent = false) {
        try {
            return await this.storageInterface.remove(key);
        }
        catch (error) {
            if (silent) {
                return undefined;
            }
            throw error;
        }
    }
    /**
     * Wrapper around the storage interface for get calls
     * @param key
     * @param {boolean} silent
     * @returns {Promise<any>}
     */
    async asyncStorageGet(key, silent = false) {
        try {
            return await this.storageInterface.get(key);
        }
        catch (error) {
            if (silent) {
                return undefined;
            }
            throw error;
        }
    }
    /**
     * Wrapper around the storage interface for set calls
     * @param key
     * @param value
     * @param {boolean} silent
     * @returns {Promise<any>}
     */
    async asyncStorageSet(key, value, silent = false) {
        try {
            return await this.storageInterface.set(key, value);
        }
        catch (error) {
            if (silent) {
                return undefined;
            }
            throw error;
        }
    }
    /**
     * Checks if this session has a succesful installation stored
     * @returns {boolean}
     */
    verifyInstallation() {
        this.logger.debug(" === Testing installation === ");
        const installationValid = this.serverPublicKey !== null && this.installToken !== null;
        this.logger.debug("Installation valid: " + installationValid);
        this.logger.debug("this.serverPublicKey = " + this.serverPublicKey);
        this.logger.debug(`this.installToken = ${this.installToken === null ? null : this.installToken.substring(0, 5)}`);
        return installationValid;
    }
    /**
     * Checks if this session has a succesful device installation stored
     * @returns {boolean}
     */
    verifyDeviceInstallation() {
        this.logger.debug(" === Testing device installation === ");
        const deviceValid = this.deviceId !== null;
        this.logger.debug("Device valid: " + deviceValid);
        this.logger.debug("this.deviceId: " + this.deviceId);
        return deviceValid;
    }
    /**
     * Checks if this session has a succesful session setup
     * @returns {boolean}
     */
    verifySessionInstallation() {
        if (this.sessionId === null) {
            this.logger.debug(" === Session invalid: sessionId null === ");
            return false;
        }
        if (!this.verifySessionExpiry())
            return false;
        return true;
    }
    /**
     * Checks if session has expired yet
     * @returns {boolean}
     */
    verifySessionExpiry() {
        const currentTime = new Date();
        if (this.sessionExpiryTime.getTime() <= currentTime.getTime()) {
            this.logger.debug(" === Session invalid: expired === ");
            this.logger.debug("this.sessionExpiryTime.getTime() = " + this.sessionExpiryTime.getTime());
            this.logger.debug("currentTime.getTime() = " + currentTime.getTime());
            return false;
        }
        return true;
    }
    /**
     * Set enviroment and check if type is allowed/valid
     * @param environmentType
     */
    set environmentType(environmentType) {
        if (exports.ALLOWED_ENVIROMENTS.includes(environmentType)) {
            this.environment = environmentType;
            this.environmentUrl = exports.URL_ENVIROMENTS[this.environment];
            // set the storage location for the environment
            this.storageKeyLocation = `BUNQJSCLIENT_${this.environment}_SESSION_${this.apiKeyIdentifier}`;
            this.storageIvLocation = `BUNQJSCLIENT_${this.environment}_IV_${this.apiKeyIdentifier}`;
            return;
        }
        throw new Error("Invalid enviroment given. " + JSON.stringify(exports.ALLOWED_ENVIROMENTS));
    }
}
exports.default = Session;
