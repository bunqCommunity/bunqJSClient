import * as moxios from "moxios";
import Logger from "../../src/Helpers/Logger";
import Session from "../../src/Session";

import CustomDb from "../TestHelpers/CustomDb";
import { randomHex } from "../TestHelpers/RandomData";
import Prepare from "../TestHelpers/Prepare";

const fakeApiKey = randomHex(64);
const fakeApiKey2 = randomHex(64);
const fakeEncryptionKey = randomHex(32);
const fakeEncryptionKey2 = randomHex(32);

describe("Session", () => {
    beforeEach(function() {
        Prepare();
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
        it("should store and load the session data in the storage interface", async () => {
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

            // load the session from the storage interface
            const loadSession = await session.loadSession();
            expect(loadSession);
        });

        it("should throw an error if an invalid environment is given", async () => {
            const session = new Session(
                new CustomDb("SessionStoreSession2"),
                Logger
            );

            // setup a session with default options and an invalid environment
            session
                .setup(fakeApiKey, [], "SANDBOX_AB", fakeEncryptionKey)
                .then(() => {
                    // this shouldn't succeed so this is considered an error
                    expect(false);
                })
                .catch(error => {
                    // error was expected
                    expect(true);
                });
        });
    });

    describe("#loadSession()", () => {
        it("should detect if the environment changes and invalidate storage", async () => {
            const session = new Session(
                new CustomDb("SessionLoadSession1"),
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

        it("should detect if the encryption key changes and invalidate storage", async () => {
            const session = new Session(
                new CustomDb("SessionLoadSession2"),
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

        it("should detect if the stored api key is different from the current key and invalidate storage", async () => {
            const session = new Session(
                new CustomDb("SessionLoadSession4"),
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
                fakeApiKey2,
                [],
                "SANDBOX",
                fakeEncryptionKey
            );
            expect(setupResult2);

            // session should be invalidated because environment is different
            const loadSession = await session.loadSession();
            expect(loadSession === false);
        });
    });

    describe("#loadEncryptedData ()", () => {
        it("should return false if no data is stored", async () => {
            const session = new Session(
                new CustomDb("SessionLoadEncryptedData1"),
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

            const loadSession = await session.loadEncryptedData("LOCATION_KEY");
            expect(loadSession).toBeFalsy();
        });

        it("should return false if no data is stored with defaults", async () => {
            const session = new Session(
                new CustomDb("SessionLoadEncryptedData1"),
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

            const loadSession = await session.loadEncryptedData(
                "LOCATION_KEY",
                "LOCATION_KEY_IV"
            );
            expect(loadSession).toBeFalsy();
        });

        it("should load the data if it exists", async () => {
            const session = new Session(
                new CustomDb("SessionLoadEncryptedData2 "),
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
            const storeSession = await session.storeEncryptedData(
                "data",
                "LOCATION_KEY"
            );
            expect(storeSession).toBeTruthy();

            const loadSession = await session.loadEncryptedData("LOCATION_KEY");
            expect(loadSession).toBe("data");
        });
    });

    describe("#set environmentType", () => {
        it("should detect invalid environments and throw an error", async () => {
            const session = new Session(
                new CustomDb("SessionEnvironmentType1"),
                Logger
            );

            expect(() => {
                // set an invalid environment
                session.environmentType = "AFD";
            }).toThrow();
        });
    });

    describe("#verifySessionInstallation()", () => {
        it("should return true if the current session is valid", async () => {
            const session = new Session(
                new CustomDb("SessionVerifySessionInstallation1"),
                Logger
            );

            const setupResult = await session.setup(
                fakeApiKey,
                [],
                "SANDBOX",
                fakeEncryptionKey
            );
            expect(setupResult);

            // set expiry to current time
            session.sessionId = 12345678901234;
            session.sessionExpiryTime = new Date();

            const result = session.verifySessionInstallation();
            expect(result);
        });

        it("should return false if the current session time is outdated", async () => {
            const session = new Session(
                new CustomDb("SessionVerifySessionInstallation2"),
                Logger
            );

            const setupResult = await session.setup(
                fakeApiKey,
                [],
                "SANDBOX",
                fakeEncryptionKey
            );
            expect(setupResult);

            // set expiry to a time far in the past
            session.sessionId = 12345678901234;
            session.sessionExpiryTime = new Date(1018559124411);

            const result = session.verifySessionInstallation();
            expect(result === false);
        });
    });
});
