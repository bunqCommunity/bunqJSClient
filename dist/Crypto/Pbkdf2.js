"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forge = require("./CustomForge");
exports.derivePasswordKey = async (password, salt = false, iterations = 10000) => {
    if (salt === false) {
        // no salt given, create a new random one
        salt = forge.random.getBytesSync(128);
    }
    else {
        // get bytes from the hex salt
        salt = forge.util.hexToBytes(salt);
    }
    // asynchronously derive a key from the password
    const derivedKey = await new Promise((resolve, reject) => {
        // derive a 32-byte key from the password
        forge.pkcs5.pbkdf2(password, salt, iterations, 16, (errorMessage, derivedKey) => {
            if (errorMessage) {
                reject(errorMessage);
            }
            else {
                resolve(derivedKey);
            }
        });
    });
    // encode the bytes as hex
    const hexKey = forge.util.bytesToHex(derivedKey);
    const hexSalt = forge.util.bytesToHex(salt);
    return {
        key: hexKey,
        salt: hexSalt
    };
};
