import axios from "axios";
import { signString } from "./Crypto/Sha256";
import Session from "./Session";
import Header from "./Types/Header";

type RequestConfig = {
    url: string;
    method: string;
    data: any;
    headers: Header[];
};

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

    public async get(url: string, headers: any = {}, options: any = {}) {
        const response = await this.request(url, "GET", {}, headers, options);
        return response.data;
    }

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

    public async put(
        url: string,
        data: any = {},
        headers: any = {},
        options: any = {}
    ) {
        const response = await this.request(url, "PUT", data, headers, options);
        return response.data;
    }

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
        let requestConfig: RequestConfig = {
            url: `${url}`,
            method: method,
            data: data,
            headers: this.createHeaders(headers),
            ...options.axiosOptions
        };

        // // check if signing is disabled
        if (options.disableSigning !== true) {
            const signature = await this.signRequest(requestConfig);
            requestConfig.headers["X-Bunq-Client-Signature"] = signature;
        }

        if (requestConfig.url[0] === "/") {
            // complete relative urls
            requestConfig.url = `${this.Session
                .environmentUrl}${requestConfig.url}`;
        }

        return axios.request(requestConfig);
    }

    /**
     * Signs a request using our privatekey
     * @param {RequestConfig} requestConfig
     * @returns {Promise<string>}
     */
    private async signRequest(requestConfig: RequestConfig): Promise<string> {
        const methodUrl: string = `${requestConfig.method} ${requestConfig.url}`;

        // create a list of headers
        const headerStrings = Object.keys(
            requestConfig.headers
        ).map(headerKey => {
            if (
                headerKey.includes("X-Bunq") ||
                headerKey.includes("Cache-Control") ||
                headerKey.includes("User-Agent")
            ) {
            } else {
                return "";
            }

            const headerValue = requestConfig.headers[headerKey];
            return `${headerKey}: ${headerValue}`;
        });

        // manually include the user agent
        headerStrings.push(`User-Agent: ${navigator.userAgent}`);

        // sort alphabetically
        headerStrings.sort();

        // join into a list of headers for the template
        const headers = headerStrings.join("\n");

        // serialize the data
        let data: string = JSON.stringify(requestConfig.data);
        if (data === "{}") {
            data = "\n\n";
        } else {
            data = `\n\n${data}`;
        }

        // generate the full template
        const template: string = `${methodUrl}${headers}${data}`;

        // sign the template with our private key
        const signature = await signString(template, this.Session.privateKey);

        return signature;
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
            // "User-Agent": this.userAgent,
            ...headers
        };
    }
}
