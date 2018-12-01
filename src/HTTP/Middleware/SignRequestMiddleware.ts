import { AxiosRequestConfig } from "axios";
import * as Url from "url";
import { signString } from "../../Crypto/Sha256";
import BunqJSClient from "../../BunqJSClient";
import Session from "../../Session";
import LoggerInterface from "../../Interfaces/LoggerInterface";

export default class SignRequestMiddleware {
    public Session: Session;
    public logger: LoggerInterface;
    public BunqJSClient: BunqJSClient;

    constructor(Session: Session, loggerInterface: LoggerInterface, BunqJSClient: BunqJSClient) {
        this.BunqJSClient = BunqJSClient;
        this.Session = Session;
        this.logger = loggerInterface;
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
}
