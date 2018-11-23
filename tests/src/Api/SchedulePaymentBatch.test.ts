import * as moxios from "moxios";

import BunqJSClient from "../../../src/BunqJSClient";

import Prepare from "../../TestHelpers/Prepare";
import SetupApp from "../../TestHelpers/SetupApp";
import { defaultResponse } from "../../TestHelpers/DefaultResponses";

let bunqApp: BunqJSClient;

describe("API", () => {
    beforeAll(async done => {
        moxios.install();

        // prepare certificates
        await Prepare();
        // create a bunqjsclient to be used in the tests
        bunqApp = await SetupApp("SchedulePaymentBatch");

        moxios.uninstall();
        done();
    });

    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    describe("SchedulePaymentBatch", () => {
        it("#POST", async () => {
            const request = bunqApp.api.schedulePaymentBatch.post(
                1,
                2,
                [
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
                        description: "different payment description",
                        counterparty_alias: {
                            type: "EMAIL",
                            value: "mail2@example.com"
                        },
                        amount: {
                            value: "5.00",
                            currency: "EUR"
                        }
                    }
                ],
                {
                    time_start: "2015-08-25 09:00.00",
                    time_end: "2019-08-25 09:00.00",
                    recurrence_unit: "WEEKLY",
                    recurrence_size: 1
                }
            );
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#DELETE", async () => {
            const request = bunqApp.api.schedulePaymentBatch.delete(1, 2, 3);
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });
    });
});
