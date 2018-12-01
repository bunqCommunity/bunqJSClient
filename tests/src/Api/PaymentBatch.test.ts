import * as moxios from "moxios";

import BunqJSClient from "../../../src/BunqJSClient";

import SetupApp from "../../TestHelpers/SetupApp";
import { defaultResponse } from "../../TestHelpers/DefaultResponses";

describe("API", () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    describe("Paymentbatch", () => {
        it("#GET", async () => {
            const bunqApp: BunqJSClient = await SetupApp();

            const request = bunqApp.api.paymentBatch.get(1, 2, 3);
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#LIST", async () => {
            const bunqApp: BunqJSClient = await SetupApp();

            const request = bunqApp.api.paymentBatch.list(1, 2);
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#LIST - with pagination options", async () => {
            const bunqApp: BunqJSClient = await SetupApp();

            const request = bunqApp.api.paymentBatch.list(1, 2, {
                newer_id: 1,
                older_id: 2
            });
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#POST", async () => {
            const bunqApp: BunqJSClient = await SetupApp();

            const request = bunqApp.api.paymentBatch.post(
                5,
                12,
                "description",
                {
                    value: "12.00",
                    currency: "EUR"
                },
                [
                    {
                        type: "EMAIL",
                        value: "mail@example.com"
                    }
                ]
            );
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#POST direct", async () => {
            const bunqApp: BunqJSClient = await SetupApp();

            const request = bunqApp.api.paymentBatch.postRaw(1, 2, [
                {
                    description: "description",
                    amount: {
                        value: "12.00",
                        currency: "EUR"
                    },
                    counterparty_alias: {
                        type: "EMAIL",
                        value: "mail@example.com"
                    }
                }
            ]);
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });
    });
});
