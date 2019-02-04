import * as moxios from "moxios";

import BunqJSClient from "../../../src/BunqJSClient";

import SetupApp from "../../TestHelpers/SetupApp";
import { defaultResponse } from "../../TestHelpers/DefaultResponses";

describe("API", () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it("#CARDUPDATE", async () => {
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
            [
                {
                    daily_limit: "50.00",
                    currency: "EUR",
                    type: "CARD_LIMIT_CONTACTLESS"
                }
            ],
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
