import * as moxios from "moxios";

import BunqJSClient from "../../../src/BunqJSClient";

import SetupApp from "../../TestHelpers/SetupApp";
import { sessionRegistration } from "../../TestHelpers/DefaultResponses";

describe("API", () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    describe("Schedule", () => {
        it("#LIST", async () => {
            const bunqApp: BunqJSClient = await SetupApp();

            const request = bunqApp.api.schedule.list(1, 2);
            await sessionRegistration(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#LIST - with pagination options", async () => {
            const bunqApp: BunqJSClient = await SetupApp();

            const request = bunqApp.api.schedule.list(1, 2, {
                newer_id: 1,
                older_id: 2,
                count: 200
            });
            await sessionRegistration(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#LIST - default options", async () => {
            const bunqApp: BunqJSClient = await SetupApp();

            const request = bunqApp.api.schedule.list(1, 2, {});
            await sessionRegistration(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });
    });
});
