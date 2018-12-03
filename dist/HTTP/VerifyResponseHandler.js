"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sha256_1 = require("../Crypto/Sha256");
const Utils_1 = require("../Helpers/Utils");
const ApiAdapter_1 = require("../ApiAdapter");
class VerifyResponseHandler {
    constructor(Session, loggerInterface, BunqJSClient) {
        this.BunqJSClient = BunqJSClient;
        this.Session = Session;
        this.logger = loggerInterface;
    }
    /**
     * Verifies the response of a request
     * @param response
     * @returns {Promise<boolean>}
     */
    async verifyResponse(response) {
        if (!this.Session.serverPublicKey) {
            // no public key so we can't verify, return true if we aren't installed yet
            return this.Session.installToken === null;
        }
        // fallback values for invalid response objects
        if (!response.status)
            response.status = 200;
        if (!response.headers)
            response.headers = {};
        // create a list of headers
        const headerStrings = [];
        Object.keys(response.headers).map(headerKey => {
            const headerKeyFixed = Utils_1.fixHeaderCase(headerKey);
            // only verify bunq headers and ignore the server signature
            if (headerKeyFixed.includes("X-Bunq") && !headerKeyFixed.includes(ApiAdapter_1.BUNQ_SERVER_SIGNATURE_HEADER_KEY)) {
                headerStrings.push(`${headerKeyFixed}: ${response.headers[headerKey]}`);
            }
        });
        // serialize the data
        let data = "";
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
        }
        else {
            data = Utils_1.arrayBufferToString(response.data);
        }
        // generate the full template
        const headers = headerStrings.sort().join("\n");
        const template = `${response.status}\n${headers}\n\n${data}`;
        // use lowercase version for axios
        const lowerCaseHeader = ApiAdapter_1.BUNQ_SERVER_SIGNATURE_HEADER_KEY.toLowerCase();
        // only validate if a server signature is set
        if (!response.headers[lowerCaseHeader]) {
            return false;
        }
        // verify the string and return results
        const verifyResult = await Sha256_1.verifyString(template, this.Session.serverPublicKey, response.headers[lowerCaseHeader]);
        return verifyResult;
    }
}
exports.default = VerifyResponseHandler;
