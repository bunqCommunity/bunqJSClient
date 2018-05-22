import * as moxios from "moxios";
import BunqJSClient from "../../src/BunqJSClient";

import Prepare from "./Prepare";
import CustomDb from "./CustomDb";
import { randomHex } from "./RandomData";
import {
    installationRegistration,
    deviceServerRegistration,
    sessionRegistration
} from "./DefaultResponses";

const fakeApiKey = randomHex(64);
const fakeEncryptionKey = randomHex(32);

/**
 * Create a default app to use in tests
 * @param {string} apiKey
 * @param {string} dbName
 * @param {Array} runOptions
 * @returns {Promise<BunqJSClient>}
 */
export default async (
    dbName: string,
    apiKey: string = fakeApiKey,
    runOptions = [[], "SANDBOX", fakeEncryptionKey]
) => {
    Prepare();

    const app = new BunqJSClient(new CustomDb(dbName));
    await app.run(apiKey, ...runOptions);

    // installationRegistration
    const installationPromise = app.install();
    const installationHandler = installationRegistration(moxios);
    await installationPromise;
    await installationHandler;

    // device registration
    const devicePromise = app.registerDevice();
    const deviceHandler = deviceServerRegistration(moxios);
    await devicePromise;
    await deviceHandler;

    // session registration
    const sessionPromise = app.registerSession();
    const sessionHandler = sessionRegistration(moxios);
    await sessionPromise;
    await sessionHandler;

    return app;
};
