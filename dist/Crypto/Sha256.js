"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forge = require("./CustomForge");
const Logger_1 = require("../Helpers/Logger");
const forgeSha256 = forge.sha256;
const forgeUtil = forge.util;
/**
 * Hashes a string using sha256
 * @param {string} string
 * @returns {Promise<string>}
 */
exports.stringToHash = async (string) => {
    const messageDigest = forgeSha256.create();
    messageDigest.update(string);
    return messageDigest.digest().toHex();
};
/**
 * Encrypts a string using a publicKey
 * @param {string} data
 * @param publicKey
 * @returns {Promise<string>}
 */
exports.encryptString = async (data, publicKey) => {
    // create a new message digest for our string
    const messageDigest = forgeSha256.create();
    messageDigest.update(data, "utf8");
    // sign it with a private key
    const signatureBytes = publicKey.encrypt(messageDigest);
    // encode to base 64 and return it
    return forgeUtil.encode64(signatureBytes);
};
/**
 * Signs a string using a privateKey
 * @param {string} data
 * @param privateKey
 * @returns {Promise<string>}
 */
exports.signString = async (data, privateKey) => {
    // create a new message digest for our string
    const messageDigest = forgeSha256.create();
    messageDigest.update(data, "utf8");
    // sign it with a private key
    const signatureBytes = privateKey.sign(messageDigest);
    // encode to base 64 and return it
    return forgeUtil.encode64(signatureBytes);
};
/**
 * Verifies if a string was signed by a public key
 * @param {string} data
 * @param publicKey
 * @param {string} signature
 * @returns {Promise<string>}
 */
exports.verifyString = async (data, publicKey, signature) => {
    // create a new message digest for our string
    const messageDigest = forgeSha256.create();
    messageDigest.update(data, "utf8");
    try {
        // decode the base64 signature
        const rawSignature = forgeUtil.decode64(signature);
        // verify the signature with the public key
        return publicKey.verify(messageDigest.digest().getBytes(), rawSignature);
    }
    catch (ex) {
        Logger_1.default.debug(ex);
        return false;
    }
};
