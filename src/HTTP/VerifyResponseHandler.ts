import { verifyString } from "../Crypto/Sha256";
import BunqJSClient from "../BunqJSClient";
import Session from "../Session";
import LoggerInterface from "../Interfaces/LoggerInterface";
import { arrayBufferToString, fixHeaderCase } from "../Helpers/Utils";
import { BUNQ_SERVER_SIGNATURE_HEADER_KEY } from "../ApiAdapter";
import ErrorCodes from "../Helpers/ErrorCodes";

export default class VerifyResponseHandler {
    public Session: Session;
    public logger: LoggerInterface;
    public BunqJSClient: BunqJSClient;

    constructor(Session: Session, loggerInterface: LoggerInterface, BunqJSClient: BunqJSClient) {
        this.BunqJSClient = BunqJSClient;
        this.Session = Session;
        this.logger = loggerInterface;
    }

    /**
     * Verifies the response of a request
     * @param response
     * @returns {Promise<boolean>}
     */
    public async verifyResponse(response): Promise<boolean> {
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
            const headerKeyFixed = fixHeaderCase(headerKey);

            // only verify bunq headers and ignore the server signature
            if (headerKeyFixed.includes("X-Bunq") && !headerKeyFixed.includes(BUNQ_SERVER_SIGNATURE_HEADER_KEY)) {
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

        // generate the full template
        const headers = headerStrings.sort().join("\n");
        const template: string = `${response.status}\n${headers}\n\n${data}`;

        // use lowercase version for axios
        const lowerCaseHeader = BUNQ_SERVER_SIGNATURE_HEADER_KEY.toLowerCase();

        // only validate if a server signature is set
        if (!response.headers[lowerCaseHeader]) {
            return false;
        }

        // verify the string and return results
        const verifyResult = await verifyString(
            template,
            this.Session.serverPublicKey,
            response.headers[lowerCaseHeader]
        );

        return verifyResult;
    }
}
