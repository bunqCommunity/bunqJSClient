import * as moxios from "moxios";

import BunqJSClient from "../../../src/BunqJSClient";

import SetupApp from "../../TestHelpers/SetupApp";
import { defaultResponse } from "../../TestHelpers/DefaultResponses";

describe("API", () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    describe("User", () => {
        it("#GET", async () => {
            const bunqApp: BunqJSClient = await SetupApp();

            const request = bunqApp.api.user.get(1);
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#LIST", async () => {
            const bunqApp: BunqJSClient = await SetupApp();

            const request = bunqApp.api.user.list();
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });
    });
});
