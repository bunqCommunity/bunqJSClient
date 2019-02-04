import * as moxios from "moxios";

import BunqJSClient from "../../../src/BunqJSClient";

import SetupApp from "../../TestHelpers/SetupApp";
import { defaultResponse } from "../../TestHelpers/DefaultResponses";

describe("API", () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    describe("CardDebit", () => {
        it("#POST", async () => {
            const bunqApp: BunqJSClient = await SetupApp();

            const request = bunqApp.api.cardDebit.post(
                1,
                "cardname",
                "description",
                {
                    type: "EMAIL",
                    value: "mail@example.com"
                },
                "MAESTRO",
                [
                    {
                        type: "PRIMARY",
                        pin_code: "1234",
                        monetary_account_id: 1234
                    }
                ]
            );
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });
    });
});
