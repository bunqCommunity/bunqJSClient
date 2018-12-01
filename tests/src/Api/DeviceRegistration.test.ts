import * as moxios from "moxios";

import BunqJSClient from "../../../src/BunqJSClient";

import SetupApp from "../../TestHelpers/SetupApp";
import { deviceServerRegistration } from "../../TestHelpers/DefaultResponses";

describe("API", () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    describe("DeviceRegistration", () => {
        it("#ADD", async () => {
            const bunqApp: BunqJSClient = await SetupApp();

            const request = bunqApp.api.deviceRegistration.add({
                description: "SomeDeviceName",
                permitted_ips: ["1.1.1.1"]
            });
            await deviceServerRegistration(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#ADD - with default options", async () => {
            const bunqApp: BunqJSClient = await SetupApp();

            const request = bunqApp.api.deviceRegistration.add();
            await deviceServerRegistration(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#GET", async () => {
            const bunqApp: BunqJSClient = await SetupApp();

            const request = bunqApp.api.deviceRegistration.get({ deviceId: 1 });
            await deviceServerRegistration(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#GET - with default options", async () => {
            const bunqApp: BunqJSClient = await SetupApp();

            const request = bunqApp.api.deviceRegistration.get();
            await deviceServerRegistration(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });
    });
});
