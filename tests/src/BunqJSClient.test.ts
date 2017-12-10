import * as moxios from "moxios";
import BunqJSClient from "../../src/BunqJSClient";

import CustomDb from "../TestHelpers/CustomDb";
import { randomHex } from "../TestHelpers/RandomData";
import { installation, deviceServer } from "../TestHelpers/DefaultResponses";

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


const fakeApiKey = randomHex(64);
const fakeEncryptionKey = randomHex(32);

describe("BunqJSClient", () => {
    beforeEach(function() {
        moxios.install();
    });

    afterEach(function() {
        moxios.uninstall();
    });

    describe("#construct()", () => {
        it("should create a new instance", () => {
            const app = new BunqJSClient(new CustomDb("construct1"));
            expect(app instanceof BunqJSClient).toBeTruthy();
        });

        it("should create a new instance without a custom storage interface", () => {
            const app = new BunqJSClient();
            expect(app instanceof BunqJSClient).toBeTruthy();
        });
    });

    describe("#run()", () => {
        it("run with default options", async () => {
            const app = new BunqJSClient(new CustomDb("run1"));

            await app.run(fakeApiKey);

            expect(app.Session.environment === "SANDBOX");
            expect(app.Session.apiKey === fakeApiKey);
            expect(app.Session.encryptionKey === fakeEncryptionKey);
        });

        it("run with custom options", async () => {
            const app = new BunqJSClient(new CustomDb("run2"));

            await app.run(fakeApiKey, [], "SANDBOX", fakeEncryptionKey);

            expect(app.Session.environment === "SANDBOX");
            expect(app.Session.apiKey === fakeApiKey);
            expect(app.Session.encryptionKey === fakeEncryptionKey);
        });
    });

    describe("#install()", () => {
        it("installation without stored data", async () => {
            const app = new BunqJSClient(new CustomDb("install"));
            await app.run(fakeApiKey, [], "SANDBOX", fakeEncryptionKey);

            await new Promise((resolve, reject) => {
                app
                    .install()
                    .then(resolve)
                    .catch(reject);

                moxios.wait(() => {
                    moxios.requests
                        .mostRecent()
                        .respondWith(apiInstallation())
                        .then(() => {})
                        .catch(reject);
                });
            });

            // re-run, it should be done instantly since the device registration is done already
            await app.install();

            expect(app.Session.installToken === installToken);
            expect(app.Session.serverPublicKeyPem === serverPublicKeyPem);
        });
    });

    describe("#registerDevice()", () => {
        it("device registration without stored data", async () => {
            const app = new BunqJSClient(new CustomDb("device"));
            await app.run(fakeApiKey, [], "SANDBOX", fakeEncryptionKey);

            const installationPromise = app.install();
            const installationHandler = installation(moxios);
            await installationPromise;
            await installationHandler;

            await new Promise((resolve, reject) => {
                app
                    .registerDevice()
                    .then(resolve)
                    .catch(reject);

                moxios.wait(() => {
                    moxios.requests
                        .mostRecent()
                        .respondWith(apiDeviceServer(true))
                        .then(() => {})
                        .catch(reject);
                });
            });

            // re-run, it should be done instantly since the installation is done already
            await app.registerDevice();

            expect(app.Session.deviceId === deviceId);
        });
    });

    describe("#registerSession()", () => {
        it("session registration without stored data", async () => {
            const app = new BunqJSClient(new CustomDb("device"));
            await app.run(fakeApiKey, [], "SANDBOX", fakeEncryptionKey);

            // installation
            const installationPromise = app.install();
            const installationHandler = installation(moxios);
            await installationPromise;
            await installationHandler;

            // device registration
            const devicePromise = app.install();
            const deviceHandler = deviceServer(moxios);
            await devicePromise;
            await deviceHandler;

            await new Promise((resolve, reject) => {
                app
                    .registerSession()
                    .then(resolve)
                    .catch(reject);

                moxios.wait(() => {
                    moxios.requests
                        .mostRecent()
                        .respondWith(apiSessionRegistration(true))
                        .then(() => {})
                        .catch(reject);
                });
            });

            // re-run, it should be done instantly since the installation is done already
            await app.registerSession();

            expect(app.Session.sessionId === sessionId);
            expect(app.Session.sessionToken === sessionToken);
            expect(app.Session.sessionTokenId === sessionTokenId);
            expect(app.Session.userInfo === deviceId);
        });
    });
});
