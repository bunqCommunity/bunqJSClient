"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forge = require("./CustomForge");
const awaiting = require("awaiting");
const forgeRsa = forge.rsa;
const forgePki = forge.pki;
/**
 * Generates a new keypair
 * @param {number} bits
 * @param {number} workers
 * @returns {Promise<object>}
 */
exports.createKeyPair = async (bits = 2048, workers = -1) => {
    return awaiting.callback(forgeRsa.generateKeyPair, {
        bits: bits,
        workers: workers
    });
};
/**
 * @param {KeyPair} keypair
 * @returns {Promise<{publicKey: any; privateKey: any}>}
 */
exports.keyPairToPem = async (keypair) => {
    return {
        publicKey: await exports.publicKeyToPem(keypair.publicKey),
        privateKey: await exports.privateKeyToPem(keypair.privateKey)
    };
};
/**
 * @param {string} publicKey
 * @returns {Promise<any>}
 */
exports.publicKeyToPem = async (publicKey) => {
    return forgePki.publicKeyToPem(publicKey);
};
/**
 * @param {string} privateKey
 * @returns {Promise<any>}
 */
exports.privateKeyToPem = async (privateKey) => {
    return forgePki.privateKeyToPem(privateKey);
};
/**
 * @param {string} publicKeyPem
 * @returns {Promise<string>}
 */
exports.publicKeyFromPem = async (publicKeyPem) => {
    return forgePki.publicKeyFromPem(publicKeyPem);
};
/**
 * @param {string} privateKeyPem
 * @returns {Promise<string>}
 */
exports.privateKeyFromPem = async (privateKeyPem) => {
    return forgePki.privateKeyFromPem(privateKeyPem);
};
