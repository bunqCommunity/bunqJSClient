import axios from "axios";
import { AxiosRequestConfig } from "axios";
import * as Url from "url";
import { signString, verifyString } from "./Crypto/Sha256";
import { arrayBufferToString, ucfirst } from "./Helpers/Utils";
import BunqJSClient from "./BunqJSClient";
import Session from "./Session";
import Header from "./Types/Header";
import ErrorCodes from "./Helpers/ErrorCodes";
import RequestLimitFactory from "./RequestLimitFactory";
import LoggerInterface from "./Interfaces/LoggerInterface";
import ApiAdapterOptions from "./Types/ApiAdapterOptions";

// these headers are set by default
export const DEFAULT_HEADERS: Header = {
    "Cache-Control": "no-cache",
    "Content-Type": "application/json",
    "X-Bunq-Language": "en_US",
    "X-Bunq-Region": "nl_NL",
    "X-Bunq-Geolocation": "0 0 0 0 000"
};

export default class ApiAdapter {
    public Session: Session;
    public logger: LoggerInterface;
    public BunqJSClient: BunqJSClient;

    public RequestLimitFactory: RequestLimitFactory;
    public language: string;
    public region: string;
    public geoLocation: string;

    constructor(Session: Session, loggerInterface: LoggerInterface, BunqJSClient: BunqJSClient) {
        this.Session = Session;
        this.logger = loggerInterface;
        this.BunqJSClient = BunqJSClient;
        this.RequestLimitFactory = new RequestLimitFactory();

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
    private async request(
        url: string,
        method = "GET",
        data: any = {},
        headers: any = {},
        options: ApiAdapterOptions = {}
    ) {
        this.logger.debug(`${method}: ${url}`);

        if (!options.skipSessionCheck) {
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
        }

        if (options.unauthenticated !== true) {
            // use session token or fallback to install taken if we have one
            if (this.Session.sessionToken !== null) {
                headers["X-Bunq-Client-Authentication"] = this.Session.sessionToken;
            } else if (this.Session.installToken !== null) {
                headers["X-Bunq-Client-Authentication"] = this.Session.installToken;
            }
        }

        // create a config for this request
        let requestConfig: AxiosRequestConfig = {
            url: `${url}`,
            method: method,
            data: data,
            headers: this.createHeaders(headers),
            transformResponse: undefined,
            ...options.axiosOptions
        };

        if (options.isEncrypted === true) {
            requestConfig = await this.encryptRequest(requestConfig, options);
        }

        // // check if signing is disabled
        if (options.disableSigning !== true) {
            // sign this request config
            const signature = await this.signRequest(requestConfig, options);
            // add the generated signature
            requestConfig.headers["X-Bunq-Client-Signature"] = signature;
        }

        if (requestConfig.url[0] === "/") {
            // complete relative urls
            requestConfig.url = `${this.Session.environmentUrl}${requestConfig.url}`;
        }

        let response;
        try {
            // attempt to send the request
            response = await axios.request(requestConfig);
        } catch (error) {
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

        // don't do this stip if disabled
        if (options.ignoreVerification !== true) {
            // attempt to verify the bunq response
            const verifyResult = await this.verifyResponse(response);

            if (
                // verification is invalid
                !verifyResult &&
                // not in a CI environment
                !process.env.ENV_CI
            ) {
                // invalid response in a non-ci environment
                throw {
                    errorCode: ErrorCodes.INVALID_RESPONSE_RECEIVED,
                    error: "We couldn't verify the received response",
                    response: response
                };
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
     * Encrypts the body and adds the required headers to the request config
     * @param {AxiosRequestConfig} requestConfig
     * @param options
     * @returns {Promise<AxiosRequestConfig>}
     */
    private async encryptRequest(requestConfig: AxiosRequestConfig, options: any): Promise<AxiosRequestConfig> {
        return requestConfig;

        // TODO test and implement actual encryption

        // const body = JSON.stringify(requestConfig.data);
        // const iv = forge.random.getBytesSync(16);
        // const key = forge.random.getBytesSync(32);
        // const encryptedAesKey = await encryptStringRsa(
        //     key,
        //     this.Session.serverPublicKey
        // );
        //
        // // create a new aes-cbc cipher with our key
        // const cipher = forge.cipher.createCipher("AES-CBC", key);
        // // turn our string into a buffer
        // const buffer = forge.util.createBuffer(body, "utf8");
        // cipher.start({ iv: iv });
        // cipher.update(buffer);
        // cipher.finish();
        // const encryptedBody = cipher.output.getBytes();
        //
        // // create an hmac buffer with the body and key
        // const hmac = forge.hmac.create();
        // const keyBuffer = forge.util.createBuffer(key, "raw");
        // hmac.start("sha1", keyBuffer);
        // hmac.update(iv + body);
        // const hmacBuffer = hmac.digest();
        //
        // const base64Hmac = forge.util.encode64(hmacBuffer);
        // const base64Iv = forge.util.encode64(iv);
        //
        // // update the requestconfig
        // requestConfig.data = encryptedBody;
        // requestConfig.headers = {
        //     ...requestConfig.headers,
        //     "X-Bunq-Client-Encryption-Hmac": base64Hmac,
        //     "X-Bunq-Client-Encryption-Key": encryptedAesKey,
        //     "X-Bunq-Client-Encryption-Iv": base64Iv
        // };
        //
        // return requestConfig;
    }

    /**
     * Signs a request using our privatekey
     * @param {RequestConfig} requestConfig
     * @returns {Promise<string>}
     */
    private async signRequest(requestConfig: AxiosRequestConfig, options: any): Promise<string> {
        let url: string = requestConfig.url;
        const dataIsEncrypted = options.isEncrypted === true;

        // Check if one or more param is set and add it to the url
        if (requestConfig.params && Object.keys(requestConfig.params).length > 0) {
            const params = new Url.URLSearchParams(requestConfig.params);
            url = `${requestConfig.url}?${params.toString()}`;
        }

        const methodUrl: string = `${requestConfig.method} ${url}`;

        // create a list of headers
        const headerStrings = Object.keys(requestConfig.headers).map(headerKey => {
            if (
                headerKey.includes("X-Bunq") ||
                headerKey.includes("Cache-Control") ||
                headerKey.includes("User-Agent")
            ) {
                return `${headerKey}: ${requestConfig.headers[headerKey]}`;
            }
            return "";
        });

        // manually include the user agent
        if (typeof navigator === "undefined") {
            const nodeUserAgent = `Node-${process.version}`;

            requestConfig.headers["User-Agent"] = nodeUserAgent;
            headerStrings.push(`User-Agent: ${nodeUserAgent}`);
        } else {
            headerStrings.push(`User-Agent: ${navigator.userAgent}`);
        }

        // sort alphabetically
        headerStrings.sort();

        // remove empty strings and join into a list of headers for the template
        const headers = headerStrings.join("\n");

        // serialize the data
        let data: string = "\n\n";
        const appendDataWhitelist = ["POST", "PUT", "DELETE"];
        if (dataIsEncrypted === true) {
            // when encrypted we pad the raw data
            data = `\n\n${requestConfig.data}`;
        } else if (appendDataWhitelist.some(item => item === requestConfig.method)) {
            data = `\n\n${JSON.stringify(requestConfig.data)}`;
        }

        // generate the full template
        const template: string = `${methodUrl}${headers}${data}`;

        // sign the template with our private key
        return await signString(template, this.Session.privateKey);
    }

    /**
     * Verifies the response of a request
     * @param response
     * @returns {Promise<boolean>}
     */
    private async verifyResponse(response): Promise<boolean> {
        if (!this.Session.serverPublicKey) {
            // no public key so we can't verify, return true if we aren't installed yet
            return this.Session.installToken === null;
        }

        // fallback values for invalid response objects
        if (!response.status) response.status = 200;
        if (!response.request) response.request = {};
        if (!response.headers) response.headers = {};

        // create a list of headers
        const headerStrings = [];
        Object.keys(response.headers).map(headerKey => {
            const headerParts = headerKey.split("-");
            // add uppercase back since axios makes every header key lowercase
            const headerPartsFixed = headerParts.map(ucfirst);
            // merge back to a string
            const headerKeyFixed = headerPartsFixed.join("-");

            // only verify bunq headers and ignore the server signature
            if (headerKeyFixed.includes("X-Bunq") && !headerKeyFixed.includes("X-Bunq-Server-Signature")) {
                headerStrings.push(`${headerKeyFixed}: ${response.headers[headerKey]}`);
            }
        });

        // serialize the data
        let data: string = "";

        const contentType = response.headers["content-type"];
        if (contentType === "application/json") {
            switch (typeof response.data) {
                case "string":
                    data = response.data;
                    break;
                case "undefined":
                    data = "";
                    break;
                default:
                    data = JSON.stringify(response.data);
                    break;
            }
        } else {
            data = arrayBufferToString(response.data);
        }

        // sort alphabetically
        headerStrings.sort();

        // join into a list of headers for the template
        const headers = headerStrings.join("\n");

        // generate the full template
        const template: string = `${response.status}\n${headers}\n\n${data}`;

        // only validate if a server signature is set
        if (!response.headers["x-bunq-server-signature"]) {
            return false;
        }

        // verify the string and return results
        return await verifyString(template, this.Session.serverPublicKey, response.headers["x-bunq-server-signature"]);
    }

    /**
     * Generates a list of the required headers
     * @param {Header[]} headers
     */
    private createHeaders(headers: Header[] = []) {
        const date: Date = new Date();
        return {
            ...DEFAULT_HEADERS,
            "X-Bunq-Client-Request-Id": date.getTime() + Math.random(),
            "X-Bunq-Geolocation": this.geoLocation,
            "X-Bunq-Language": this.language,
            "X-Bunq-Region": this.region,
            ...headers
        };
    }
}
