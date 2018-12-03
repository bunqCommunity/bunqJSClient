"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Url = require("url");
const Sha256_1 = require("../Crypto/Sha256");
class SignRequestHandler {
    constructor(Session, loggerInterface, BunqJSClient) {
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
    async signRequest(request, options) {
        let url = request.requestConfig.url;
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
        }
        else {
            request.setHeader("User-Agent", navigator.userAgent);
        }
        // create a list of headers
        const headerStrings = [];
        Object.keys(request.headers)
            .sort()
            .map(headerKey => {
            if (headerKey.includes("X-Bunq") ||
                headerKey.includes("Cache-Control") ||
                headerKey.includes("User-Agent")) {
                headerStrings.push(`${headerKey}: ${request.headers[headerKey]}`);
            }
        });
        // remove empty strings and join into a list of headers for the template
        const headers = headerStrings.join("\n");
        // serialize the data
        let data = "";
        const appendDataWhitelist = ["POST", "PUT", "DELETE"];
        if (dataIsEncrypted === true) {
            data = request.data;
        }
        else if (appendDataWhitelist.some(item => item === request.method)) {
            data = JSON.stringify(request.data);
        }
        // the full template to sign
        const template = `${request.method} ${url}
${headers}

${data}`;
        // sign the template with our private key
        const signature = await Sha256_1.signString(template, this.Session.privateKey);
        if (typeof navigator !== "undefined") {
            // remove the user agent again if we're in a browser env where we aren't allowed to
            request.removeHeader("User-Agent");
        }
        // set the signature
        request.setSigned(signature);
    }
}
exports.default = SignRequestHandler;
