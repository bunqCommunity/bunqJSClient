import * as moxios from "moxios";

import BunqJSClient from "../../../src/BunqJSClient";

import Prepare from "../../TestHelpers/Prepare";
import SetupApp from "../../TestHelpers/SetupApp";
import { defaultResponse, sessionRegistration } from "../../TestHelpers/DefaultResponses";

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

    describe("SchedulePayment", () => {
        it("#GET", async () => {
            const request = bunqApp.api.schedulePayment.get(1, 2, 3);
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#LIST", async () => {
            const request = bunqApp.api.schedulePayment.list(1, 2);
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#LIST - with pagination options", async () => {
            const request = bunqApp.api.schedulePayment.list(1, 2, {
                newer_id: 1,
                older_id: 2,
                count: 200
            });
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#POST", async () => {
            const request = bunqApp.api.schedulePayment.post(
                1,
                2,
                {
                    description: "payment description",
                    counterparty_alias: {
                        type: "EMAIL",
                        value: "mail@example.com"
                    },
                    amount: {
                        value: "12.00",
                        currency: "EUR"
                    }
                },
                {
                    time_start: "2015-08-25 09:00.00",
                    recurrence_unit: "ONCE",
                    recurrence_size: 1
                }
            );
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#PUT", async () => {
            const request = bunqApp.api.schedulePayment.put(
                1,
                2,
                3,
                {
                    description: "payment description",
                    counterparty_alias: {
                        type: "EMAIL",
                        value: "mail@example.com"
                    },
                    amount: {
                        value: "12.00",
                        currency: "EUR"
                    }
                },
                {
                    time_start: "2015-08-25 09:00.00",
                    recurrence_unit: "ONCE",
                    recurrence_size: 1
                }
            );
            await sessionRegistration(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#DELETE", async () => {
            const request = bunqApp.api.schedulePayment.delete(1, 2, 3);
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });
    });
});
