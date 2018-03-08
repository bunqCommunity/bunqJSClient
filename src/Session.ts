import {
    createKeyPair,
    keyPairToPem,
    publicKeyFromPem,
    privateKeyFromPem
} from "./Crypto/Rsa";
import { encryptString, decryptString } from "./Crypto/Aes";
import StorageInterface from "./Interfaces/StorageInterface";
import LoggerInterface from "./Interfaces/LoggerInterface";

type UrlEnviromentType = {
    [key: string]: string;
};

export const ALLOWED_ENVIROMENTS: string[] = ["SANDBOX", "PRODUCTION"];
export const URL_ENVIROMENTS: UrlEnviromentType = {
    SANDBOX: "https://sandbox.public.api.bunq.com",
    PRODUCTION: "https://api.bunq.com"
};

export default class Session {
    public storageInterface: StorageInterface;
    public logger: LoggerInterface;
    public apiKey: string | boolean = null;
    public encryptionKey: string | boolean = false;
    public allowdIps: string[] = [];

    // target enviroment and target envoriment api url
    public environment: string;
    public environmentUrl: string;

    // rsa key storage
    public publicKey: any = null;
    public publicKeyPem: string = null;
    public privateKey: any = null;
    public privateKeyPem: string = null;
    public serverPublicKey: string = null;
    public serverPublicKeyPem: string = null;

    // installation info
    public installCreated?: Date = null;
    public installUpdated?: Date = null;
    public installToken: string = null;
    public deviceId: number = null;

    // session info
    public sessionToken: string = null;
    public sessionTokenId: string | number = null;
    public sessionId: number = null;
    public sessionExpiryTime?: Date = null;
    public userInfo: any = {};

    // key used to store our data
    public storageKeyLocation: string;
    public storageIvLocation: string;

    constructor(
        storageInterface: StorageInterface,
        loggerInterface: LoggerInterface
    ) {
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
    public async setup(
        apiKey: string | boolean,
        allowedIps: string[] = [],
        environment: string = "SANDBOX",
        encryptionKey: string | boolean = false
    ) {
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
    public async setupKeypair(
        forceNewKeypair: boolean = false,
        bitSize: number = 2048,
        ignoreCI: boolean = false
    ) {
        if (
            forceNewKeypair === false &&
            this.publicKey !== null &&
            this.privateKey !== null
        ) {
            return true;
        }

        // check if we are in a CI environment
        if (
            typeof process !== "undefined" &&
            process.env.ENV_CI === "true" &&
            ignoreCI === false
        ) {
            // use the stored CI variables instead of creating a new on
            this.publicKeyPem = process.env.CI_PUBLIC_KEY_PEM;
            this.privateKeyPem = process.env.CI_PRIVATE_KEY_PEM;

            this.publicKey = await publicKeyFromPem(this.publicKeyPem);
            this.privateKey = await privateKeyFromPem(this.privateKeyPem);
        } else {
            // generate a new keypair and format as pem
            const keyPair = await createKeyPair(bitSize);
            const { publicKey, privateKey } = await keyPairToPem(keyPair);

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
    public async loadSession() {
        this.logger.debug(" === Loading session data === ");
        // try to load the session interface
        const encryptedSession = await this.asyncStorageGet(
            this.storageKeyLocation
        );

        // no session found stored
        if (encryptedSession === undefined || encryptedSession === null) {
            this.logger.debug("No stored session found");
            return false;
        }

        let session: any;
        try {
            // decrypt the stored sesion
            session = await this.decryptSession(encryptedSession);
        } catch (error) {
            this.logger.debug("Failed to decrypt session");
            this.logger.debug(error);
            // failed to decrypt the session, return false
            return false;
        }

        // api keys dont match, this session is outdated
        if (
            this.apiKey !== false &&
            this.apiKey !== null &&
            session.apiKey !== this.apiKey
        ) {
            this.logger.debug(
                "Api key changed or is different (api key could be empty)"
            );
            return false;
        }

        // different environment stored, destroy old session
        if (session.environment !== this.environment) {
            this.logger.debug("Environment changed, delete existing session");
            await this.destroySession();
            return false;
        }

        // overwrite our current properties with the stored version
        this.environment = session.environment;
        this.publicKeyPem = session.publicKeyPem;
        this.privateKeyPem = session.privateKeyPem;
        this.serverPublicKeyPem = session.serverPublicKeyPem;
        if (this.privateKeyPem !== null) {
            this.privateKey = await privateKeyFromPem(session.privateKeyPem);
        }
        if (this.publicKeyPem !== null) {
            this.publicKey = await publicKeyFromPem(session.publicKeyPem);
        }
        if (this.serverPublicKeyPem !== null) {
            this.serverPublicKey = await publicKeyFromPem(
                session.serverPublicKeyPem
            );
        }
        this.installToken = session.installToken;
        this.installCreated = session.installCreated;
        this.installUpdated = session.installUpdated;
        this.sessionId = session.sessionId;
        this.sessionToken = session.sessionToken;
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

            // reset session and set the apiKey again to the original value
            await this.destroySession();
            this.apiKey = apiKey;

            return false;
        }

        try {
            this.logger.debug(
                `sessionToken: ${session.sessionToken === null
                    ? null
                    : session.sessionToken.substring(0, 5)}`
            );
            this.logger.debug(
                `installToken: ${session.installToken === null
                    ? null
                    : session.installToken.substring(0, 5)}`
            );
        } catch (error) {}

        return true;
    }

    /**
     * Stores this session using the storageInterface
     * @returns {Promise.<void>}
     */
    public async storeSession() {
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
    public async destroySession() {
        this.apiKey = null;
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
        this.userInfo = {};
        this.sessionId = null;
        this.sessionToken = null;
        this.sessionTokenId = null;
        this.sessionExpiryTime = null;

        return await this.asyncStorageRemove(this.storageKeyLocation);
    }

    /**
     * Attempt to decrypt the session data with our stored IV and encryption key
     * @param encryptedSession
     * @returns {Promise<any>}
     */
    private decryptSession = async encryptedSession => {
        const IV = await this.asyncStorageGet(this.storageIvLocation);

        if (this.encryptionKey === false) {
            throw new Error(
                "No encryption key is set, failed to decrypt session"
            );
        }

        // attempt to decrypt the string
        const decryptedSession = await decryptString(
            encryptedSession,
            this.encryptionKey,
            IV
        );

        return JSON.parse(decryptedSession);
    };

    /**
     * Attempt to encrypt the session data with encryption key
     * @param sessionData
     * @returns {Promise<boolean>}
     */
    private encryptSession = async sessionData => {
        // attempt to decrypt the string
        const encryptedData = await encryptString(
            sessionData,
            this.encryptionKey
        );

        // store the new IV and encrypted data
        const ivStorageSuccess = this.asyncStorageSet(
            this.storageIvLocation,
            encryptedData.iv
        );
        const dataStorageSuccess = this.asyncStorageSet(
            this.storageKeyLocation,
            encryptedData.encryptedString
        );

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
    public storeEncryptedData = async (data: any, location: string) => {
        // attempt to decrypt the string
        const encryptedData = await encryptString(
            JSON.stringify(data),
            this.encryptionKey
        );

        // store the new IV and encrypted data
        const ivStorage = this.asyncStorageSet(
            `${location}_IV`,
            encryptedData.iv
        );
        const dataStorage = this.asyncStorageSet(
            location,
            encryptedData.encryptedString
        );

        await ivStorage;
        await dataStorage;

        return true;
    };

    /**
     * @param {string} data_location
     * @param {string} iv_location
     * @returns {Promise<any>}
     */
    public loadEncryptedData = async (
        data_location: string,
        iv_location: string = null
    ) => {
        // set default value for IV location in case none is given
        iv_location =
            iv_location === null ? `${data_location}_IV` : iv_location;

        // load the data from storage
        const storedData = await this.asyncStorageGet(data_location);
        const storedIv = await this.asyncStorageGet(iv_location);

        // check if both values are found
        if (
            storedData === undefined ||
            storedData === null ||
            storedIv === undefined ||
            storedIv === null
        ) {
            return false;
        }

        if (this.encryptionKey === false) {
            throw new Error("No encryption key is set, failed to decrypt data");
        }

        // attempt to decrypt the data
        const decryptedSession = await decryptString(
            storedData,
            this.encryptionKey,
            storedIv
        );

        return JSON.parse(decryptedSession);
    };

    /**
     * Wrapper around the storage interface for remove calls
     * @param key
     * @param {boolean} silent
     * @returns {Promise<any>}
     */
    public asyncStorageRemove = async (
        key: string,
        silent: boolean = false
    ) => {
        try {
            return await this.storageInterface.remove(key);
        } catch (error) {
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
    public asyncStorageGet = async (key: string, silent: boolean = false) => {
        try {
            return await this.storageInterface.get(key);
        } catch (error) {
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
    public asyncStorageSet = async (
        key: string,
        value: any,
        silent: boolean = false
    ) => {
        try {
            return await this.storageInterface.set(key, value);
        } catch (error) {
            if (silent) {
                return undefined;
            }
            throw error;
        }
    };

    /**
     * Checks if this session has a succesful installation stored
     * @returns {Promise<boolean>}
     */
    public verifyInstallation(): boolean {
        this.logger.debug(" === Testing installation === ");
        const installationValid =
            this.serverPublicKey !== null && this.installToken !== null;

        this.logger.debug("Installation valid: " + installationValid);
        this.logger.debug("this.serverPublicKey = " + this.serverPublicKey);
        this.logger.debug(
            `this.installToken = ${this.installToken === null
                ? null
                : this.installToken.substring(0, 5)}`
        );

        return installationValid;
    }

    /**
     * Checks if this session has a succesful device installation stored
     * @returns {Promise<boolean>}
     */
    public verifyDeviceInstallation() {
        this.logger.debug(" === Testing device installation === ");
        const deviceValid = this.deviceId !== null;
        this.logger.debug("Device valid: " + deviceValid);
        this.logger.debug("this.deviceId: " + this.deviceId);
        return deviceValid;
    }

    /**
     * Checks if this session has a succesful session setup
     * @returns {Promise<boolean>}
     */
    public verifySessionInstallation() {
        this.logger.debug(" === Testing session installation === ");
        this.logger.debug(`this.sessionId = ${this.sessionId}`);
        this.logger.debug(
            `this.sessionToken = ${this.sessionToken === null
                ? null
                : this.sessionToken.substring(0, 5)}`
        );

        if (this.sessionId === null) {
            this.logger.debug("Session invalid: sessionId null");
            return false;
        }

        const currentTime = new Date();
        if (this.sessionExpiryTime.getTime() <= currentTime.getTime()) {
            this.logger.debug("Session invalid: expired");
            this.logger.debug(
                "this.sessionExpiryTime.getTime() = " +
                    this.sessionExpiryTime.getTime()
            );
            this.logger.debug(
                "currentTime.getTime() = " + currentTime.getTime()
            );
            return false;
        }

        this.logger.debug("Session valid: true");
        return true;
    }

    /**
     * Set enviroment and check if type is allowed/valid
     * @param environmentType
     */
    set environmentType(environmentType: string) {
        if (ALLOWED_ENVIROMENTS.includes(environmentType)) {
            this.environment = environmentType;
            this.environmentUrl = URL_ENVIROMENTS[this.environment];
            return;
        }
        throw new Error(
            "Invalid enviroment given. " + JSON.stringify(ALLOWED_ENVIROMENTS)
        );
    }
}
