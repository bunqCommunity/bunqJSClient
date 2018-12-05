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
        const key = forge.random.getBytesSync(32);

        const encryptedAesKey = await encryptString(key, this.Session.serverPublicKey, true);
        const encryptedBody: string = this.getEncryptedBody(key, iv, body);
        const hmacBuffer: string = this.getBodyHmac(key, iv, encryptedBody);

        // set new body
        request.setData(encryptedBody);

        // disable request transform
        request.setOptions("transformRequest", data => {
            // don't transform the data, return it directly
            return data;
        });

        // set headers
        request.setHeader("Content-Type", "multipart/form-data");
        request.setHeader(HEADER_CLIENT_ENCRYPTION_HMAC, forge.util.encode64(hmacBuffer));
        request.setHeader(HEADER_CLIENT_ENCRYPTION_IV, forge.util.encode64(iv));
        request.setHeader(HEADER_CLIENT_ENCRYPTION_KEY, forge.util.encode64(encryptedAesKey));
    }

    /**
     * @param key
     * @param iv
     * @param body
     */
    private getEncryptedBody(key, iv, body): string {
        const cipher = forge.cipher.createCipher("AES-CBC", key);

        const buffer = forge.util.createBuffer(body, "utf8");
        cipher.start({ iv: iv });
        cipher.update(buffer);
        cipher.finish();

        return cipher.output.getBytes();
    }

    /**
     * @param key
     * @param iv
     * @param encryptedBody
     */
    private getBodyHmac(key, iv, encryptedBody): string {
        const hmacInput: string = iv + encryptedBody;

        const hmac = forge.hmac.create();
        hmac.start("sha1", key);
        hmac.update(hmacInput);
        return hmac.digest().getBytes();
    }
}
