import * as moxios from "moxios";

import BunqJSClient from "../../../src/BunqJSClient";

import Prepare from "../../TestHelpers/Prepare";
import SetupApp from "../../TestHelpers/SetupApp";
import { defaultResponse } from "../../TestHelpers/DefaultResponses";

let bunqApp: BunqJSClient;

describe("API", () => {
    beforeAll(async () => {
        moxios.install();

        // prepare certificates
        await Prepare();
        // create a bunqjsclient to be used in the tests
        bunqApp = await SetupApp("User");

        moxios.uninstall();
    });

    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    describe("User", () => {
        it("#GET", async () => {
            const request = bunqApp.api.user.get(1);
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#LIST", async () => {
            const request = bunqApp.api.user.list();
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });
    });
});
