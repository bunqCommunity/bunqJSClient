const store = require("store");
import axios from "axios";

import ApiAdapter from "./ApiAdapter";
import Session from "./Session";
import Logger from "./Helpers/Logger";
import StorageInteface from "./Interfaces/StorageInterface";
import LoggerInterface from "./Interfaces/LoggerInterface";
import { publicKeyFromPem } from "./Crypto/Rsa";
import ApiEndpoints from "./Api/index";

import ErrorCodes from "./Helpers/ErrorCodes";

export default class BunqJSClient {
    public storageInterface: StorageInteface;
    public logger: LoggerInterface;
    public apiKey: string = null;
    public allowedIps: string[] = [];

    public Session: Session;
    public ApiAdapter: ApiAdapter;

    /**
     * Contains object with all API endpoints
     */
    public api: any;

    /**
     * A list of all custom BunqJSClient error codes to make error handling easier
     * @type {{INSTALLATION_HAS_SESSION}}
     */
    public errorCodes: any = ErrorCodes;

    /**
     * @param {StorageInterface} storageInterface
     * @param {LoggerInterface} loggerInterface
     */
    constructor(
        storageInterface: StorageInteface = store,
        loggerInterface: LoggerInterface = Logger
    ) {
        this.storageInterface = storageInterface;
        this.logger = loggerInterface;

        // create a new session instance
        this.Session = new Session(this.storageInterface, this.logger);

        // setup the api adapter using our session context
        this.ApiAdapter = new ApiAdapter(this.Session, this.logger);

        // register our api endpoints
        this.api = ApiEndpoints(this.ApiAdapter);
    }

    /**
     * Starts the client and sets up the required components
     * @returns {Promise.<void>}
     */
    public async run(
        apiKey: string,
        allowedIps: string[] = [],
        environment: string = "SANDBOX",
        encryptionKey: string | boolean = false
    ) {
        this.logger.debug("BunqJSClient run");

        this.apiKey = apiKey;
        this.allowedIps = allowedIps;

        // setup the session with our apiKey and ip whitelist
        await this.Session.setup(
            this.apiKey,
            this.allowedIps,
            environment,
            encryptionKey
        );

        // setup the api adapter using our session
        await this.ApiAdapter.setup();
    }

    /**
     * Installs this application
     * @returns {Promise<boolean>}
     */
    public async install() {
        if (this.Session.verifyInstallation() === false) {
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
        }
        return true;
    }

    /**
     * Registers a new device for this installation
     * @param {string} deviceName
     * @returns {Promise<boolean>}
     */
    public async registerDevice(deviceName = "My Device") {
        if (this.Session.verifyDeviceInstallation() === false) {
            try {
                const deviceId = await this.api.deviceRegistration.add({
                    description: deviceName,
                    permitted_ips: this.allowedIps
                });

                // update the session properties
                this.Session.deviceId = deviceId;

                // update storage
                await this.Session.storeSession();
            } catch (error) {
                if (!error.response) {
                    throw error;
                }
                const response = error.response;

                if (response.status === 400) {
                    // we have a permission/formatting issue, destroy the installation
                    this.Session.serverPublicKeyPem = null;
                    this.Session.serverPublicKey = null;
                    this.Session.installToken = null;
                    this.Session.installUpdated = null;
                    this.Session.installCreated = null;

                    // force creation of a new keypair since the old one is no longer 'unique'
                    await this.Session.setupKeypair(true);

                    // store the removed information
                    await this.Session.storeSession();
                }

                // rethrow the error
                throw error;
            }
        }
        return true;
    }

    /**
     * Registers a new session when required for this device and installation
     * @returns {Promise<boolean>}
     */
    public async registerSession() {
        if (this.Session.verifySessionInstallation() === false) {
            let response = null;
            try {
                response = await this.api.sessionServer.add();
            } catch (error) {
                if (error.response && error.response.Error) {
                    const responseError = error.response.Error[0];
                    const description = responseError.error_description;

                    this.logger.error("bunq API error: " + description);
                }
                throw {
                    errorCode: this.errorCodes.INSTALLATION_HAS_SESSION,
                    error: error
                };
            }

            this.logger.debug(
                "response.token.created:" + response.token.created
            );

            // based on account setting we set a expire date
            const createdDate = new Date(response.token.created);
            if (response.user_info.UserCompany !== undefined) {
                createdDate.setSeconds(
                    createdDate.getSeconds() +
                        response.user_info.UserCompany.session_timeout
                );
                this.logger.debug(
                    "Received response.user_info.UserCompany.session_timeout from api: " +
                        response.user_info.UserCompany.session_timeout
                );
            } else if (response.user_info.UserPerson !== undefined) {
                createdDate.setSeconds(
                    createdDate.getSeconds() +
                        response.user_info.UserPerson.session_timeout
                );
                this.logger.debug(
                    "Received response.user_info.UserPerson.session_timeout from api: " +
                        response.user_info.UserPerson.session_timeout
                );
            } else if (response.user_info.UserLight !== undefined) {
                createdDate.setSeconds(
                    createdDate.getSeconds() +
                        response.user_info.UserLight.session_timeout
                );
                this.logger.debug(
                    "Received response.user_info.UserLight.session_timeout from api: " +
                        response.user_info.UserLight.session_timeout
                );
            }

            // set the new info
            this.Session.sessionExpiryTime = createdDate;
            this.Session.sessionId = response.id;
            this.Session.sessionToken = response.token.token;
            this.Session.sessionTokenId = response.token.id;
            this.Session.userInfo = response.user_info;

            this.logger.debug("calculated expireDate: " + createdDate);
            this.logger.debug("calculated current date: " + new Date());

            // update storage
            await this.Session.storeSession();
        }
        return true;
    }

    /**
     * Create a new credential password ip
     * @returns {Promise<any>}
     */
    public async createCredentials() {
        const limiter = this.ApiAdapter.RequestLimitFactory.create(
            "/credential-password-ip-request",
            "POST"
        );

        // send a unsigned request to the endpoint to create a new credential password ip
        const response = await limiter.run(async () =>
            this.ApiAdapter.post(
                `https://api.tinker.bunq.com/v1/credential-password-ip-request`,
                {},
                {},
                {
                    disableSigning: true
                }
            )
        );

        return response.Response[0].UserCredentialPasswordIpRequest;
    }

    /**
     * Check if a credential password ip has been accepted
     * @param {string} uuid
     * @returns {Promise<any>}
     */
    public async checkCredentialStatus(uuid: string) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create(
            "/credential-password-ip-request",
            "GET"
        );

        // send a unsigned request to the endpoint to create a new credential password ip with the uuid
        const response = await limiter.run(async () =>
            this.ApiAdapter.get(
                `https://api.tinker.bunq.com/v1/credential-password-ip-request/${uuid}`,
                {},
                {
                    disableSigning: true
                }
            )
        );

        return response.Response[0].UserCredentialPasswordIpRequest;
    }

    /**
     * Destroys the current session and all variables associated with it
     * @returns {Promise<void>}
     */
    public async destroySession() {
        if (
            this.Session.verifyInstallation() &&
            this.Session.verifyDeviceInstallation() &&
            this.Session.verifySessionInstallation()
        ) {
            // we have a valid installation, try to delete the remote session
            try {
                await this.api.sessionServer.delete();
            } catch (ex) {}
        }
        await this.Session.destroySession();
    }

    /**
     * Returns the registered user for the session of a specific type
     * @returns {any}
     */
    public async getUser(userType, updated: boolean = false) {
        if (updated) {
            // update the user info and update session data
            this.Session.userInfo = await this.api.user.list();
        }
        // return the user if we have one
        return this.Session.userInfo[userType];
    }

    /**
     * Returns the registered users for the session
     * @returns {any}
     */
    public async getUsers(updated: boolean = false) {
        if (updated) {
            // update the user info and update session data
            this.Session.userInfo = await this.api.user.list();
        }
        // return the users
        return this.Session.userInfo;
    }
}
