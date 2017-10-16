import { stringToHash } from "./Crypto/Sha256";
import {
    createKeyPair,
    keyPairToPem,
    publicKeyFromPem,
    privateKeyFromPem
} from "./Crypto/Rsa";
import StorageInterface from "./Interfaces/StorageInterface";

type UrlEnviromentType = {
    [key: string]: string;
};

export const ALLOWED_ENVIROMENTS: string[] = ["SANDBOX"];
export const URL_ENVIROMENTS: UrlEnviromentType = {
    SANDBOX: "https://sandbox.public.api.bunq.com",
    PRODUCTION: "https://api.bunq.com"
};

export default class Session {
    storageInterface: StorageInterface;
    apiKey: string | boolean = null;
    allowdIps: string[] = [];

    // target enviroment and target envoriment api url
    environment: string;
    environmentUrl: string;

    // rsa key storage
    publicKey: any = null;
    publicKeyPem: string = null;
    privateKey: any = null;
    privateKeyPem: string = null;
    serverPublicKey: string = null;
    serverPublicKeyPem: string = null;

    // installation info
    installCreated?: Date = null;
    installUpdated?: Date = null;
    installToken: string = null;
    deviceId: number = null;

    // session info
    sessionToken: string = null;
    sessionId: number = null;
    sessionExpiryTime?: Date = null;
    userInfo: any = {};

    // key used to store our data
    storageKey: string = null;

    constructor(storageInterface: StorageInterface) {
        this.storageInterface = storageInterface;

        this.environmentType = "SANDBOX";
        this.environmentUrl = URL_ENVIROMENTS[this.environment];
        this.storageKey = `${this.environment}_session`;
    }

    /**
     * Checks default values and looks in storage interface
     * @param {{forceNewKeypair: boolean}} options
     * @returns {Promise<void>}
     */
    public async setup(
        apiKey: string,
        allowedIps: string[] = [],
        options = { forceNewKeypair: false }
    ) {
        if (
            this.apiKey !== null &&
            this.apiKey !== false &&
            this.apiKey !== apiKey
        ) {
            // new apikey was set, destroy the old session first
            // await this.destroySession();
        }
        this.apiKey = apiKey;
        this.allowdIps = allowedIps;

        // check if storage interface has a session stored
        await this.loadSession();

        // setup the required rsa keypair
        await this.setupKeypair(options.forceNewKeypair);
    }

    /**
     * Setup the keypair and generate a new one when required
     * @param forceNewKeypair
     * @returns {Promise.<boolean>}
     */
    private async setupKeypair(forceNewKeypair: boolean = false) {
        if (
            forceNewKeypair === false &&
            this.publicKey !== null &&
            this.privateKey !== null
        ) {
            return true;
        }

        // generate a new keypair and format as pem
        const keyPair = await createKeyPair();
        const { publicKey, privateKey } = await keyPairToPem(keyPair);

        this.publicKey = keyPair.publicKey;
        this.privateKey = keyPair.privateKey;
        this.publicKeyPem = publicKey;
        this.privateKeyPem = privateKey;
        return true;
    }

    /**
     * Checks if a session is stored and verifies/loads it into this instance
     * @returns {Promise.<boolean>}
     */
    public async loadSession() {
        // try to load the session interface
        const session = this.storageInterface.get(this.storageKey);

        if (session === undefined) return false;

        // api keys dont match, don't load this
        if (session.apiKey !== this.apiKey) return false;

        // overwrite our current properties with the stored version
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

        return true;
    }

    /**
     * Stores this session using the storageInterface
     * @returns {Promise.<void>}
     */
    public async storeSession() {
        this.storageInterface.set(this.storageKey, {
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
        });
    }

    /**
     * Resets all values to default and remove data from storage
     * @returns {Promise<void>}
     */
    public async destroySession() {
        console.log("destroy session");
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
        this.sessionExpiryTime = null;

        this.storageInterface.remove(this.storageKey);
    }

    /**
     * Checks if this session has a succesful installation stored
     * @returns {Promise<boolean>}
     */
    public verifyInstallation() {
        return this.serverPublicKey !== null && this.installToken !== null;
    }

    /**
     * Checks if this session has a succesful device isntallation stored
     * @returns {Promise<boolean>}
     */
    public verifyDeviceInstallation() {
        return this.deviceId !== null;
    }

    /**
     * Checks if this session has a succesful device isntallation stored
     * @returns {Promise<boolean>}
     */
    public verifySessionInstallation() {
        if (this.sessionId === null) return false;

        const currentTime = new Date();
        if (this.sessionExpiryTime.getTime() <= currentTime.getTime()) {
            return false;
        }

        return true;
    }

    /**
     * Set enviroment and check if type is allowed/valid
     * @param environmentType
     */
    set environmentType(environmentType: string) {
        if (ALLOWED_ENVIROMENTS.includes(environmentType)) {
            this.environment = environmentType;
            return;
        }
        throw new Error(
            "Invalid enviroment given. " + JSON.stringify(ALLOWED_ENVIROMENTS)
        );
    }
}
