const store = require("store");

import ApiAdapter from "./ApiAdapter";
import Session from "./Session";
import StorageInteface from "./Interfaces/StorageInterface";
import { publicKeyFromPem } from "./Crypto/Rsa";
import ApiEndpoints from "./Api/index";

export default class BunqJSClient {
    public storageInterface: StorageInteface;
    private eventDispatcher: any = null;
    public apiKey: string = null;
    public allowedIps: string[] = [];

    public Session: Session;
    public ApiAdapter: ApiAdapter;

    public api: any;

    constructor(
        eventDispatcher: any = null,
        storageInterface: StorageInteface = store
    ) {
        this.eventDispatcher = eventDispatcher;
        this.storageInterface = storageInterface;

        // create a new session instance
        this.Session = new Session(this.storageInterface);

        // setup the api adapter using our session context
        this.ApiAdapter = new ApiAdapter();

        // register our api endpoints
        this.api = ApiEndpoints(this.ApiAdapter);
    }

    /**
     * Starts the client and sets up the required components
     * @returns {Promise.<void>}
     */
    async run(apiKey: string, allowedIps: string[] = []) {
        this.apiKey = apiKey;
        this.allowedIps = allowedIps;

        // setup the session with our apiKey and ip whitelist
        await this.Session.setup(this.apiKey, this.allowedIps);

        // setup the api adapter using our session
        await this.ApiAdapter.setup(this.Session);
    }

    /**
     * Installs this application
     * @returns {Promise<boolean>}
     */
    async install() {
        if (this.Session.verifyInstallation() === false) {
            this.eventHandler("INSTALLATION_LOADING");
            const response = await this.api.installation.add();

            // update the session properties
            this.Session.serverPublicKeyPem = response.serverPublicKey;
            this.Session.serverPublicKey = await publicKeyFromPem(
                response.serverPublicKey
            );
            this.Session.installToken = response.token.token;
            this.Session.installUpdated = new Date(response.token.updated);
            this.Session.installCreated = new Date(response.token.created);

            // update storage
            await this.Session.storeSession();
            this.eventHandler("INSTALLATION_ADDED");
        }
        this.eventHandler("INSTALLATION_NOT_LOADING");
        return true;
    }

    /**
     * Registers a new device for this installation
     * @param {string} deviceName
     * @returns {Promise<boolean>}
     */
    async registerDevice(deviceName = "My Device") {
        if (this.Session.verifyDeviceInstallation() === false) {
            this.eventHandler("DEVICE_LOADING");
            const deviceId = await this.api.deviceRegistration.add(
                {
                    description: deviceName
                }
            );

            // update the session properties
            this.Session.deviceId = deviceId;

            // update storage
            await this.Session.storeSession();
            this.eventHandler("DEVICE_ADDED");
        }
        this.eventHandler("DEVICE_NOT_LOADING");
        return true;
    }

    /**
     * Registers a new session when required for this device and installation
     * @returns {Promise<boolean>}
     */
    async registerSession() {
        if (this.Session.verifySessionInstallation() === false) {
            this.eventHandler("SESSION_LOADING");
            const response = await this.api.sessionServer.add();

            // based on account setting we set a expire date
            const createdDate = new Date(response.token.created);
            if (response.user_info.UserCompany !== undefined) {
                createdDate.setSeconds(
                    createdDate.getSeconds() +
                        response.user_info.UserCompany.session_timeout
                );
            } else if (response.user_info.UserPerson !== undefined) {
                createdDate.setSeconds(
                    createdDate.getSeconds() +
                        response.user_info.UserPerson.session_timeout
                );
            } else if (response.user_info.UserLight !== undefined) {
                createdDate.setSeconds(
                    createdDate.getSeconds() +
                        response.user_info.UserCompany.session_timeout
                );
            }

            // set the new info
            this.Session.sessionExpiryTime = createdDate;
            this.Session.sessionId = response.token.id;
            this.Session.sessionToken = response.token.token;
            this.Session.userInfo = response.user_info;

            this.eventHandler("SESSION_CREATED");

            // update storage
            await this.Session.storeSession();
        }
        this.eventHandler("SESSION_NOT_LOADING");
        return true;
    }

    /**
     * Emites event trough the event dispatcher if one is configured
     * @param {string} type
     * @param payload
     */
    public eventHandler(type: string, payload: any = {}) {
        if (this.eventDispatcher !== null) {
            this.eventDispatcher({
                type: `BUNQJSCLIENT_${type}`,
                payload: payload
            });
        }
    }
}

// DEBUG
(window as any).BunqJSClient = BunqJSClient;
