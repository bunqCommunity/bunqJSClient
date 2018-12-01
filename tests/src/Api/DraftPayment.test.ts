import * as moxios from "moxios";

import BunqJSClient from "../../../src/BunqJSClient";

import SetupApp from "../../TestHelpers/SetupApp";
import { defaultResponse } from "../../TestHelpers/DefaultResponses";

describe("API", () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    describe("DraftPayments", () => {
        it("#GET", async () => {
            const bunqApp: BunqJSClient = await SetupApp();

            const request = bunqApp.api.draftPayment.get(1, 2, 3);
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#LIST", async () => {
            const bunqApp: BunqJSClient = await SetupApp();

            const request = bunqApp.api.draftPayment.list(1, 2);
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#LIST - with pagination options", async () => {
            const bunqApp: BunqJSClient = await SetupApp();

            const request = bunqApp.api.draftPayment.list(1, 2, {
                newer_id: 1,
                older_id: 2
            });
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#POST", async () => {
            const bunqApp: BunqJSClient = await SetupApp();

            const counterpartyAliases: any = [
                {
                    type: "EMAIL",
                    value: "mail@example.com",
                    name: ""
                },
                {
                    type: "EMAIL",
                    value: "mail2@example.com"
                }
            ];

            const request = bunqApp.api.draftPayment.post(
                5,
                12,
                "description",
                {
                    value: "12.00",
                    currency: "EUR"
                },
                counterpartyAliases
            );
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#POST - with single counterparty (object not an array)", async () => {
            const bunqApp: BunqJSClient = await SetupApp();

            const request = bunqApp.api.draftPayment.post(
                5,
                12,
                "description",
                {
                    value: "12.00",
                    currency: "EUR"
                },
                {
                    type: "EMAIL",
                    value: "mail@example.com"
                }
            );
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#POST direct", async () => {
            const bunqApp: BunqJSClient = await SetupApp();

            const request = bunqApp.api.draftPayment.postRaw(1, 2, [
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
