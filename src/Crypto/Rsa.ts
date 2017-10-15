import * as forge from "node-forge";
import * as awaiting from "awaiting";
import KeyPair from "../Types/Keypair";

const rsa = forge.rsa;
const pki = forge.pki;

/**
 * Generates a new keypair
 * @param {number} bits
 * @param {number} workers
 * @returns {Promise<object>}
 */
export const createKeyPair = async (bits: number = 2048, workers: number = -1) => {
    return awaiting.callback(rsa.generateKeyPair, {
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
    return pki.publicKeyToPem(publicKey);
};

/**
 * @param {string} privateKey
 * @returns {Promise<any>}
 */
export const privateKeyToPem = async (privateKey: any) => {
    return pki.privateKeyToPem(privateKey);
};

/**
 * @param {string} privateKeyPem
 * @returns {Promise<string>}
 */
export const publicKeyFromPem = async (privateKeyPem: string) => {
    return pki.publicKeyFromPem(privateKeyPem);
};
/**
 * @param {string} privateKeyPem
 * @returns {Promise<string>}
 */
export const privateKeyFromPem = async (privateKeyPem: string) => {
    return pki.privateKeyFromPem(privateKeyPem);
};
