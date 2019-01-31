import axios from "axios";
import BunqJSClient from "./BunqJSClient";
import Session from "./Session";
import LoggerInterface from "./Interfaces/LoggerInterface";
import CustomError from "./Interfaces/CustomError";
import ApiAdapterOptions from "./Types/ApiAdapterOptions";
import { Method } from "./Types/Method";
import Headers from "./Types/Headers";
import RequestLimitFactory from "./RequestLimitFactory";
import Request from "./HTTP/Request";
import SignRequestHandler from "./HTTP/SignRequestHandler";
import EncryptRequestHandler from "./HTTP/EncryptRequestHandler";
import VerifyResponseHandler from "./HTTP/VerifyResponseHandler";
import ErrorCodes from "./Helpers/ErrorCodes";

export const BUNQ_SERVER_SIGNATURE_HEADER_KEY = "X-Bunq-Server-Signature";
export const BUNQ_REQUEST_SIGNATURE_HEADER_KEY = "X-Bunq-Client-Signature";
export const BUNQ_REQUEST_AUTHENTICATION_HEADER_KEY = "X-Bunq-Client-Authentication";

export default class ApiAdapter {
    public Session: Session;
    public logger: LoggerInterface;
    public BunqJSClient: BunqJSClient;

    public RequestLimitFactory: RequestLimitFactory;
    public SignRequestHandler: SignRequestHandler;
    public EncryptRequestHandler: EncryptRequestHandler;
    public VerifyResponseHandler: VerifyResponseHandler;

    public language: string;
    public region: string;
    public geoLocation: string;

    constructor(Session: Session, loggerInterface: LoggerInterface, BunqJSClient: BunqJSClient) {
        this.Session = Session;
        this.logger = loggerInterface;
        this.BunqJSClient = BunqJSClient;

        this.RequestLimitFactory = new RequestLimitFactory();
        this.SignRequestHandler = new SignRequestHandler(this.Session, this.logger, this.BunqJSClient);
        this.EncryptRequestHandler = new EncryptRequestHandler(this.Session, this.logger, this.BunqJSClient);
        this.VerifyResponseHandler = new VerifyResponseHandler(this.Session, this.logger, this.BunqJSClient);

        this.language = "en_US";
        this.region = "nl_NL";
        this.geoLocation = "0 0 0 0 000";
    }

    public async setup() {}

    /**
     * @param {string} url
     * @param headers
     * @param {ApiAdapterOptions} options
     * @returns {Promise<void>}
     */
    public async get(url: string, headers: any = {}, options: ApiAdapterOptions = {}) {
        const response = await this.request(url, "GET", "", headers, options);

        return response.data;
    }

    /**
     * @param {string} url
     * @param headers
     * @param {ApiAdapterOptions} options
     * @returns {Promise<void>}
     */
    public async delete(url: string, headers: any = {}, options: ApiAdapterOptions = {}) {
        const response = await this.request(url, "DELETE", {}, headers, options);
        return response.data;
    }

    /**
     * @param {string} url
     * @param data
     * @param headers
     * @param {ApiAdapterOptions} options
     * @returns {Promise<void>}
     */
    public async post(url: string, data: any = {}, headers: any = {}, options: ApiAdapterOptions = {}) {
        const response = await this.request(url, "POST", data, headers, options);
        return response.data;
    }

    /**
     * @param {string} url
     * @param data
     * @param headers
     * @param {ApiAdapterOptions} options
     * @returns {Promise<void>}
     */
    public async put(url: string, data: any = {}, headers: any = {}, options: ApiAdapterOptions = {}) {
        const response = await this.request(url, "PUT", data, headers, options);
        return response.data;
    }

    /**
     * @param {string} url
     * @param {string} method
     * @param data
     * @param headers
     * @param {ApiAdapterOptions} options
     * @returns {Promise<any>}
     */
    public async request(
        url: string,
        method: Method = "GET",
        data: any = {},
        headers: Headers = {},
        options: ApiAdapterOptions = {}
    ) {
        this.logger.debug(`${method}: ${url}`);
        const request = new Request(url, method, data, headers, options.axiosOptions || {});

        if (!options.skipSessionCheck) {
            await this.sessionValidationCheck();
        }

        if (options.disableAuthentication !== true) {
            // use session token or fallback to install taken if we have one
            if (this.Session.sessionToken !== null) {
                request.setAuthenticated(this.Session.sessionToken);
            } else if (this.Session.installToken !== null) {
                request.setAuthenticated(this.Session.installToken);
            }
        }

        if (options.isEncrypted === true) {
            await this.EncryptRequestHandler.encryptRequest(request, options);
        }

        if (options.disableSigning !== true) {
            await this.SignRequestHandler.signRequest(request, options);
        }

        // complete relative urls
        if (request.url[0] === "/") {
            request.setUrl(`${this.Session.environmentUrl}${request.url}`);
        }

        let response;
        try {
            response = await axios.request(request.requestConfig);
        } catch (error) {
            this.requestErrorHandler(error);
        }

        if (options.disableVerification !== true) {
            const verifyResult = await this.VerifyResponseHandler.verifyResponse(response);

            if (!verifyResult && (!process.env.ENV_CI || process.env.ENV_CI === "false")) {
                // invalid response in a non-ci environment
                throw new CustomError(
                    "We couldn't verify the received response",
                    response,
                    ErrorCodes.INVALID_RESPONSE_RECEIVED
                );
            }
        }

        try {
            // attempt to turn string result back into json when possible
            response.data = JSON.parse(response.data);
            return response;
        } catch (error) {}

        return response;
    }

    /**
     * Checks if the session is valid and waits for it to be refreshed
     * @returns {Promise<void>}
     */
    private sessionValidationCheck = async (): Promise<void> => {
        // check if a new session is being fetched
        if (this.BunqJSClient.fetchingNewSession) {
            // wait for the new session to be loaded
            await this.BunqJSClient.fetchingNewSession;
        } else {
            // check if keepAlive is enabled and continue if it isn't
            if (this.BunqJSClient.keepAlive === false) {
                // check if a valid session is set
                await this.BunqJSClient.registerSession();
            }
        }

        // calculate amount of milliseconds until expire time
        const expiresInMilliseconds = this.BunqJSClient.calculateSessionExpiry();

        if (expiresInMilliseconds < 30000) {
            // this request will extend the expiry timer
            const extendByMilliseconds = this.BunqJSClient.calculateSessionExpiry(true);

            // add milliseconds to current time
            const currentDate = new Date();
            currentDate.setTime(currentDate.getTime() + extendByMilliseconds);

            // set updated session expiry time
            this.Session.sessionExpiryTime = currentDate;

            this.logger.debug(`Request in last 30 seconds: (${expiresInMilliseconds / 1000})`);
            this.logger.debug(`Set session expiry to ${this.Session.sessionExpiryTime}`);
        }
    };

    /**
     * Attempts to improve the error data and defaults to rethrowing it
     * @param error
     */
    private requestErrorHandler(error) {
        // get the data from the request if it fails
        if (error.response && error.response.data) {
            // parse json response if possible
            try {
                // attempt to turn string result back into json when possible
                error.response.data = JSON.parse(error.response.data);

                throw error;
            } catch (error) {}
        }
        // rethrow if no json data could be found
        throw error;
    }
}
