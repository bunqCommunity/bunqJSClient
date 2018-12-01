import * as moxios from "moxios";

import BunqJSClient from "../../../src/BunqJSClient";

import SetupApp from "../../TestHelpers/SetupApp";
import { defaultResponse } from "../../TestHelpers/DefaultResponses";

describe("API", () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    describe("RequestResponse", () => {
        it("#GET", async () => {
            const bunqApp: BunqJSClient = await SetupApp();

            const request = bunqApp.api.requestResponse.get(1, 2, 3);
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#LIST", async () => {
            const bunqApp: BunqJSClient = await SetupApp();

            const request = bunqApp.api.requestResponse.list(1, 2);
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#LIST - with pagination options", async () => {
            const bunqApp: BunqJSClient = await SetupApp();

            const request = bunqApp.api.requestResponse.list(1, 2, {
                newer_id: 1,
                older_id: 2
            });
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#PUT", async () => {
            const bunqApp: BunqJSClient = await SetupApp();

            const request = bunqApp.api.requestResponse.put(1, 2, 3, "ACCEPTED");
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#PUT - with custom address", async () => {
            const bunqApp: BunqJSClient = await SetupApp();

            const request = bunqApp.api.requestResponse.put(1, 2, 3, "ACCEPTED", {
                address_shipping: {
                    street: "",
                    house_number: "",
                    po_box: false,
                    postal_code: "",
                    city: "",
                    country: ""
                },
                address_billing: {
                    street: "",
                    house_number: "",
                    po_box: false,
                    postal_code: "",
                    city: "",
                    country: ""
                }
            });
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#PUT - with accepted status", async () => {
            const bunqApp: BunqJSClient = await SetupApp();

            const request = bunqApp.api.requestResponse.put(1, 2, 3, "REJECTED");
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });
    });
});
