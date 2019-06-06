import * as moxios from "moxios";

import BunqJSClient from "../../../src/BunqJSClient";

import SetupApp from "../../TestHelpers/SetupApp";
import { defaultResponse } from "../../TestHelpers/DefaultResponses";

describe("API", () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    describe("Card", () => {
        it("#GET", async () => {
            const bunqApp: BunqJSClient = await SetupApp();

            const request = bunqApp.api.card.get(1, 2);
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#LIST", async () => {
            const bunqApp: BunqJSClient = await SetupApp();

            const request = bunqApp.api.card.list(1);
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#LIST - with pagination options", async () => {
            const bunqApp: BunqJSClient = await SetupApp();

            const request = bunqApp.api.card.list(1, {
                newer_id: 1,
                older_id: 2
            });
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });
        it("#UPDATE", async () => {
            const bunqApp: BunqJSClient = await SetupApp();

            const request = bunqApp.api.card.update(
                1,
                2,
                "1234",
                "123456",
                "ACTIVE",
                {
                    currency: "EUR",
                    value: "50.00"
                },
                {
                    currency: "EUR",
                    value: "50.00"
                },
                // {
                // 	expiry_time: null
                // },
                [
                    {
                        country: "NL",
                        expiry_time: null
                    }
                ],
                [
                    {
                        type: "PRIMARY",
                        pin_code: "1334", // Not mandatory
                        monetary_account_id: 1234
                    }
                ],
                2
            );
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });
        it("#UPDATE - no options", async () => {
            const bunqApp: BunqJSClient = await SetupApp();

            const request = bunqApp.api.card.update(1, 2);
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });
    });
});
