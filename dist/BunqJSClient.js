"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CustomerStatementExportContent_1 = require("./Api/CustomerStatementExportContent");
const store = require("store");
const axios_1 = require("axios");
const Logger_1 = require("./Helpers/Logger");
const ErrorCodes_1 = require("./Helpers/ErrorCodes");
const ApiAdapter_1 = require("./ApiAdapter");
const Session_1 = require("./Session");
const Rsa_1 = require("./Crypto/Rsa");
const Aes_1 = require("./Crypto/Aes");
const RequestInquiry_1 = require("./Api/RequestInquiry");
const MasterCardAction_1 = require("./Api/MasterCardAction");
const SchedulePayment_1 = require("./Api/SchedulePayment");
const Payment_1 = require("./Api/Payment");
const SandboxUser_1 = require("./Api/SandboxUser");
const ShareInviteBankResponse_1 = require("./Api/ShareInviteBankResponse");
const AttachementContent_1 = require("./Api/AttachementContent");
const UserCompany_1 = require("./Api/UserCompany");
const BunqMeTabs_1 = require("./Api/BunqMeTabs");
const DeviceRegistration_1 = require("./Api/DeviceRegistration");
const NoteAttachment_1 = require("./Api/NoteAttachment");
const Schedule_1 = require("./Api/Schedule");
const UserPerson_1 = require("./Api/UserPerson");
const MonetaryAccountJoint_1 = require("./Api/MonetaryAccountJoint");
const DraftPayment_1 = require("./Api/DraftPayment");
const CardCvc2_1 = require("./Api/CardCvc2");
const CredentialPasswordIp_1 = require("./Api/CredentialPasswordIp");
const RequestInquiryBatch_1 = require("./Api/RequestInquiryBatch");
const ShareInviteBankInquiry_1 = require("./Api/ShareInviteBankInquiry");
const Installation_1 = require("./Api/Installation");
const CustomerStatementExport_1 = require("./Api/CustomerStatementExport");
const RequestResponse_1 = require("./Api/RequestResponse");
const PaymentBatch_1 = require("./Api/PaymentBatch");
const Card_1 = require("./Api/Card");
const MonetaryAccountBank_1 = require("./Api/MonetaryAccountBank");
const SchedulePaymentBatch_1 = require("./Api/SchedulePaymentBatch");
const NoteText_1 = require("./Api/NoteText");
const SessionServer_1 = require("./Api/SessionServer");
const Event_1 = require("./Api/Event");
const MonetaryAccountSavings_1 = require("./Api/MonetaryAccountSavings");
const Ip_1 = require("./Api/Ip");
const User_1 = require("./Api/User");
const MonetaryAccount_1 = require("./Api/MonetaryAccount");
const FIVE_MINUTES_MS = 300000;
class BunqJSClient {
    /**
     * @param {StorageInterface} storageInterface
     * @param {LoggerInterface} loggerInterface
     */
    constructor(storageInterface = store, loggerInterface = Logger_1.default) {
        this.apiKey = null;
        /**
         * Decides whether the session is kept alive (which will be slightly faster)
         * or creates a new session when required
         * @type {boolean}
         */
        this.keepAlive = true;
        /**
         * Contains the promise for fetching a new session to prevent duplicate requests
         * @type {boolean}
         */
        this.fetchingNewSession = false;
        /**
         * A list of all custom bunqJSClient error codes to make error handling easier
         * @type {{INSTALLATION_HAS_SESSION}}
         */
        this.errorCodes = ErrorCodes_1.default;
        /**
         * Resets the session expiry timer
         */
        this.clearExpiryTimer = () => {
            if (this.Session.sessionExpiryTimeChecker !== null) {
                clearTimeout(this.Session.sessionExpiryTimeChecker);
            }
        };
        /**
         * Handles the expiry timer checker callback
         */
        this.expiryTimerCallback = () => {
            // check if keepAlive is enabled
            if (this.keepAlive === false) {
                this.clearExpiryTimer();
                return false;
            }
            // update users, don't wait for it to finish
            this.getUsers(true)
                .then(users => {
                // do nothing
                this.logger.debug("Triggered session refresh");
            })
                .catch(error => {
                // log the error
                this.logger.error(error);
            });
            // set the timer again for a shorter duration (max 5 minutes)
            this.setExpiryTimer(true);
        };
        /**
         * Calculate in how many milliseconds the session will expire
         * @param {boolean} shortTimeout
         * @returns {number}
         */
        this.calculateSessionExpiry = (shortTimeout = false) => {
            // if shortTimeout is set maximize the expiry to 5 minutes
            if (shortTimeout) {
                return !this.Session.sessionTimeout || this.Session.sessionTimeout > FIVE_MINUTES_MS
                    ? FIVE_MINUTES_MS
                    : this.Session.sessionTimeout;
            }
            const currentTime = new Date();
            return this.Session.sessionExpiryTime.getTime() - currentTime.getTime();
        };
        this.storageInterface = storageInterface;
        this.logger = loggerInterface;
        // create a new session instance
        this.Session = new Session_1.default(this.storageInterface, this.logger);
        // setup the api adapter using our session context
        this.ApiAdapter = new ApiAdapter_1.default(this.Session, this.logger, this);
        // register the endpoints
        this.api = {
            attachmentContent: new AttachementContent_1.default(this.ApiAdapter),
            bunqMeTabs: new BunqMeTabs_1.default(this.ApiAdapter),
            card: new Card_1.default(this.ApiAdapter),
            cardCvc2: new CardCvc2_1.default(this.ApiAdapter),
            credentialPasswordIp: new CredentialPasswordIp_1.default(this.ApiAdapter),
            customerStatementExport: new CustomerStatementExport_1.default(this.ApiAdapter),
            customerStatementExportContent: new CustomerStatementExportContent_1.default(this.ApiAdapter),
            deviceRegistration: new DeviceRegistration_1.default(this.ApiAdapter),
            draftPayment: new DraftPayment_1.default(this.ApiAdapter),
            event: new Event_1.default(this.ApiAdapter),
            installation: new Installation_1.default(this.ApiAdapter),
            ip: new Ip_1.default(this.ApiAdapter),
            masterCardAction: new MasterCardAction_1.default(this.ApiAdapter),
            monetaryAccount: new MonetaryAccount_1.default(this.ApiAdapter),
            monetaryAccountBank: new MonetaryAccountBank_1.default(this.ApiAdapter),
            monetaryAccountJoint: new MonetaryAccountJoint_1.default(this.ApiAdapter),
            monetaryAccountSavings: new MonetaryAccountSavings_1.default(this.ApiAdapter),
            noteText: new NoteText_1.default(this.ApiAdapter),
            noteAttachment: new NoteAttachment_1.default(this.ApiAdapter),
            payment: new Payment_1.default(this.ApiAdapter),
            paymentBatch: new PaymentBatch_1.default(this.ApiAdapter),
            requestInquiry: new RequestInquiry_1.default(this.ApiAdapter),
            requestInquiryBatch: new RequestInquiryBatch_1.default(this.ApiAdapter),
            requestResponse: new RequestResponse_1.default(this.ApiAdapter),
            sessionServer: new SessionServer_1.default(this.ApiAdapter),
            sandboxUser: new SandboxUser_1.default(this.ApiAdapter),
            schedule: new Schedule_1.default(this.ApiAdapter),
            schedulePayment: new SchedulePayment_1.default(this.ApiAdapter),
            schedulePaymentBatch: new SchedulePaymentBatch_1.default(this.ApiAdapter),
            shareInviteBankInquiry: new ShareInviteBankInquiry_1.default(this.ApiAdapter),
            shareInviteBankResponse: new ShareInviteBankResponse_1.default(this.ApiAdapter),
            user: new User_1.default(this.ApiAdapter),
            userCompany: new UserCompany_1.default(this.ApiAdapter),
            userPerson: new UserPerson_1.default(this.ApiAdapter)
        };
    }
    /**
     * Starts the client and sets up the required components
     * @returns {Promise.<void>}
     */
    async run(apiKey, allowedIps = [], environment = "SANDBOX", encryptionKey = false) {
        this.logger.debug("bunqJSClient run");
        this.apiKey = apiKey;
        // setup the session with our apiKey and ip whitelist
        await this.Session.setup(this.apiKey, allowedIps, environment, encryptionKey);
        // set our automatic timer to check for expiry time
        this.setExpiryTimer();
        // setup the api adapter using our session
        await this.ApiAdapter.setup();
    }
    /**
     * If true, polling requests will be sent to try and keep the current session
     * alive instead of creating a new session when required
     * If false, a new session will be created when required
     * @param {boolean} keepAlive
     */
    setKeepAlive(keepAlive) {
        this.keepAlive = keepAlive;
    }
    /**
     * Installs this application
     * @returns {Promise<boolean>}
     */
    async install() {
        if (this.Session.verifyInstallation() === false) {
            // check if Session is ready to execute the request
            if (!this.Session.publicKey) {
                throw new Error("No public key is set yet, make sure you setup an encryption key with BunqJSClient->setup()");
            }
            const response = await this.api.installation.add();
            // update the session properties
            this.Session.serverPublicKeyPem = response.serverPublicKey;
            this.Session.serverPublicKey = await Rsa_1.publicKeyFromPem(response.serverPublicKey);
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
    async registerDevice(deviceName = "My Device") {
        if (this.Session.verifyDeviceInstallation() === false) {
            try {
                const deviceId = await this.api.deviceRegistration.add({
                    description: deviceName,
                    permitted_ips: this.Session.allowedIps
                });
                // update the session properties
                this.Session.deviceId = deviceId;
                // update storage
                await this.Session.storeSession();
            }
            catch (error) {
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
    async registerSession() {
        if (this.Session.verifySessionInstallation() === false) {
            try {
                // generate the session using the bunq API
                this.fetchingNewSession = this.generateSession();
                // wait for it to finish
                await this.fetchingNewSession;
            }
            catch (exception) {
                // set fetching status to false
                this.fetchingNewSession = false;
                // re-throw the exception
                throw exception;
            }
            // finished fetching/checking status so set to false
            this.fetchingNewSession = false;
        }
        return true;
    }
    /**
     * Send the actual request and handle it
     * @returns {Promise<boolean>}
     */
    async generateSession() {
        let response = null;
        try {
            this.logger.debug(" === Attempting to fetch session");
            response = await this.api.sessionServer.add();
        }
        catch (error) {
            if (error.response && error.response.data.Error) {
                const responseError = error.response.data.Error[0];
                const description = responseError.error_description;
                this.logger.error("bunq API error: " + description);
                if (description === "Authentication token already has a user session.") {
                    // add custom error code
                    throw {
                        errorCode: this.errorCodes.INSTALLATION_HAS_SESSION,
                        error: error
                    };
                }
            }
            // rethrow the exact error
            throw error;
        }
        this.logger.debug("response.token.created:" + response.token.created);
        // based on account setting we set a expire date
        const createdDate = new Date(response.token.created + " UTC");
        let sessionTimeout;
        // parse the correct user info from response
        let userInfoParsed = this.getUserType(response.user_info);
        // differentiate between oauth api keys and non-oauth api keys
        if (userInfoParsed.isOAuth === false) {
            // get the session timeout
            sessionTimeout = userInfoParsed.info.session_timeout;
            this.logger.debug("Received userInfoParsed.info.session_timeout from api: " + userInfoParsed.info.session_timeout);
            // set isOAuth to false
            this.Session.isOAuthKey = false;
            // set user info
            this.Session.userInfo = response.user_info;
        }
        else {
            // parse the user info
            sessionTimeout = this.parseOauthUser(userInfoParsed);
        }
        // turn time into MS
        sessionTimeout = sessionTimeout * 1000;
        // calculate the expiry time
        createdDate.setTime(createdDate.getTime() + sessionTimeout);
        // set the session information
        this.Session.sessionExpiryTime = createdDate;
        this.Session.sessionTimeout = sessionTimeout;
        this.Session.sessionId = response.id;
        this.Session.sessionToken = response.token.token;
        this.Session.sessionTokenId = response.token.id;
        this.logger.debug("calculated expireDate: " + createdDate + " current date: " + new Date());
        // update storage
        await this.Session.storeSession();
        // update the timer
        this.setExpiryTimer();
        return true;
    }
    /**
     * Change the encryption key and
     * @param {string} encryptionKey
     * @returns {Promise<boolean>}
     */
    async changeEncryptionKey(encryptionKey) {
        if (!Aes_1.validateKey(encryptionKey)) {
            throw new Error("Invalid EAS key given! Invalid characters or length (16,24,32 length)");
        }
        // change the encryption key
        this.Session.encryptionKey = encryptionKey;
        // update the storage
        return this.Session.storeSession();
    }
    /**
     * Handles the oauth type users
     * @param userInfoParsed
     * @returns {any}
     */
    parseOauthUser(userInfoParsed) {
        // parse the granted and request by user objects
        const requestedByUserParsed = this.getUserType(userInfoParsed.info.requested_by_user);
        const grantedByUserParsed = this.getUserType(userInfoParsed.info.granted_by_user);
        // get the session timeout from request_by_user
        const sessionTimeout = requestedByUserParsed.info.session_timeout;
        this.logger.debug("Received requestedByUserParsed.info.session_timeout from api: " +
            requestedByUserParsed.info.session_timeout);
        // set user id if none is set
        if (!grantedByUserParsed.info.id) {
            grantedByUserParsed.info.id = userInfoParsed.info.id;
        }
        // make sure we set isOAuth to true to handle it more easily
        this.Session.isOAuthKey = true;
        // set user info for granted by user
        this.Session.userInfo["UserApiKey"] = grantedByUserParsed.info;
        return sessionTimeout;
    }
    /**
     * Create a new credential password ip
     * @returns {Promise<any>}
     */
    async createCredentials() {
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/credential-password-ip-request", "POST");
        // send a unsigned request to the endpoint to create a new credential password ip
        const response = await limiter.run(async () => this.ApiAdapter.post(`https://api.tinker.bunq.com/v1/credential-password-ip-request`, {}, {}, {
            ignoreVerification: true,
            disableSigning: true,
            skipSessionCheck: true
        }));
        return response.Response[0].UserCredentialPasswordIpRequest;
    }
    /**
     * Check if a credential password ip has been accepted
     * @param {string} uuid
     * @returns {Promise<any>}
     */
    async checkCredentialStatus(uuid) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/credential-password-ip-request", "GET");
        // send a unsigned request to the endpoint to create a new credential password ip with the uuid
        const response = await limiter.run(async () => this.ApiAdapter.get(`https://api.tinker.bunq.com/v1/credential-password-ip-request/${uuid}`, {}, {
            ignoreVerification: true,
            disableSigning: true,
            skipSessionCheck: true
        }));
        return response.Response[0].UserCredentialPasswordIpRequest;
    }
    /**
     *
     * @param {string} clientId
     * @param {string} clientSecret
     * @param {string} redirectUri
     * @param {string} code
     * @param {string|false} state
     * @param {boolean} sandbox
     * @param {string} grantType
     * @returns {Promise<string>}
     */
    async exchangeOAuthToken(clientId, clientSecret, redirectUri, code, state = false, sandbox = false, grantType = "authorization_code") {
        const url = this.formatOAuthKeyExchangeUrl(clientId, clientSecret, redirectUri, code, sandbox, grantType);
        // send the request
        const response = await axios_1.default({
            method: "POST",
            url: url
        });
        const data = response.data;
        // check if a state has to be checked and validate it
        if (state && state !== data.state) {
            throw new Error("Given state does not match token exchange state!");
        }
        return data.access_token;
    }
    /**
     * Formats a correct bunq OAuth url to begin the login flow
     * @param {string} clientId
     * @param {string} redirectUri
     * @param {string|false} state
     * @param {boolean} sandbox
     * @returns {string}
     */
    formatOAuthAuthorizationRequestUrl(clientId, redirectUri, state = false, sandbox = false) {
        const stateParam = state ? `&state=${state}` : "";
        const baseUrl = sandbox ? "https://oauth.sandbox.bunq.com" : "https://oauth.bunq.com";
        return (`${baseUrl}/auth?response_type=code&` +
            `client_id=${clientId}&` +
            `redirect_uri=${redirectUri}` +
            stateParam);
    }
    /**
     * Formats the given parameters into the url used for the token exchange
     * @param {string} clientId
     * @param {string} clientSecret
     * @param {string} redirectUri
     * @param {string} code
     * @param {boolean} sandbox
     * @param {string} grantType
     * @returns {string}
     */
    formatOAuthKeyExchangeUrl(clientId, clientSecret, redirectUri, code, sandbox = false, grantType = "authorization_code") {
        const baseUrl = sandbox ? "https://api-oauth.sandbox.bunq.com" : "https://api.oauth.bunq.com";
        return (`${baseUrl}/v1/token?` +
            `grant_type=${grantType}&` +
            `code=${code}&` +
            `client_id=${clientId}&` +
            `client_secret=${clientSecret}&` +
            `redirect_uri=${redirectUri}`);
    }
    /**
     * Sets an automatic timer to keep the session alive when possible
     */
    setExpiryTimer(shortTimeout = false) {
        if (typeof process !== "undefined" && process.env.ENV_CI === "true") {
            // disable in CI
            return false;
        }
        // check if keepAlive is enabled
        if (this.keepAlive === false) {
            this.clearExpiryTimer();
            return false;
        }
        if (this.Session.sessionExpiryTime) {
            // calculate amount of milliseconds until expire time
            const expiresInMilliseconds = this.calculateSessionExpiry();
            // 15 seconds before it expires we want to reset it
            const timeoutRequestDuration = expiresInMilliseconds - 15000;
            // clear existing timer if required
            this.clearExpiryTimer();
            // set the timeout
            this.Session.sessionExpiryTimeChecker = setTimeout(this.expiryTimerCallback, timeoutRequestDuration);
        }
    }
    /**
     * Destroys the current installation and session and all variables associated with it
     * @returns {Promise<void>}
     */
    async destroySession() {
        if (this.Session.verifyInstallation() &&
            this.Session.verifyDeviceInstallation() &&
            this.Session.verifySessionInstallation()) {
            // we have a valid installation, try to delete the remote session
            try {
                await this.api.sessionServer.delete();
            }
            catch (ex) { }
        }
        // clear the session timer if set
        this.clearExpiryTimer();
        // destroy the stored session
        await this.Session.destroySession();
    }
    /**
     * Destroys the current session and all variables associated with it
     * @returns {Promise<void>}
     */
    async destroyApiSession() {
        // clear the session timer if set
        this.clearExpiryTimer();
        // destroy the stored session
        await this.Session.destroyApiSession(true);
    }
    /**
     * Returns the registered user for the session of a specific type
     * @returns {any}
     */
    async getUser(userType, updated = false) {
        if (updated) {
            // update the user info and update session data
            const userList = await this.api.user.list();
            // parse user type from user list
            const userInfoParsed = this.getUserType(userList);
            if (userInfoParsed.isOAuth) {
                // get info from the userapikey object
                this.parseOauthUser(userInfoParsed);
            }
            else {
                // set updated info
                this.Session.userInfo[userInfoParsed.type] = userInfoParsed.info;
            }
        }
        // return the user if we have one
        return this.Session.userInfo[userType];
    }
    /**
     * Returns the registered users for the session
     * @returns {any}
     */
    async getUsers(updated = false) {
        if (updated) {
            // update the user info and update session data
            const userList = await this.api.user.list();
            // parse user type from user list
            const userInfoParsed = this.getUserType(userList);
            if (userInfoParsed.isOAuth) {
                // get info from the userapikey object
                this.parseOauthUser(userInfoParsed);
            }
            else {
                // set updated info
                this.Session.userInfo[userInfoParsed.type] = userInfoParsed.info;
            }
        }
        // return the users
        return this.Session.userInfo;
    }
    /**
     * Receives an object with an unknown user type and returns an object with
     * the correct info and a isOAuth boolean
     * @param userInfo
     * @returns {{info: any; isOAuth: boolean}}
     */
    getUserType(userInfo) {
        if (userInfo.UserCompany !== undefined) {
            return {
                info: userInfo.UserCompany,
                type: "UserCompany",
                isOAuth: false
            };
        }
        else if (userInfo.UserPerson !== undefined) {
            return {
                info: userInfo.UserPerson,
                type: "UserPerson",
                isOAuth: false
            };
        }
        else if (userInfo.UserLight !== undefined) {
            return {
                info: userInfo.UserLight,
                type: "UserLight",
                isOAuth: false
            };
        }
        else if (userInfo.UserApiKey !== undefined) {
            return {
                info: userInfo.UserApiKey,
                type: "UserApiKey",
                isOAuth: true
            };
        }
        throw new Error("No supported account type found! (Not one of UserLight, UserPerson, UserApiKey or UserCompany)");
    }
}
exports.default = BunqJSClient;
