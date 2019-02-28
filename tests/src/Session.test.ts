import * as moxios from "moxios";
import Logger from "../../src/Helpers/Logger";
import Session from "../../src/Session";

import CustomDb from "../TestHelpers/CustomDb";
import { randomHex } from "../TestHelpers/RandomData";
import Prepare from "../TestHelpers/Prepare";

const FAKE_API_KEY = randomHex(64);
const FAKE_API_KEY2 = randomHex(64);
const FAKE_ENCRYPTION_KEY = randomHex(32);
const FAKE_ENCRYPTION_KEY2 = randomHex(32);
const INVALID_ENCRYPTION_KEY = "== invalid == aes == key ==";

const fakeCustomDB = {
    set: (key: string, value: any) => {
        throw new Error("Storage failure");
    },
    get: (key: string) => {
        throw new Error("Storage failure");
    },
    remove: (key: string) => {
        throw new Error("Storage failure");
    }
};

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
        it("should run setup", async () => {
            const session = new Session(new CustomDb("SessionSetup"), Logger);

            const setupResult = await session.setup(FAKE_API_KEY, [], "SANDBOX", FAKE_ENCRYPTION_KEY);
            expect(setupResult);
        });

        it("should run setup with default options", async () => {
            const session = new Session(new CustomDb("SessionSetup2"), Logger);

            const setupResult = await session.setup(FAKE_API_KEY);
            expect(setupResult);
        });

        it("should run with a false API key", async () => {
            const session = new Session(new CustomDb("SessionSetup3"), Logger);

            const setupResult = await session.setup(false);
            expect(setupResult);
        });

        it("should fail setup if invalid aes key is given", async () => {
            const session = new Session(new CustomDb("SessionSetup4"), Logger);

            return session
                .setup(FAKE_API_KEY, [], "SANDBOX", INVALID_ENCRYPTION_KEY)
                .then(done => {
                    expect(true).toBe(false);
                })
                .catch(error => {
                    expect(true).toBe(true);
                });
        });
    });

    describe("#setEncryptionKey()", () => {
        it("should set a new encryption key and update the stored data", async () => {
            const session = new Session(new CustomDb("setEncryptionKey"), Logger);

            const setupResult = await session.setup(FAKE_API_KEY, [], "SANDBOX", FAKE_ENCRYPTION_KEY);
            expect(setupResult).toBeTruthy();

            // change key to new encryption key without invalidating data
            await session.setEncryptionKey(FAKE_ENCRYPTION_KEY2);

            expect(session.apiKey).not.toBeNull();
        });

        it("should fail on an invalid encryption key", async () => {
            const session = new Session(new CustomDb("setEncryptionKey2"), Logger);

            const setupResult = await session.setup(FAKE_API_KEY, [], "SANDBOX", FAKE_ENCRYPTION_KEY);
            expect(setupResult).toBeTruthy();

            // change key to new encryption key without invalidating data
            return session
                .setEncryptionKey(INVALID_ENCRYPTION_KEY)
                .then(done => {
                    expect(true).toBe(false);
                })
                .catch(error => {
                    expect(true).toBe(true);
                });
        });
    });

    describe("#setupKeypair()", () => {
        it("should create a new valid keypair", async () => {
            const session = new Session(new CustomDb("SessionSetupKeypair"), Logger);

            const setupResult = await session.setup(FAKE_API_KEY, [], "SANDBOX", FAKE_ENCRYPTION_KEY);
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
            const session = new Session(new CustomDb("SessionSetupKeypair2"), Logger);

            const setupResult = await session.setup(FAKE_API_KEY, [], "SANDBOX", FAKE_ENCRYPTION_KEY);
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
            const session = new Session(new CustomDb("SessionSetupKeypair2"), Logger);

            const setupResult = await session.setup(FAKE_API_KEY, [], "SANDBOX", FAKE_ENCRYPTION_KEY);
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

    describe("#loadSession()", () => {
        it("should detect if the environment changes and invalidate storage", async () => {
            const session = new Session(new CustomDb("SessionLoadSession1"), Logger);

            const setupResult = await session.setup(FAKE_API_KEY, [], "SANDBOX", FAKE_ENCRYPTION_KEY);
            expect(setupResult);

            const storeSession = await session.storeSession();
            expect(storeSession);

            // setup a session with a different environment
            const setupResult2 = await session.setup(FAKE_API_KEY, [], "PRODUCTION", FAKE_ENCRYPTION_KEY);
            expect(setupResult2);

            const loadSession = await session.loadSession();
            expect(loadSession === false);
        });

        it("should detect if the encryption key changes and invalidate storage", async () => {
            const session = new Session(new CustomDb("SessionLoadSession2"), Logger);

            const setupResult = await session.setup(FAKE_API_KEY, [], "SANDBOX", FAKE_ENCRYPTION_KEY);
            expect(setupResult).toBeTruthy();

            const storeSession = await session.storeSession();
            expect(storeSession).toBeTruthy();

            const setupResult2 = await session.setup(FAKE_API_KEY, [], "SANDBOX", FAKE_ENCRYPTION_KEY2);
            expect(setupResult2).toBeTruthy();

            const loadSession = await session.loadSession();
            expect(loadSession === false);
        });

        it("should detect if the stored api key is different from the current key and invalidate storage", async () => {
            const session = new Session(new CustomDb("SessionLoadSession4"), Logger);

            const setupResult = await session.setup(FAKE_API_KEY, [], "SANDBOX", FAKE_ENCRYPTION_KEY);
            expect(setupResult).toBeTruthy();

            const storeSession = await session.storeSession();
            expect(storeSession).toBeTruthy();

            const setupResult2 = await session.setup(FAKE_API_KEY2, [], "SANDBOX", FAKE_ENCRYPTION_KEY);
            expect(setupResult2).toBeTruthy();

            const loadSession = await session.loadSession();
            expect(loadSession === false);
        });

        it("should throw error if no encryption key is set during session loading", async () => {
            const session = new Session(new CustomDb("SessionLoadSession5"), Logger);

            const setupResult = await session.setup(FAKE_API_KEY, [], "SANDBOX", FAKE_ENCRYPTION_KEY);
            expect(setupResult).toBeTruthy();

            const storeSession = await session.loadSession();
            expect(storeSession).toBeFalsy();
        });
    });

    describe("#storeSession()", () => {
        it("should store and load the session data in the storage interface", async () => {
            const session = new Session(new CustomDb("SessionStoreSession1"), Logger);

            const setupResult = await session.setup(FAKE_API_KEY, [], "SANDBOX", FAKE_ENCRYPTION_KEY);
            expect(setupResult).toBeTruthy();

            const storeSession = await session.storeSession();
            expect(storeSession);

            // load the session from the storage interface
            const loadSession = await session.loadSession();
            expect(loadSession).toBeTruthy();
        });

        it("should throw an error if an invalid environment is given", async () => {
            const session = new Session(new CustomDb("SessionStoreSession2"), Logger);

            // setup a session with default options and an invalid environment
            session
                .setup(FAKE_API_KEY, [], "SANDBOX_AB", FAKE_ENCRYPTION_KEY)
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

    describe("#loadEncryptedData()", () => {
        it("should return false if no data is stored", async () => {
            const session = new Session(new CustomDb("SessionLoadEncryptedData1"), Logger);

            const setupResult = await session.setup(FAKE_API_KEY, [], "SANDBOX", FAKE_ENCRYPTION_KEY);
            expect(setupResult).toBeTruthy();

            const loadSession = await session.loadEncryptedData("LOCATION_KEY");
            expect(loadSession).toBeFalsy();
        });

        it("should return false if no data is stored with defaults", async () => {
            const session = new Session(new CustomDb("SessionLoadEncryptedData1"), Logger);

            const setupResult = await session.setup(FAKE_API_KEY, [], "SANDBOX", FAKE_ENCRYPTION_KEY);
            expect(setupResult).toBeTruthy();

            const loadSession = await session.loadEncryptedData("LOCATION_KEY", "LOCATION_KEY_IV");
            expect(loadSession).toBeFalsy();
        });

        it("should load the data if it exists", async () => {
            const session = new Session(new CustomDb("SessionLoadEncryptedData2 "), Logger);

            const setupResult = await session.setup(FAKE_API_KEY, [], "SANDBOX", FAKE_ENCRYPTION_KEY);
            expect(setupResult).toBeTruthy();

            const storeSession = await session.storeEncryptedData("data", "LOCATION_KEY");
            expect(storeSession).toBeTruthy();

            const loadSession = await session.loadEncryptedData("LOCATION_KEY");
            expect(loadSession).toBe("data");
        });

        it("should throw error if encryption key is not set", async () => {
            const session = new Session(new CustomDb("SessionLoadEncryptedData2 "), Logger);

            const setupResult = await session.setup(FAKE_API_KEY, [], "SANDBOX", FAKE_ENCRYPTION_KEY);
            expect(setupResult).toBeTruthy();

            // unset encryption key somehow
            session.encryptionKey = false;

            const loadSession = await session.loadEncryptedData("LOCATION_KEY");
            expect(loadSession).toBeFalsy();
        });
    });

    describe("#storeEncryptedData()", () => {
        it("should return false if no encryption key is set", async () => {
            const session = new Session(new CustomDb("SessionLoadEncryptedData1"), Logger);

            const setupResult = await session.setup(FAKE_API_KEY, [], "SANDBOX", FAKE_ENCRYPTION_KEY);
            expect(setupResult).toBeTruthy();

            session.encryptionKey = false;

            const loadSession = await session.storeEncryptedData("data", "LOCATION_KEY");
            expect(loadSession).toBeFalsy();
        });
    });

    describe("#destroyApiSession()", () => {
        it("should save the removed api session to the store", async () => {
            const session = new Session(new CustomDb("DestroyApiSession1"), Logger);

            const setupResult = await session.setup(FAKE_API_KEY, [], "SANDBOX", FAKE_ENCRYPTION_KEY);
            expect(setupResult).toBeTruthy();

            const storeSession = await session.destroyApiSession(true);
            expect(storeSession).toBeTruthy();
        });
    });

    describe("#destroyApiInstallation()", () => {
        it("should save the removed api installation to the store", async () => {
            const session = new Session(new CustomDb("DestroyApiInstallation1"), Logger);

            const setupResult = await session.setup(FAKE_API_KEY, [], "SANDBOX", FAKE_ENCRYPTION_KEY);
            expect(setupResult).toBeTruthy();

            const storeSession = await session.destroyApiInstallation(true);
            expect(storeSession).toBeTruthy();
        });
    });

    describe("#destroyApiDeviceInstallation()", () => {
        it("should save the removed device installation to the store", async () => {
            const session = new Session(new CustomDb("DestroyApiDeviceInstallation"), Logger);

            const setupResult = await session.setup(FAKE_API_KEY, [], "SANDBOX", FAKE_ENCRYPTION_KEY);
            expect(setupResult).toBeTruthy();

            const storeSession = await session.destroyApiDeviceInstallation(true);
            expect(storeSession).toBeTruthy();
        });
    });

    describe("#set environmentType", () => {
        it("should detect invalid environments and throw an error", async () => {
            const session = new Session(new CustomDb("SessionEnvironmentType1"), Logger);

            expect(() => {
                // set an invalid environment
                session.environmentType = "AFD";
            }).toThrow();
        });
    });

    describe("#asyncStorageGet ()", () => {
        it("should fail silently", async () => {
            const session = new Session(fakeCustomDB, Logger);

            await session.asyncStorageGet("someKey", true);
        });
        it("should thrown an error on failure", async () => {
            const session = new Session(fakeCustomDB, Logger);

            return session
                .asyncStorageGet("someKey", false)
                .then(done => {
                    expect(true).toBeFalsy();
                })
                .catch(error => {
                    expect(true).toBeTruthy();
                });
        });
    });

    describe("#asyncStorageRemove ()", () => {
        it("should fail silently", async () => {
            const session = new Session(fakeCustomDB, Logger);

            await session.asyncStorageRemove("someKey", true);
        });
        it("should thrown an error on failure", async () => {
            const session = new Session(fakeCustomDB, Logger);

            return session
                .asyncStorageRemove("someKey", false)
                .then(done => {
                    expect(true).toBeFalsy();
                })
                .catch(error => {
                    expect(true).toBeTruthy();
                });
        });
    });

    describe("#asyncStorageSet ()", () => {
        it("should fail silently", async () => {
            const session = new Session(fakeCustomDB, Logger);

            await session.asyncStorageSet("someKey", "someValue", true);
        });
        it("should thrown an error on failure", async () => {
            const session = new Session(fakeCustomDB, Logger);

            return session
                .asyncStorageSet("someKey", "someValue", false)
                .then(done => {
                    expect(true).toBeFalsy();
                })
                .catch(error => {
                    expect(true).toBeTruthy();
                });
        });
    });

    describe("#verifySessionInstallation()", () => {
        it("should return true if the current session is valid", async () => {
            const session = new Session(new CustomDb("SessionVerifySessionInstallation1"), Logger);

            const setupResult = await session.setup(FAKE_API_KEY, [], "SANDBOX", FAKE_ENCRYPTION_KEY);
            expect(setupResult).toBeTruthy();

            // set expiry to current time
            session.sessionId = 12345678901234;
            session.sessionExpiryTime = new Date();

            const result = session.verifySessionInstallation();
            expect(result);
        });

        it("should return false if the current session time is outdated", async () => {
            const session = new Session(new CustomDb("SessionVerifySessionInstallation2"), Logger);

            const setupResult = await session.setup(FAKE_API_KEY, [], "SANDBOX", FAKE_ENCRYPTION_KEY);
            expect(setupResult).toBeTruthy();

            // set expiry to a time far in the past
            session.sessionId = 12345678901234;
            session.sessionExpiryTime = new Date(1018559124411);

            const result = session.verifySessionInstallation();
            expect(result === false);
        });
    });
});
