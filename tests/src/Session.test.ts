import "../TestHelpers/Prepare";

import * as moxios from "moxios";
import Logger from "../../src/Helpers/Logger";
import BunqJSClient from "../../src/BunqJSClient";
import Session from "../../src/Session";

import CustomDb from "../TestHelpers/CustomDb";
import { randomHex } from "../TestHelpers/RandomData";
import Prepare from "../TestHelpers/Prepare";
import {
    installationRegistration,
    deviceServerRegistration,
    sessionRegistration
} from "../TestHelpers/DefaultResponses";

const fakeApiKey = randomHex(64);
const fakeEncryptionKey = randomHex(32);
const fakeEncryptionKey2 = randomHex(32);

/**
 * Create a default app to use in tests
 * @param {string} apiKey
 * @param {string} dbName
 * @param {Array} runOptions
 * @returns {Promise<BunqJSClient>}
 */
const setupApp = async (
    dbName: string,
    apiKey: string = fakeApiKey,
    runOptions = [[], "SANDBOX", fakeEncryptionKey]
) => {
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

describe("Session", () => {
    beforeAll(async done => {
        await Prepare();
        done();
    });

    beforeEach(function() {
        moxios.install();
    });

    afterEach(function() {
        moxios.uninstall();
    });

    describe("#setup()", () => {
        it("should run setup with default options", async () => {
            const session = new Session(new CustomDb("SessionSetup"), Logger);

            // setup a session with default options
            const setupResult = await session.setup(
                fakeApiKey,
                [],
                "SANDBOX",
                fakeEncryptionKey
            );
            expect(setupResult);
        });
    });

    describe("#setupKeypair()", () => {
        it("should create a new valid keypair", async () => {
            const session = new Session(
                new CustomDb("SessionSetupKeypair"),
                Logger
            );

            // setup a session with default options
            const setupResult = await session.setup(
                fakeApiKey,
                [],
                "SANDBOX",
                fakeEncryptionKey
            );
            expect(setupResult);

            const oldPublicPem = session.publicKeyPem;
            const oldPrivatePem = session.privateKeyPem;

            // create a new keypair
            const keyPair = await session.setupKeypair(true, 512, true);
            expect(keyPair);

            // keypairs should be different
            expect(oldPublicPem !== session.publicKeyPem);
            expect(oldPrivatePem !== session.privateKeyPem);
        });

        it("should create a valid keypair and then re-use it", async () => {
            const session = new Session(
                new CustomDb("SessionSetupKeypair2"),
                Logger
            );

            // setup a session with default options
            const setupResult = await session.setup(
                fakeApiKey,
                [],
                "SANDBOX",
                fakeEncryptionKey
            );
            expect(setupResult);

            // create a new keypair and overwrite the keypair from the setup
            const keyPair = await session.setupKeypair(true, 512, true);
            expect(keyPair);

            const oldPublicPem2 = session.publicKeyPem;
            const oldPrivatePem2 = session.privateKeyPem;

            // use existing keypair
            const keyPair2 = await session.setupKeypair(false, 512, true);
            expect(keyPair2);

            // keypairs should be the same
            expect(oldPublicPem2 === session.publicKeyPem);
            expect(oldPrivatePem2 === session.privateKeyPem);
        });

        it("should create a valid keypair and overwrite it", async () => {
            const session = new Session(
                new CustomDb("SessionSetupKeypair2"),
                Logger
            );

            // setup a session with default options
            const setupResult = await session.setup(
                fakeApiKey,
                [],
                "SANDBOX",
                fakeEncryptionKey
            );
            expect(setupResult);

            const oldPublicPem = session.publicKeyPem;
            const oldPrivatePem = session.privateKeyPem;

            // create a new keypair and overwrite the keypair from the setup
            const keyPair = await session.setupKeypair(true, 512, true);
            expect(keyPair);

            // keypairs should be different
            expect(oldPublicPem !== session.publicKeyPem);
            expect(oldPrivatePem !== session.privateKeyPem);
        });
    });

    describe("#storeSession()", () => {
        it("should store the session data in the storage interface", async () => {
            const session = new Session(
                new CustomDb("SessionStoreSession1"),
                Logger
            );

            // setup a session with default options
            const setupResult = await session.setup(
                fakeApiKey,
                [],
                "SANDBOX",
                fakeEncryptionKey
            );
            expect(setupResult);

            // store the session in the storage interface
            const storeSession = await session.storeSession();
            expect(storeSession);
        });

        it("should store and load the session data in the storage interface", async () => {
            const session = new Session(
                new CustomDb("SessionStoreSession2"),
                Logger
            );

            // setup a session with default options
            const setupResult = await session.setup(
                fakeApiKey,
                [],
                "SANDBOX",
                fakeEncryptionKey
            );
            expect(setupResult);

            // store the session in the storage interface
            const storeSession = await session.storeSession();
            expect(storeSession);

            // load the session from the storage interface
            const loadSession = await session.loadSession();
            expect(loadSession);
        });

        it("should invalidate the stored session when environment changes", async () => {
            const session = new Session(
                new CustomDb("SessionStoreSession3"),
                Logger
            );

            // setup a session with default options
            const setupResult = await session.setup(
                fakeApiKey,
                [],
                "SANDBOX",
                fakeEncryptionKey
            );
            expect(setupResult);

            // store the session in the storage interface
            const storeSession = await session.storeSession();
            expect(storeSession);

            // setup a session with default options
            const setupResult2 = await session.setup(
                fakeApiKey,
                [],
                "PRODUCTION",
                fakeEncryptionKey
            );
            expect(setupResult2);

            // session should be invalidated because environment is different
            const loadSession = await session.loadSession();
            expect(loadSession === false);
        });

        it("should detect if the environment changes and invalidate storage", async () => {
            const session = new Session(
                new CustomDb("SessionStoreSession4"),
                Logger
            );

            // setup a session with default options
            const setupResult = await session.setup(
                fakeApiKey,
                [],
                "SANDBOX",
                fakeEncryptionKey
            );
            expect(setupResult);

            // store the session in the storage interface
            const storeSession = await session.storeSession();
            expect(storeSession);

            // setup a session with a different environment
            const setupResult2 = await session.setup(
                fakeApiKey,
                [],
                "PRODUCTION",
                fakeEncryptionKey
            );
            expect(setupResult2);

            // session should be invalidated because environment is different
            const loadSession = await session.loadSession();
            expect(loadSession === false);
        });

        it("should detect if the api key changes and invalidate storage", async () => {
            const session = new Session(
                new CustomDb("SessionStoreSession4"),
                Logger
            );

            // setup a session with default options
            const setupResult = await session.setup(
                fakeApiKey,
                [],
                "SANDBOX",
                fakeEncryptionKey
            );
            expect(setupResult);

            // store the session in the storage interface
            const storeSession = await session.storeSession();
            expect(storeSession);

            // setup a session with a different api key
            const setupResult2 = await session.setup(
                fakeApiKey,
                [],
                "SANDBOX",
                fakeEncryptionKey2
            );
            expect(setupResult2);

            // session should be invalidated because environment is different
            const loadSession = await session.loadSession();
            expect(loadSession === false);
        });
    });
});
