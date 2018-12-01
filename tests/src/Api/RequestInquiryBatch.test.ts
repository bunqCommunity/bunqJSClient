import * as moxios from "moxios";

import BunqJSClient from "../../../src/BunqJSClient";

import SetupApp from "../../TestHelpers/SetupApp";
import { defaultResponse } from "../../TestHelpers/DefaultResponses";

describe("API", () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    describe("RequestInquirybatch", () => {
        it("#GET", async () => {
            const bunqApp: BunqJSClient = await SetupApp();

            const request = bunqApp.api.requestInquiryBatch.get(1, 2, 3);
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#LIST", async () => {
            const bunqApp: BunqJSClient = await SetupApp();

            const request = bunqApp.api.requestInquiryBatch.list(1, 2);
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#LIST - with pagination options", async () => {
            const bunqApp: BunqJSClient = await SetupApp();

            const request = bunqApp.api.requestInquiryBatch.list(1, 2, {
                newer_id: 1,
                older_id: 2
            });
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#POST", async () => {
            const bunqApp: BunqJSClient = await SetupApp();

            const request = bunqApp.api.requestInquiryBatch.post(5, 12, [
                {
                    amount_inquired: {
                        value: "12.50",
                        currency: "EUR"
                    },
                    counterparty_alias: {
                        type: "EMAIL",
                        value: "bravo@bunq.com"
                    },
                    description: "Please pay for your candy",
                    allow_bunqme: false
                }
            ]);
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();

            const request2 = bunqApp.api.requestInquiryBatch.post(5, 12, [
                {
                    amount_inquired: {
                        value: "12.50",
                        currency: "EUR"
                    },
                    counterparty_alias: {
                        type: "EMAIL",
                        value: "bravo@bunq.com"
                    },
                    description: "Please pay for your candy",
                    allow_bunqme: false,
                    minimum_age: 15
                }
            ]);
            await defaultResponse(moxios);
            const response2 = await request2;

            expect(response2).not.toBeNull();
        });

        it("#POST - with invalid minimum age", async () => {
            const bunqApp: BunqJSClient = await SetupApp();

            const request = bunqApp.api.requestInquiryBatch.post(
                5,
                12,
                [
                    {
                        amount_inquired: {
                            value: "12.50",
                            currency: "EUR"
                        },
                        counterparty_alias: {
                            type: "EMAIL",
                            value: "bravo@bunq.com"
                        },
                        description: "Please pay for your candy",
                        allow_bunqme: false,
                        minimum_age: 4
                    }
                ],
                "REVOKED"
            );

            request.then(response => expect(false).toBeTruthy()).catch(error => expect(true).toBeTruthy());

            const request2 = bunqApp.api.requestInquiryBatch.post(
                5,
                12,
                [
                    {
                        amount_inquired: {
                            value: "12.50",
                            currency: "EUR"
                        },
                        counterparty_alias: {
                            type: "EMAIL",
                            value: "bravo@bunq.com"
                        },
                        description: "Please pay for your candy",
                        allow_bunqme: false,
                        minimum_age: 120
                    }
                ],
                "REVOKED"
            );

            request2.then(response => expect(false).toBeTruthy()).catch(error => expect(true).toBeTruthy());
        });

        it("#PUT", async () => {
            const bunqApp: BunqJSClient = await SetupApp();

            const request = bunqApp.api.requestInquiryBatch.put(5, 12, 7);
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#PUT - without default status value", async () => {
            const bunqApp: BunqJSClient = await SetupApp();

            const request = bunqApp.api.requestInquiryBatch.put(5, 12, 7, "REVOKED");
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });
    });
});
