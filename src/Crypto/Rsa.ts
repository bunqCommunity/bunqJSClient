const forge = require("./CustomForge");
import * as awaiting from "awaiting";
import KeyPair from "../Types/Keypair";

const forgeRsa = forge.rsa;
const forgePki = forge.pki;

/**
 * Generates a new keypair
 * @param {number} bits
 * @param {number} workers
 * @returns {Promise<object>}
 */
export const createKeyPair = async (bits: number = 2048, workers: number = -1) => {
    return awaiting.callback(forgeRsa.generateKeyPair, {
        bits: bits,
        workers: workers
    });
};

/**
 * @param {KeyPair} keypair
 * @returns {Promise<{publicKey: any; privateKey: any}>}
 */
export const keyPairToPem = async (keypair: KeyPair) => {
    return {
        publicKey: await publicKeyToPem(keypair.publicKey),
        privateKey: await privateKeyToPem(keypair.privateKey)
    };
};

/**
 * @param {string} publicKey
 * @returns {Promise<any>}
 */
export const publicKeyToPem = async (publicKey: any) => {
    return forgePki.publicKeyToPem(publicKey);
};

/**
 * @param {string} privateKey
 * @returns {Promise<any>}
 */
export const privateKeyToPem = async (privateKey: any) => {
    return forgePki.privateKeyToPem(privateKey);
};

/**
 * @param {string} publicKeyPem
 * @returns {Promise<string>}
 */
export const publicKeyFromPem = async (publicKeyPem: string) => {
    return forgePki.publicKeyFromPem(publicKeyPem);
};
/**
 * @param {string} privateKeyPem
 * @returns {Promise<string>}
 */
export const privateKeyFromPem = async (privateKeyPem: string) => {
    return forgePki.privateKeyFromPem(privateKeyPem);
};
