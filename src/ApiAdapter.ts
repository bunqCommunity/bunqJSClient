import axios from "axios";
import { AxiosRequestConfig } from "axios";
import * as Url from "url";
import { signString, verifyString } from "./Crypto/Sha256";
import Session from "./Session";
import Header from "./Types/Header";
import { ucfirst } from "./Helpers/Utils";

// these headers are set by default
export const DEFAULT_HEADERS: Header = {
    "Cache-Control": "no-cache",
    "Content-Type": "application/json",
    "X-Bunq-Language": "en_US",
    "X-Bunq-Region": "nl_NL",
    "X-Bunq-Geolocation": "0 0 0 0 000"
};

export default class ApiAdapter {
    Session: Session;
    language: string;
    region: string;
    geoLocation: string;

    constructor(Session: Session) {
        this.Session = Session;

        this.language = "en_US";
        this.region = "nl_NL";
        this.geoLocation = "0 0 0 0 000";
    }

    public async setup() {
        // const location = await getGeoLocation();
        // this.geoLocation = `${location.latitude} ${location.longitude} 12 100 ${this
        //     .region}`;
    }

    /**
     * @param {string} url
     * @param headers
     * @param options
     * @returns {Promise<void>}
     */
    public async get(url: string, headers: any = {}, options: any = {}) {
        const response = await this.request(url, "GET", {}, headers, options);
        return response.data;
    }

    /**
     * @param {string} url
     * @param headers
     * @param options
     * @returns {Promise<void>}
     */
    public async delete(url: string, headers: any = {}, options: any = {}) {
        const response = await this.request(
            url,
            "DELETE",
            {},
            headers,
            options
        );
        return response.data;
    }

    /**
     * @param {string} url
     * @param data
     * @param headers
     * @param options
     * @returns {Promise<void>}
     */
    public async post(
        url: string,
        data: any = {},
        headers: any = {},
        options: any = {}
    ) {
        const response = await this.request(
            url,
            "POST",
            data,
            headers,
            options
        );
        return response.data;
    }

    /**
     * @param {string} url
     * @param data
     * @param headers
     * @param options
     * @returns {Promise<void>}
     */
    public async put(
        url: string,
        data: any = {},
        headers: any = {},
        options: any = {}
    ) {
        const response = await this.request(url, "PUT", data, headers, options);
        return response.data;
    }

    /**
     * @param {string} url
     * @param data
     * @param headers
     * @param options
     * @returns {Promise<void>}
     */
    public async list(
        url: string,
        data: any = {},
        headers: any = {},
        options: any = {}
    ) {
        const response = await this.request(
            url,
            "LIST",
            data,
            headers,
            options
        );
        return response.data;
    }

    /**
     * @param {string} url
     * @param {string} method
     * @param data
     * @param headers
     * @param options
     * @returns {Promise<any>}
     */
    private async request(
        url: string,
        method = "GET",
        data: any = {},
        headers: any = {},
        options: any = {}
    ) {
        // use session token or fallback to install taken if we have one
        if (this.Session.sessionToken !== null) {
            headers["X-Bunq-Client-Authentication"] = this.Session.sessionToken;
        } else if (this.Session.installToken !== null) {
            headers["X-Bunq-Client-Authentication"] = this.Session.installToken;
        }

        // create a config for this request
        let requestConfig: AxiosRequestConfig = {
            url: `${url}`,
            method: method,
            data: data,
            headers: this.createHeaders(headers),
            ...options.axiosOptions
        };

        // // check if signing is disabled
        if (options.disableSigning !== true) {
            // sign this request config
            const signature = await this.signRequest(requestConfig);
            // add the generated signature
            requestConfig.headers["X-Bunq-Client-Signature"] = signature;
        }

        if (requestConfig.url[0] === "/") {
            // complete relative urls
            requestConfig.url = `${this.Session
                .environmentUrl}${requestConfig.url}`;
        }

        // Send the request to Bunq
        const response = await axios.request(requestConfig);

        // attempt to verify the Bunq response
        // const verifyResult = await this.verifyResponse(response);
        //
        // if (!verifyResult) {
        //     throw new Error("We couldn't verify the received response");
        // }

        return response;
    }

    /**
     * Signs a request using our privatekey
     * @param {RequestConfig} requestConfig
     * @returns {Promise<string>}
     */
    private async signRequest(
        requestConfig: AxiosRequestConfig
    ): Promise<string> {
        let url: string = requestConfig.url;

        // Check if one or more param is set and add it to the url
        if (
            requestConfig.params &&
            Object.keys(requestConfig.params).length > 0
        ) {
            const params = new Url.URLSearchParams(requestConfig.params);
            url = `${requestConfig.url}?${params.toString()}`;
        }

        const methodUrl: string = `${requestConfig.method} ${url}`;

        // create a list of headers
        const headerStrings = Object.keys(
            requestConfig.headers
        ).map(headerKey => {
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
        headerStrings.push(`User-Agent: ${navigator.userAgent}`);

        // sort alphabetically
        headerStrings.sort();

        // remove empty strings and join into a list of headers for the template
        const headers = headerStrings.join("\n");

        // serialize the data
        let data: string = "\n\n";
        const appendDataWhitelist = ["POST", "PUT", "DELETE"];
        if (appendDataWhitelist.some(item => item === requestConfig.method)) {
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

        // create a list of headers
        const headerStrings = [];
        Object.keys(response.headers).map(headerKey => {
            const headerParts = headerKey.split("-");
            // add uppercase back since axios makes every header key lowercase
            const headerPartsFixed = headerParts.map(ucfirst);
            // merge back to a string
            const headerKeyFixed = headerPartsFixed.join("-");

            // only verify bunq headers and ignore the server signature
            if (
                headerKeyFixed.includes("X-Bunq") &&
                !headerKeyFixed.includes("X-Bunq-Server-Signature")
            ) {
                headerStrings.push(
                    `${headerKeyFixed}: ${response.headers[headerKey]}`
                );
            }
        });

        // sort alphabetically
        headerStrings.sort();

        // join into a list of headers for the template
        const headers = headerStrings.join("\n");

        // serialize the data
        let data: string = "";
        switch (typeof response.request.response) {
            case "string":
                data = response.request.response;
                break;
            default:
                data = response.request.response.toString();
                break;
        }

        // generate the full template
        const template: string = `${response.status}\n${headers}\n\n${data}`;

        // verify the string and return results
        return await verifyString(
            template,
            this.Session.serverPublicKey,
            response.headers["x-bunq-server-signature"]
        );
    }

    /**
     * Generates a list of the required headers
     * @param {Header[]} headers
     */
    private createHeaders(headers: Header[] = []) {
        const date: Date = new Date();
        return {
            ...DEFAULT_HEADERS,
            "X-Bunq-Client-Request-Id": date.getTime() + date.getMilliseconds(),
            "X-Bunq-Geolocation": this.geoLocation,
            "X-Bunq-Language": this.language,
            "X-Bunq-Region": this.region,
            ...headers
        };
    }
}
