import * as moxios from "moxios";

import BunqJSClient from "../../../src/BunqJSClient";

import SetupApp from "../../TestHelpers/SetupApp";
import { defaultResponse } from "../../TestHelpers/DefaultResponses";

describe("API", () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    describe("SessionServer", () => {
        it("#ADD", async () => {
            const bunqApp: BunqJSClient = await SetupApp();

            const request = bunqApp.api.sessionServer.add();
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#DELETE", async () => {
            const bunqApp: BunqJSClient = await SetupApp();

            const request = bunqApp.api.sessionServer.delete();
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });
    });
});
