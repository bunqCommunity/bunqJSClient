import * as forge from "node-forge";
const sha256 = forge.sha256;
const util = forge.util;

/**
 * Hashes a string using sha256
 * @param {string} string
 * @returns {Promise<string>}
 */
export const stringToHash = async (string: string) => {
    const messageDigest = sha256.create();
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
    const messageDigest = sha256.create();
    messageDigest.update(data, "utf8");

    // sign it with a private key
    const signatureBytes = privateKey.sign(messageDigest);
    // encode to base 64
    const signatureEncoded: string = util.encode64(signatureBytes);

    return signatureEncoded;
};
