import * as forge from "node-forge";
import { encryptString } from "../Crypto/Sha256";
import BunqJSClient from "../BunqJSClient";
import Session from "../Session";
import LoggerInterface from "../Interfaces/LoggerInterface";
import Request from "./Request";

import ApiAdapterOptions from "../Types/ApiAdapterOptions";

const HEADER_CLIENT_ENCRYPTION_HMAC = "X-Bunq-Client-Encryption-Hmac";
const HEADER_CLIENT_ENCRYPTION_IV = "X-Bunq-Client-Encryption-Iv";
const HEADER_CLIENT_ENCRYPTION_KEY = "X-Bunq-Client-Encryption-Key";

export default class EncryptRequestHandler {
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
    public async encryptRequest(request: Request, options: ApiAdapterOptions): Promise<void> {
        const body = JSON.stringify(request.requestConfig.data);

        const iv = forge.random.getBytesSync(16);
        const key = forge.random.getBytesSync(16);

        const encryptedAesKey = await encryptString(key, this.Session.serverPublicKey, true);
        const encryptedBody: string = this.getEncryptedBody(key, iv, body);
        const hmacBytes: string = this.getBodyHmac(key, iv, encryptedBody);

        // set new body
        request.setData(encryptedBody);

        // disable request transform
        request.setOptions("transformRequest", (data: any, headers: any) => {
            return data;
        });

        // set headers
        request.setHeader(HEADER_CLIENT_ENCRYPTION_HMAC, forge.util.encode64(hmacBytes));
        request.setHeader(HEADER_CLIENT_ENCRYPTION_IV, forge.util.encode64(iv));
        request.setHeader(HEADER_CLIENT_ENCRYPTION_KEY, forge.util.encode64(encryptedAesKey));
    }

    /**
     * @param {string} key
     * @param {string} iv
     * @param {string} body
     */
    private getEncryptedBody(key: string, iv: string, body: string): string {
        const cipher = forge.cipher.createCipher("AES-CBC", key);

        const buffer = forge.util.createBuffer(body, "raw");
        cipher.start({ iv: iv });
        cipher.update(buffer);
        cipher.finish();

        return cipher.output.getBytes();
    }

    /**
     * @param {string} key
     * @param {string} iv
     * @param {string} encryptedBody
     */
    private getBodyHmac(key: string, iv: string, encryptedBody: string): string {
        const mergedContent = iv + encryptedBody;

        const hmac = forge.hmac.create();
        hmac.start("sha1", key);
        hmac.update(mergedContent);

        return hmac.digest().getBytes();
    }
}
