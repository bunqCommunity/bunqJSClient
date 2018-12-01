import * as moxios from "moxios";

import BunqJSClient from "../../../src/BunqJSClient";

import SetupApp from "../../TestHelpers/SetupApp";
import { installationRegistration } from "../../TestHelpers/DefaultResponses";

describe("API", () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    describe("Installation", () => {
        it("#ADD", async () => {
            const bunqApp: BunqJSClient = await SetupApp();

            const request = bunqApp.api.installation.add();
            await installationRegistration(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#GET", async () => {
            const bunqApp: BunqJSClient = await SetupApp();

            const request = bunqApp.api.installation.get(1);
            await installationRegistration(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });
    });
});
