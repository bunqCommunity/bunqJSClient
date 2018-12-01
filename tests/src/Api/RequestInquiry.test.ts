import * as moxios from "moxios";

import BunqJSClient from "../../../src/BunqJSClient";

import SetupApp from "../../TestHelpers/SetupApp";
import { defaultResponse } from "../../TestHelpers/DefaultResponses";

describe("API", () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    describe("RequestInquiry", () => {
        it("#GET", async () => {
            const bunqApp: BunqJSClient = await SetupApp();

            const request = bunqApp.api.requestInquiry.get(1, 2, 3);
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#LIST", async () => {
            const bunqApp: BunqJSClient = await SetupApp();

            const request = bunqApp.api.requestInquiry.list(1, 2);
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#LIST - with pagination options", async () => {
            const bunqApp: BunqJSClient = await SetupApp();

            const request = bunqApp.api.requestInquiry.list(1, 2, {
                newer_id: 1,
                older_id: 2
            });
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#POST", async () => {
            const bunqApp: BunqJSClient = await SetupApp();

            const request = bunqApp.api.requestInquiry.post(
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

        it("#POST - with custom options", async () => {
            const bunqApp: BunqJSClient = await SetupApp();

            const request = bunqApp.api.requestInquiry.post(
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
                },
                {
                    status: "REVOKED",
                    merchant_reference: "asd",
                    minimum_age: 16,
                    redirect_url: "https://example.com"
                }
            );
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#POST - with invalid minimum age", async () => {
            const bunqApp: BunqJSClient = await SetupApp();

            const request = bunqApp.api.requestInquiry.post(
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
                },
                {
                    minimum_age: 4
                }
            );

            request.then(response => expect(false).toBeTruthy()).catch(error => expect(true).toBeTruthy());

            const request2 = bunqApp.api.requestInquiry.post(
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
                },
                {
                    minimum_age: 120
                }
            );

            request2.then(response => expect(false).toBeTruthy()).catch(error => expect(true).toBeTruthy());
        });

        it("#PUT", async () => {
            const bunqApp: BunqJSClient = await SetupApp();

            const request = bunqApp.api.requestInquiry.put(5, 12, 7);
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#PUT - with custom status", async () => {
            const bunqApp: BunqJSClient = await SetupApp();

            const request = bunqApp.api.requestInquiry.put(5, 12, 7, "REVOKED");
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });
    });
});
