import * as Url from "url";
import { signString } from "../Crypto/Sha256";
import BunqJSClient from "../BunqJSClient";
import Session from "../Session";
import LoggerInterface from "../Interfaces/LoggerInterface";
import Request from "./Request";

import ApiAdapterOptions from "../Types/ApiAdapterOptions";

export default class SignRequestHandler {
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
     * @param {Request} request
     * @param {ApiAdapterOptions} options
     * @returns {Promise<string>}
     */
    public async signRequest(request: Request, options: ApiAdapterOptions): Promise<void> {
        let url: string = request.requestConfig.url;
        const dataIsEncrypted = options.isEncrypted === true;

        // Check if one or more param is set and add it to the url
        if (request.requestConfig.params && Object.keys(request.requestConfig.params).length > 0) {
            const params = new Url.URLSearchParams(request.requestConfig.params);
            url = `${request.requestConfig.url}?${params.toString()}`;
        }

        // manually include the user agent
        if (typeof navigator === "undefined") {
            const nodeUserAgent = `Node-${process.version}-bunqJSClient`;
            request.setHeader("User-Agent", nodeUserAgent);
        } else {
            request.setHeader("User-Agent", `${navigator.userAgent}-bunqJSClient`);
        }

        // create a list of headers
        const headerStrings = [];
        Object.keys(request.headers)
            .sort()
            .map(headerKey => {
                if (
                    headerKey.includes("X-Bunq") ||
                    headerKey.includes("Cache-Control") ||
                    headerKey.includes("User-Agent")
                ) {
                    headerStrings.push(`${headerKey}: ${request.headers[headerKey]}`);
                }
            });

        // remove empty strings and join into a list of headers for the template
        const headers = headerStrings.join("\n");

        // serialize the data
        let data: string = "";
        const appendDataWhitelist = ["POST", "PUT", "DELETE"];
        if (dataIsEncrypted === true) {
            data = request.data;
        } else if (appendDataWhitelist.some(item => item === request.method)) {
            data = JSON.stringify(request.data);
        }

        // the full template to sign
        const template: string = `${request.method} ${url}
${headers}

${data}`;

        // sign the template with our private key
        const signature = await signString(template, this.Session.privateKey);

        // set the signature
        request.setSigned(signature);
    }
}
