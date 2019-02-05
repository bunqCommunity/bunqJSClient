import * as moxios from "moxios";

import BunqJSClient from "../../../src/BunqJSClient";

import SetupApp from "../../TestHelpers/SetupApp";
import { defaultResponse } from "../../TestHelpers/DefaultResponses";

describe("CARD", () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());
    it("#GET", async () => {
        const bunqApp: BunqJSClient = await SetupApp();

        const request = bunqApp.api.cardName.get(1);
        await defaultResponse(moxios);
        const response = await request;

        expect(response).not.toBeNull();
    });
});
