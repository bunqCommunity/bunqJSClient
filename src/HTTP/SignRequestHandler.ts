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
        // manually include the user agent
        /* istanbul ignore else - can't be tested for browser */
        if (typeof navigator === "undefined") {
            const nodeUserAgent = `Node-${process.version}-bunqJSClient`;
            request.setHeader("User-Agent", nodeUserAgent);
        } else {
            request.setHeader("User-Agent", navigator.userAgent);
        }

        if (options.isEncrypted || options.includesFile) {
            // overwrite transformRequest
            request.setOption("transformRequest", (data: any) => {
                return data;
            });
        }

        // serialize the data
        let data: string | Buffer = "";
        let dataEncoding = "raw";
        const appendDataWhitelist = ["POST", "PUT", "DELETE"];
        if (options.includesFile) {
            const requestData: Buffer = request.data;
            data = requestData.toString("binary");

            request.setData(requestData);
        } else if (options.isEncrypted) {
            const requestData: Buffer = request.data;
            data = requestData.toString("binary");

            request.setData(requestData);
        } else if (appendDataWhitelist.some(item => item === request.method)) {
            data = JSON.stringify(request.data);
            dataEncoding = "utf8";
        }

        // sign the body with our private key
        const signature = await signString(data, this.Session.privateKey, dataEncoding);

        /* istanbul ignore next line - can't be tested for react native */
        if (typeof navigator !== "undefined" && navigator.product !== "ReactNative") {
            // remove the user agent again if we're in a browser env where we aren't allowed to
            request.removeHeader("User-Agent");
        }

        // set the signature
        request.setSigned(signature);
    }
}
