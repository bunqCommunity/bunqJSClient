import * as moxios from "moxios";
import BunqJSClient from "../../src/BunqJSClient";

import CustomDb from "../TestHelpers/CustomDb";
import { randomHex } from "../TestHelpers/RandomData";
import Prepare from "../TestHelpers/Prepare";
import {
    installationRegistration,
    deviceServerRegistration,
    sessionRegistration, defaultResponse
} from "../TestHelpers/DefaultResponses";

import {
    default as apiInstallation,
    installToken,
    serverPublicKeyPem
} from "../TestData/api-installation";
import {
    default as apiDeviceServer,
    deviceId
} from "../TestData/api-device-server";
import {
    default as apiSessionRegistration,
    sessionId,
    sessionToken,
    sessionTokenId
} from "../TestData/api-session-registration";
import SetupApp from "../TestHelpers/SetupApp";

const fakeApiKey = randomHex(64);
const fakeEncryptionKey = randomHex(32);

describe("BunqJSClient", () => {
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

    describe("#construct()", () => {
        it("should create a new instance", () => {
            const app = new BunqJSClient(new CustomDb("construct1"));
            expect(app).toBeInstanceOf(BunqJSClient);
        });

        it("should create a new instance without a custom storage interface", () => {
            const app = new BunqJSClient();
            expect(app).toBeInstanceOf(BunqJSClient);
        });
    });

    describe("#run()", () => {
        it("run with default options", async () => {
            const app = new BunqJSClient(new CustomDb("run1"));

            await app.run(fakeApiKey);

            expect(app.Session.environment).toBe("SANDBOX");
            expect(app.Session.apiKey).toBe(fakeApiKey);
            expect(app.Session.encryptionKey).toBeFalsy();
        });

        it("run with custom options", async () => {
            const app = new BunqJSClient(new CustomDb("run2"));

            await app.run(fakeApiKey, [], "SANDBOX", fakeEncryptionKey);

            expect(app.Session.environment).toBe("SANDBOX");
            expect(app.Session.apiKey).toBe(fakeApiKey);
            expect(app.Session.encryptionKey).toBe(fakeEncryptionKey);
        });
    });

    describe("#install()", async () => {
        it("installation without stored data", async () => {
            const app = new BunqJSClient(new CustomDb("install1"));
            await app.run(fakeApiKey, [], "SANDBOX", fakeEncryptionKey);

            const installPromise = app.install();

            await new Promise((resolve, reject) => {
                moxios.wait(() => {
                    moxios.requests
                        .mostRecent()
                        .respondWith(apiInstallation())
                        .then(resolve)
                        .catch(reject);
                });
            });
            await installPromise;

            // re-run, it should be done instantly since the device registration is done already
            await app.install();

            expect(app.Session.installToken).toBe(installToken);
            expect(app.Session.serverPublicKeyPem).toBe(serverPublicKeyPem);
        });
    });

    describe("#registerDevice()", () => {
        it("device registration without stored data", async () => {
            const app = new BunqJSClient(new CustomDb("device1"));
            await app.run(fakeApiKey, [], "SANDBOX", fakeEncryptionKey);

            const installationPromise = app.install();
            const installationHandler = installationRegistration(moxios);
            await installationPromise;
            await installationHandler;

            const deviceRegistrationPromise = app.registerDevice();

            await new Promise((resolve, reject) => {
                moxios.wait(() => {
                    moxios.requests
                        .mostRecent()
                        .respondWith(apiDeviceServer(true))
                        .then(resolve)
                        .catch(reject);
                });
            });
            await deviceRegistrationPromise;

            // re-run, it should be done instantly since the installationRegistration is done already
            await app.registerDevice();

            expect(app.Session.deviceId === deviceId).toBeTruthy();
        });

        it("device registration rejects request with status 400 and resets session data", async () => {
            const app = new BunqJSClient(new CustomDb("device2"));
            await app.run(fakeApiKey, [], "SANDBOX", fakeEncryptionKey);

            const installationPromise = app.install();
            const installationHandler = installationRegistration(moxios);
            await installationPromise;
            await installationHandler;

            const deviceRegistrationPromise = app.registerDevice();

            new Promise((resolve, reject) => {
                moxios.wait(() => {
                    moxios.requests
                        .mostRecent()
                        .respondWith(apiDeviceServer(400))
                        .then(resolve)
                        .catch(reject);
                });
            });

            await expect(deviceRegistrationPromise).rejects.toBeTruthy();
        });

        it("device registration rejects request with status 500", async () => {
            const app = new BunqJSClient(new CustomDb("device3"));
            await app.run(fakeApiKey, [], "SANDBOX", fakeEncryptionKey);

            const installationPromise = app.install();
            const installationHandler = installationRegistration(moxios);
            await installationPromise;
            await installationHandler;

            const deviceRegistrationPromise = app.registerDevice();

            new Promise((resolve, reject) => {
                moxios.wait(() => {
                    moxios.requests
                        .mostRecent()
                        .respondWith(apiDeviceServer(500))
                        .then(resolve)
                        .catch(reject);
                });
            });

            await expect(deviceRegistrationPromise).rejects.toBeTruthy();
        });
    });

    describe("#registerSession()", () => {
        it("session registration without stored data", async () => {
            const app = new BunqJSClient(new CustomDb("session1"));
            await app.run(fakeApiKey, [], "SANDBOX", fakeEncryptionKey);

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

            const sessionRegistrationPromise = app.registerSession();

            await new Promise((resolve, reject) => {
                moxios.wait(() => {
                    moxios.requests
                        .mostRecent()
                        .respondWith(apiSessionRegistration(true))
                        .then(resolve)
                        .catch(reject);
                });
            });
            await sessionRegistrationPromise;

            // re-run, it should be done instantly since the installationRegistration is done already
            await app.registerSession();

            expect(app.Session.sessionId).toBe(sessionId);
            expect(app.Session.sessionToken).toBe(sessionToken);
            expect(app.Session.sessionTokenId).toBe(sessionTokenId);
            expect(app.Session.userInfo).not.toBe({});
        });

        it("session registration without stored data and UserLight response", async () => {
            const app = new BunqJSClient(new CustomDb("session2"));
            await app.run(fakeApiKey, [], "SANDBOX", fakeEncryptionKey);

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

            const sessionRegistrationPromise = app.registerSession();

            await new Promise((resolve, reject) => {
                moxios.wait(() => {
                    moxios.requests
                        .mostRecent()
                        .respondWith(apiSessionRegistration(true, "UserLight"))
                        .then(resolve)
                        .catch(reject);
                });
            });
            await sessionRegistrationPromise;

            // re-run, it should be done instantly since the installationRegistration is done already
            await app.registerSession();

            expect(app.Session.sessionId).toBe(sessionId);
            expect(app.Session.sessionToken).toBe(sessionToken);
            expect(app.Session.sessionTokenId).toBe(sessionTokenId);
            expect(app.Session.userInfo).not.toBe({});
        });

        it("session registration without stored data and UserPerson response", async () => {
            const app = new BunqJSClient(new CustomDb("session3"));
            await app.run(fakeApiKey, [], "SANDBOX", fakeEncryptionKey);

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

            const sessionRegistrationPromise = app.registerSession();

            await new Promise((resolve, reject) => {
                moxios.wait(() => {
                    moxios.requests
                        .mostRecent()
                        .respondWith(apiSessionRegistration(true, "UserPerson"))
                        .then(resolve)
                        .catch(reject);
                });
            });
            await sessionRegistrationPromise;

            // re-run, it should be done instantly since the installationRegistration is done already
            await app.registerSession();

            expect(app.Session.sessionId).toBe(sessionId);
            expect(app.Session.sessionToken).toBe(sessionToken);
            expect(app.Session.sessionTokenId).toBe(sessionTokenId);
            expect(app.Session.userInfo).not.toBe({});
        });

        it("session registration fails if invalid user type is returned", async () => {
            const app = new BunqJSClient(new CustomDb("session4"));
            await app.run(fakeApiKey, [], "SANDBOX", fakeEncryptionKey);

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

            const sessionRegistrationPromise = app.registerSession();

            new Promise((resolve, reject) => {
                moxios.wait(() => {
                    moxios.requests
                        .mostRecent()
                        .respondWith(apiSessionRegistration(true, "UserPersonInvalid"))
                        .then(resolve)
                        .catch(reject);
                });
            });

            // wait for it to reject
            await expect(sessionRegistrationPromise).rejects.toBeTruthy();
        });

        it("session registration rejects if request fails with status 500", async () => {
            const app = new BunqJSClient(new CustomDb("session5"));
            await app.run(fakeApiKey, [], "SANDBOX", fakeEncryptionKey);

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

            const sessionRegistrationPromise = app.registerSession();

            new Promise((resolve, reject) => {
                moxios.wait(() => {
                    moxios.requests
                        .mostRecent()
                        .respondWith(apiSessionRegistration(500))
                        .then(resolve)
                        .catch(reject);
                });
            });

            // wait for it to reject
            await expect(sessionRegistrationPromise).rejects.toBeTruthy();
        });

        it("session registration rejects if request fails with status 400", async () => {
            const app = new BunqJSClient(new CustomDb("session6"));
            await app.run(fakeApiKey, [], "SANDBOX", fakeEncryptionKey);

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

            const sessionRegistrationPromise = app.registerSession();

            new Promise((resolve, reject) => {
                moxios.wait(() => {
                    moxios.requests
                        .mostRecent()
                        .respondWith(apiSessionRegistration(400))
                        .then(resolve)
                        .catch(reject);
                });
            });

            // wait for it to reject
            await expect(sessionRegistrationPromise).rejects.toBeTruthy();
        });
    });

    describe("#createCredentials()", () => {
        it("create a new credential", async () => {
            const bunqApp = await SetupApp("CreateCredentials");

            // create new credentials
            const checkCredentialStatus = bunqApp.createCredentials();

            // return a default response
            await defaultResponse(moxios)

            // wait for credential status
            await checkCredentialStatus;
        });
    });

    describe("#checkCredentialStatus()", () => {
        it("check the status of a set of credentials", async () => {
            const bunqApp = await SetupApp("CheckCredentialStatus");

            // create new credentials
            const checkCredentialStatus = bunqApp.checkCredentialStatus("UUID");

            // return a default response
            await defaultResponse(moxios)

            // wait for credential status
            await checkCredentialStatus;
        });
    });

    describe("#destroySession()", () => {
        it("create a session and remove it", async () => {
            const app = new BunqJSClient(new CustomDb("destroySession"));
            await app.run(fakeApiKey, [], "SANDBOX", fakeEncryptionKey);

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

            // first check if the values are currently set
            expect(app.Session.sessionId).toBe(sessionId);
            expect(app.Session.sessionToken).toBe(sessionToken);
            expect(app.Session.sessionTokenId).toBe(sessionTokenId);
            expect(Object.keys(app.Session.userInfo).length > 0).toBeTruthy();

            const destroySessionPromise = app.destroySession();
            await new Promise((resolve, reject) => {
                moxios.wait(() => {
                    moxios.requests
                        .mostRecent()
                        .respondWith({
                            status: 200,
                            response: true
                        })
                        .then(resolve)
                        .catch(reject);
                });
            });
            await destroySessionPromise;

            // the values should be unset now and either null/empty
            expect(app.Session.sessionId).toBeNull();
            expect(app.Session.sessionToken).toBeNull();
            expect(app.Session.sessionTokenId).toBeNull();
            expect(Object.keys(app.Session.userInfo).length === 0).toBeTruthy();
        });
    });

    describe("#getUser()", () => {
        it("should return UserCompany object", async () => {
            const app = await SetupApp("GetUser");

            const userInfo = await app.getUser("UserCompany", false);

            expect(userInfo.id).toBe(42);
            expect(userInfo.name).toBe("bunq");
        });

        it("should return undefined", async () => {
            const app = await SetupApp("GetUser2");

            const userInfo = await app.getUser("InvalidType", false);

            expect(userInfo).toBe(undefined);
        });

        it("should do an api call if force mode is set", async () => {
            const app = await SetupApp("GetUser3");

            const getUserPromise = app.getUser("UserCompany", true);

            // return a default response
            await defaultResponse(moxios)

            await expect(getUserPromise).resolves.toBeTruthy();
        });
    });

    describe("#getUsers()", () => {
        it("should return a list with one UserCompany object", async () => {
            const app = await SetupApp("GetUsers");

            const users = await app.getUsers(false);

            expect(Object.keys(users).length >= 1).toBeTruthy();

            const userInfo = users.UserCompany;

            expect(userInfo.id).toBe(42);
            expect(userInfo.name).toBe("bunq");
        });

        it("should do an api call if force mode is set", async () => {
            const app = await SetupApp("GetUsers2");

            const getUsersPromise = app.getUsers(true);

            // return a default response
            await defaultResponse(moxios)

            await expect(getUsersPromise).resolves.toBeTruthy();
        });
    });
});
