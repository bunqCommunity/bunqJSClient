import * as moxios from "moxios";

import BunqJSClient from "../../../src/BunqJSClient";

import Prepare from "../../TestHelpers/Prepare";
import SetupApp from "../../TestHelpers/SetupApp";
import { deviceServerRegistration } from "../../TestHelpers/DefaultResponses";

let bunqApp: BunqJSClient;

describe("API", () => {
    beforeAll(async done => {
        moxios.install();

        // prepare certificates
        await Prepare();
        // create a bunqjsclient to be used in the tests
        bunqApp = await SetupApp("DeviceRegistration");

        moxios.uninstall();
        done();
    });

    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    describe("DeviceRegistration", () => {
        it("#ADD", async () => {
            const request = bunqApp.api.deviceRegistration.add({
                description: "SomeDeviceName",
                permitted_ips: ["1.1.1.1"]
            });
            await deviceServerRegistration(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#ADD - with default options", async () => {
            const request = bunqApp.api.deviceRegistration.add();
            await deviceServerRegistration(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#GET", async () => {
            const request = bunqApp.api.deviceRegistration.get({ deviceId: 1 });
            await deviceServerRegistration(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#GET - with default options", async () => {
            const request = bunqApp.api.deviceRegistration.get();
            await deviceServerRegistration(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });
    });
});
