import BunqJSClient from "../../src/BunqJSClient";

import Prepare from "./Prepare";
import CustomDb from "./CustomDb";
import { randomHex } from "./RandomData";
import { UserInfo } from "../TestData/api-session-registration";
import { privateKeyFromPem, publicKeyFromPem } from "../../src/Crypto/Rsa";

const FAKE_API_KEY = randomHex(64);
const FAKE_ENCRYPTION_KEY = randomHex(32);

/**
 * Create a default app to use in tests
 * @param {string} apiKey
 * @param {string} dbName
 * @param {Array} runOptions
 * @returns {Promise<BunqJSClient>}
 */
export default async (setupName: string | false = false, apiKey: string = FAKE_API_KEY): Promise<BunqJSClient> => {
    Prepare();

    const dbName: string = setupName || randomHex(32);

    const app = new BunqJSClient(new CustomDb(dbName));
    await app.run(apiKey, [], "SANDBOX", FAKE_ENCRYPTION_KEY);

    // setup
    app.Session.apiKey = apiKey;
    app.Session.allowedIps = [];
    app.Session.environmentType = "SANDBOX";
    app.Session.encryptionKey = FAKE_ENCRYPTION_KEY;

    app.Session.publicKeyPem = process.env.CI_PUBLIC_KEY_PEM;
    app.Session.privateKeyPem = process.env.CI_PRIVATE_KEY_PEM;
    app.Session.publicKey = await publicKeyFromPem(app.Session.publicKeyPem);
    app.Session.privateKey = await privateKeyFromPem(app.Session.privateKeyPem);

    // installation
    app.Session.serverPublicKeyPem = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA2cKx+z2NbEapmQWvvov2
n0k699ZJmWn1yZulOfVeSfHKdGAVj4TlWwAJuvFmThgtHTp+PiJUxKsNUrHHcp+A
CY0mVH+6f19roBH/B4IS7H5fnXMnpf39IfPDw+hv17bKE+dnuhPuEcloG+LgEOgo
cjwEb18h5IR3dfbxBHXUce2i4wqfGakAzHumJbPb5XgMMYxng+fqV7uH34CpRpS0
4bzjuvkwMlRWQsIMUuOvcAjRoCMf1aViFd2+4sEm7RFlyux5PKkq72F/GITirzlA
T7T22qrApKnZNPR9y0pGC13FFdx5lVszBNnsKyXDwqrzOsUONSFU+F6JRg6xqUoC
iQIDAQAB
-----END PUBLIC KEY-----`;
    app.Session.serverPublicKey = await publicKeyFromPem(app.Session.serverPublicKeyPem);
    app.Session.installToken = "a4f9d888eea84f52722b9baf2f17c289d549edf6e0eccdbf868eb922be306fb6";
    app.Session.installUpdated = new Date();
    app.Session.installCreated = new Date();

    // device registration
    app.Session.deviceId = 123123;

    // session registration
    app.Session.sessionExpiryTime = new Date();
    app.Session.sessionTimeout = 300;
    app.Session.sessionId = 42;
    app.Session.sessionToken = "a4f9d888eea84f52722b9baf2f17c289d549edf6e0eccdbf868eb922be306fb6";
    app.Session.sessionTokenId = 839;
    app.Session.userInfo = {
        UserCompany: UserInfo,
        UserPerson: UserInfo,
        UserLight: UserInfo
    };

    return app;
};
