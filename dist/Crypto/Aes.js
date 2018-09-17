"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forge = require("./CustomForge");
const forgeCipher = forge.cipher;
const forgeUtil = forge.util;
/**
 * Returns boolean based on given key validity
 * @param key
 * @returns {Promise<boolean>}
 */
exports.validateKey = key => {
    try {
        const keyBytes = forgeUtil.hexToBytes(key);
        // check key length
        switch (keyBytes.length) {
            case 16:
            case 24:
            case 32:
                return true;
        }
    }
    catch (ex) { }
    return false;
};
/**
 * Encrypt a string with a pre-defined encryption key
 * @param string
 * @param encryptionKey
 * @returns {Promise.<{iv: string, encryptedString: string}>}
 */
exports.encryptString = async (string, encryptionKey) => {
    // create a random initialization vector
    const iv = forge.random.getBytesSync(32);
    // turn hex-encoded key into bytes
    const encryptionKeyBytes = forgeUtil.hexToBytes(encryptionKey);
    // create a new aes-cbc cipher with our key
    const cipher = forgeCipher.createCipher("AES-CBC", encryptionKeyBytes);
    // turn our string into a buffer
    const buffer = forgeUtil.createBuffer(string, "utf8");
    cipher.start({ iv: iv });
    cipher.update(buffer);
    cipher.finish();
    return {
        iv: forgeUtil.bytesToHex(iv),
        key: encryptionKey,
        encryptedString: cipher.output.toHex()
    };
};
/**
 * Decrypts a string using the key and iv
 * @param encryptedString
 * @param key
 * @param iv
 * @returns {Promise.<String>}
 */
exports.decryptString = async (encryptedString, key, iv) => {
    // get byte data from hex encoded strings
    const encrypedBytes = forgeUtil.hexToBytes(encryptedString);
    // create a new forge buffer using the bytes
    const encryptedBuffer = forgeUtil.createBuffer(encrypedBytes, "raw");
    const keyBytes = forgeUtil.hexToBytes(key);
    const ivBytes = forgeUtil.hexToBytes(iv);
    // create a new decipher with our key and iv
    const decipher = forgeCipher.createDecipher("AES-CBC", keyBytes);
    decipher.start({ iv: ivBytes });
    decipher.update(encryptedBuffer);
    // check the decipher results
    const result = decipher.finish();
    if (!result) {
        throw new Error("Failed to decrypt string, the encryption string might have changed");
    }
    // get the raw bytes from the forge buffer
    const outputBytes = decipher.output.getBytes();
    // turn forge bytes into a regular buffer
    const nodeBuffer = Buffer.from(outputBytes, "binary");
    // return the result as an utf8-encoded string
    return nodeBuffer.toString("utf8");
};
