"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Rsa_1 = require("./Crypto/Rsa");
const Aes_1 = require("./Crypto/Aes");
exports.ALLOWED_ENVIROMENTS = ["SANDBOX", "PRODUCTION"];
exports.URL_ENVIROMENTS = {
    SANDBOX: "https://sandbox.public.api.bunq.com",
    PRODUCTION: "https://api.bunq.com"
};
class Session {
    constructor(storageInterface, loggerInterface) {
        this.apiKey = null;
        this.encryptionKey = false;
        this.allowdIps = [];
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
        /**
         * Attempt to decrypt the session data with our stored IV and encryption key
         * @param encryptedSession
         * @returns {Promise<any>}
         */
        this.decryptSession = async (encryptedSession) => {
            const IV = await this.asyncStorageGet(this.storageIvLocation);
            if (this.encryptionKey === false) {
                throw new Error("No encryption key is set, failed to decrypt session");
            }
            // attempt to decrypt the string
            const decryptedSession = await Aes_1.decryptString(encryptedSession, this.encryptionKey, IV);
            return JSON.parse(decryptedSession);
        };
        /**
         * Attempt to encrypt the session data with encryption key
         * @param sessionData
         * @returns {Promise<boolean>}
         */
        this.encryptSession = async (sessionData) => {
            // attempt to decrypt the string
            const encryptedData = await Aes_1.encryptString(sessionData, this.encryptionKey);
            // store the new IV and encrypted data
            const ivStorageSuccess = this.asyncStorageSet(this.storageIvLocation, encryptedData.iv);
            const dataStorageSuccess = this.asyncStorageSet(this.storageKeyLocation, encryptedData.encryptedString);
            // await here so we do the storage calls asyncronously
            await ivStorageSuccess;
            await dataStorageSuccess;
            return true;
        };
        /**
         * @param data
         * @param {string} data_location
         * @param {string} iv_location
         * @returns {Promise<boolean>}
         */
        this.storeEncryptedData = async (data, location) => {
            // attempt to decrypt the string
            const encryptedData = await Aes_1.encryptString(JSON.stringify(data), this.encryptionKey);
            // store the new IV and encrypted data
            const ivStorage = this.asyncStorageSet(`${location}_IV`, encryptedData.iv);
            const dataStorage = this.asyncStorageSet(location, encryptedData.encryptedString);
            await ivStorage;
            await dataStorage;
            return true;
        };
        /**
         * @param {string} data_location
         * @param {string} iv_location
         * @returns {Promise<any>}
         */
        this.loadEncryptedData = async (data_location, iv_location = null) => {
            // set default value for IV location in case none is given
            iv_location =
                iv_location === null ? `${data_location}_IV` : iv_location;
            // load the data from storage
            const storedData = await this.asyncStorageGet(data_location);
            const storedIv = await this.asyncStorageGet(iv_location);
            // check if both values are found
            if (storedData === undefined ||
                storedData === null ||
                storedIv === undefined ||
                storedIv === null) {
                return false;
            }
            if (this.encryptionKey === false) {
                throw new Error("No encryption key is set, failed to decrypt data");
            }
            // attempt to decrypt the data
            const decryptedSession = await Aes_1.decryptString(storedData, this.encryptionKey, storedIv);
            return JSON.parse(decryptedSession);
        };
        /**
         * Wrapper around the storage interface for remove calls
         * @param key
         * @param {boolean} silent
         * @returns {Promise<any>}
         */
        this.asyncStorageRemove = async (key, silent = false) => {
            try {
                return await this.storageInterface.remove(key);
            }
            catch (error) {
                if (silent) {
                    return undefined;
                }
                throw error;
            }
        };
        /**
         * Wrapper around the storage interface for get calls
         * @param key
         * @param {boolean} silent
         * @returns {Promise<any>}
         */
        this.asyncStorageGet = async (key, silent = false) => {
            try {
                return await this.storageInterface.get(key);
            }
            catch (error) {
                if (silent) {
                    return undefined;
                }
                throw error;
            }
        };
        /**
         * Wrapper around the storage interface for set calls
         * @param key
         * @param value
         * @param {boolean} silent
         * @returns {Promise<any>}
         */
        this.asyncStorageSet = async (key, value, silent = false) => {
            try {
                return await this.storageInterface.set(key, value);
            }
            catch (error) {
                if (silent) {
                    return undefined;
                }
                throw error;
            }
        };
        this.storageInterface = storageInterface;
        this.logger = loggerInterface;
        this.environmentType = "SANDBOX";
        this.storageKeyLocation = `BUNQJSCLIENT_${this.environment}_SESSION`;
        this.storageIvLocation = `BUNQJSCLIENT_${this.environment}_IV`;
    }
    /**
     * Checks default values and looks in storage interface
     * @param {{forceNewKeypair: boolean}} options
     * @returns {Promise<void>}
     */
    async setup(apiKey, allowedIps = [], environment = "SANDBOX", encryptionKey = false) {
        if (this.apiKey !== null && this.apiKey !== apiKey) {
            this.logger.debug("current apiKey not null and changed");
        }
        if (this.environment !== null && environment !== this.environment) {
            this.logger.debug("current environmentType not null and changed");
            // we can't keep the session data if the environment changes
            await this.destroySession();
        }
        this.apiKey = apiKey;
        this.allowdIps = allowedIps;
        this.environmentType = environment;
        this.encryptionKey = encryptionKey;
        // nothing to do if we don't have an encryption key
        if (encryptionKey === false) {
            return false;
        }
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
     * Setup the keypair and generate a new one when required
     * @param {boolean} forceNewKeypair
     * @param {boolean} ignoreCI - if true the hardcoded certs won't be used even if process.env.CI is set
     * @returns {Promise<boolean>}
     */
    async setupKeypair(forceNewKeypair = false, bitSize = 2048, ignoreCI = false) {
        if (forceNewKeypair === false &&
            this.publicKey !== null &&
            this.privateKey !== null) {
            return true;
        }
        // check if we are in a CI environment
        if (typeof process !== "undefined" &&
            process.env.ENV_CI === "true" &&
            ignoreCI === false) {
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
        this.logger.debug(" === Loading session data === ");
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
        if (this.apiKey !== false &&
            this.apiKey !== null &&
            session.apiKey !== this.apiKey) {
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
        if (this.verifyInstallation() && !this.verifySessionInstallation()) {
            const apiKey = this.apiKey + ""; // copy key while preventing reference issues
            if (this.verifySessionExpiry() === false) {
                // session expired so we don't have to destroy the device and installation
                this.logger.debug(`reseting api session data`);
                await this.destroyApiSession(true);
            }
            else {
                // reset all data and reset the apiKey
                this.logger.debug(`reseting all data`);
                await this.destroySession();
                this.apiKey = apiKey;
            }
            return false;
        }
        try {
            this.logger.debug(`sessionToken: ${session.sessionToken === null
                ? null
                : session.sessionToken.substring(0, 5)}`);
            this.logger.debug(`installToken: ${session.installToken === null
                ? null
                : session.installToken.substring(0, 5)}`);
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
     * Destroys only the data associated with the api session
     * @param {boolean} save
     * @returns {Promise<undefined>}
     */
    async destroyApiSession(save = false) {
        this.logger.debug(` -> #destroyApiSession(${save}) `);
        this.sessionId = null;
        this.sessionToken = null;
        this.sessionTokenId = null;
        this.sessionTimeout = null;
        this.sessionExpiryTime = null;
        if (save)
            return await this.asyncStorageRemove(this.storageKeyLocation);
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
            return await this.asyncStorageRemove(this.storageKeyLocation);
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
            await this.asyncStorageRemove(this.storageKeyLocation);
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
        this.logger.debug(`this.installToken = ${this.installToken === null
            ? null
            : this.installToken.substring(0, 5)}`);
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
        this.logger.debug(" === Testing session installation === ");
        this.logger.debug(`this.sessionId = ${this.sessionId}`);
        this.logger.debug(`this.sessionToken = ${this.sessionToken === null
            ? null
            : this.sessionToken.substring(0, 5)}`);
        if (this.sessionId === null) {
            this.logger.debug("Session invalid: sessionId null");
            return false;
        }
        if (!this.verifySessionExpiry()) {
            return false;
        }
        this.logger.debug("Session valid: true");
        return true;
    }
    /**
     * Checks if session has expired yet
     * @returns {boolean}
     */
    verifySessionExpiry() {
        const currentTime = new Date();
        if (this.sessionExpiryTime.getTime() <= currentTime.getTime()) {
            this.logger.debug("Session invalid: expired");
            this.logger.debug("this.sessionExpiryTime.getTime() = " +
                this.sessionExpiryTime.getTime());
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
            return;
        }
        throw new Error("Invalid enviroment given. " + JSON.stringify(exports.ALLOWED_ENVIROMENTS));
    }
}
exports.default = Session;
