import * as moxios from "moxios";

import BunqJSClient from "../../../src/BunqJSClient";

import SetupApp from "../../TestHelpers/SetupApp";
import { defaultResponse } from "../../TestHelpers/DefaultResponses";

describe("API", () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    describe("MonetaryAccountJoint", () => {
        it("#GET", async () => {
            const bunqApp: BunqJSClient = await SetupApp();

            const request = bunqApp.api.monetaryAccountJoint.get(1, 3);
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#PUT", async () => {
            const bunqApp: BunqJSClient = await SetupApp();

            const request = bunqApp.api.monetaryAccountJoint.put(1, 2, {
                description: "New account description"
            });
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#LIST", async () => {
            const bunqApp: BunqJSClient = await SetupApp();

            const request = bunqApp.api.monetaryAccountJoint.list(1);
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#LIST - with pagination options", async () => {
            const bunqApp: BunqJSClient = await SetupApp();

            const request = bunqApp.api.monetaryAccountJoint.list(1, {
                newer_id: 1,
                older_id: 2,
                count: 200
            });
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });
    });
});
