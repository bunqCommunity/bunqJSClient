import * as moxios from "moxios";

import BunqJSClient from "../../../src/BunqJSClient";

import Prepare from "../../TestHelpers/Prepare";
import SetupApp from "../../TestHelpers/SetupApp";
import { installationRegistration } from "../../TestHelpers/DefaultResponses";

let bunqApp: BunqJSClient;

describe("API", () => {
    beforeAll(async done => {
        moxios.install();

        // prepare certificates
        await Prepare();
        // create a bunqjsclient to be used in the tests
        bunqApp = await SetupApp("Api");

        moxios.uninstall();
        done();
    });

    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    describe("Installation", () => {
        it("#ADD", async () => {
            const request = bunqApp.api.installation.add();
            await installationRegistration(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#GET", async () => {
            const request = bunqApp.api.installation.get(1);
            await installationRegistration(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });
    });
});
