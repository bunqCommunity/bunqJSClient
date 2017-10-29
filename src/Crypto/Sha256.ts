const forge = require("./CustomForge");
import Logger from "../Helpers/Logger";

const forgeSha256 = forge.sha256;
const forgeUtil = forge.util;

/**
 * Hashes a string using sha256
 * @param {string} string
 * @returns {Promise<string>}
 */
export const stringToHash = async (string: string) => {
    const messageDigest = forgeSha256.create();
    messageDigest.update(string);
    return messageDigest.digest().toHex();
};

/**
 * Signs a string using a privateKey
 * @param {string} data
 * @param privateKey
 * @returns {Promise<string>}
 */
export const signString = async (data: string, privateKey: any) => {
    // create a new message digest for our string
    const messageDigest = forgeSha256.create();
    messageDigest.update(data, "utf8");

    // sign it with a private key
    const signatureBytes = privateKey.sign(messageDigest);
    // encode to base 64 and return it
    return forgeUtil.encode64(signatureBytes); ;
}

/**
 * Verifies if a string was signed by a public key
 * @param {string} data
 * @param publicKey
 * @param {string} signature
 * @returns {Promise<string>}
 */
export const verifyString = async (
    data: string,
    publicKey: any,
    signature: string
) => {
    // create a new message digest for our string
    const messageDigest = forgeSha256.create();
    messageDigest.update(data, "utf8");

    // decode the base64 signature
    const rawSignature = forgeUtil.decode64(signature);

    try {
        // verify the signature with the public key
        const verified = publicKey.verify(messageDigest, rawSignature);
        Logger.debug(verified);
        return true;
    } catch (ex) {
        Logger.error(ex);
        return false;
    }
};
