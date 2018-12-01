import * as moxios from "moxios";

import BunqJSClient from "../../../src/BunqJSClient";

import SetupApp from "../../TestHelpers/SetupApp";
import { defaultResponse } from "../../TestHelpers/DefaultResponses";

describe("API", () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    describe("IP", () => {
        it("#GET", async () => {
            const bunqApp: BunqJSClient = await SetupApp();

            const request = bunqApp.api.ip.get(1, 2, 3);
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#LIST", async () => {
            const bunqApp: BunqJSClient = await SetupApp();

            const request = bunqApp.api.ip.list(1, 2);
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#LIST - with pagination options", async () => {
            const bunqApp: BunqJSClient = await SetupApp();

            const request = bunqApp.api.ip.list(1, 2, {
                newer_id: 1,
                older_id: 2
            });
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#POST", async () => {
            const bunqApp: BunqJSClient = await SetupApp();

            const request = bunqApp.api.ip.post(1, 2, "0.0.0.0", "ACTIVE");
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#PUT", async () => {
            const bunqApp: BunqJSClient = await SetupApp();

            const request = bunqApp.api.ip.put(1, 2, 3, "0.0.0.0", "INACTIVE");
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });
    });
});
