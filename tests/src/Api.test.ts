import * as moxios from "moxios";

import BunqJSClient from "../../src/BunqJSClient";

import Prepare from "../TestHelpers/Prepare";
import SetupApp from "../TestHelpers/SetupApp";
import { defaultResponse } from "../TestHelpers/DefaultResponses";

let bunqApp: BunqJSClient;

describe("API", () => {
    beforeAll(async () => {
        moxios.install();

        // prepare certificates
        await Prepare();
        // create a bunqjsclient to be used in the tests
        bunqApp = await SetupApp("ApiGeneral");

        moxios.uninstall();
    });

    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    describe("BunqMeTabs", () => {
        it("#GET", async () => {
            const request = bunqApp.api.bunqMeTabs.get(1, 2);
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#LIST", async () => {
            const request = bunqApp.api.bunqMeTabs.list(1, 2);
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#LIST - with pagination options", async () => {
            const request = bunqApp.api.bunqMeTabs.list(1, 2, {
                newer_id: 1,
                older_id: 2
            });
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#POST", async () => {
            const request = bunqApp.api.bunqMeTabs.post(
                5,
                12,
                "description",
                "12.00"
            );
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#POST - with redirect url option", async () => {
            const request = bunqApp.api.bunqMeTabs.post(
                5,
                12,
                "description",
                {
                    value: "12.00",
                    currency: "EUR"
                },
                {
                    redirect_url: "https://example.com"
                }
            );
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#PUT", async () => {
            const request = bunqApp.api.bunqMeTabs.put(1, 2, 3);
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });
    });

    describe("Card", () => {
        it("#GET - should handle the request", async () => {
            const request = bunqApp.api.card.get(1, 2);
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#LIST", async () => {
            const request = bunqApp.api.card.list(1);
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#LIST - with pagination options", async () => {
            const request = bunqApp.api.card.list(1, {
                newer_id: 1,
                older_id: 2
            });
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });
    });

    describe("DraftPayments", () => {
        it("#GET", async () => {
            const request = bunqApp.api.draftPayment.get(1, 2, 3);
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#LIST", async () => {
            const request = bunqApp.api.draftPayment.list(1, 2);
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#LIST - with pagination options", async () => {
            const request = bunqApp.api.draftPayment.list(1, 2, {
                newer_id: 1,
                older_id: 2
            });
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#POST", async () => {
            const request = bunqApp.api.draftPayment.post(
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
                    },
                    {
                        type: "EMAIL",
                        value: "mail2@example.com"
                    }
                ]
            );
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#POST - with single counterparty (object not an array)", async () => {
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
    });

    describe("MastercardActions", () => {
        it("#GET", async () => {
            const request = bunqApp.api.masterCardAction.get(1, 2, 3);
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#LIST", async () => {
            const request = bunqApp.api.masterCardAction.list(1, 2);
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#LIST - with pagination options", async () => {
            const request = bunqApp.api.masterCardAction.list(1, 2, {
                newer_id: 1,
                older_id: 2
            });
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });
    });

    describe("MonetaryAccounts", () => {
        it("#GET", async () => {
            const request = bunqApp.api.monetaryAccount.get(1, 3);
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#LIST", async () => {
            const request = bunqApp.api.monetaryAccount.list(1);
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#LIST - with pagination options", async () => {
            const request = bunqApp.api.monetaryAccount.list(1, {
                newer_id: 1,
                older_id: 2
            });
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });
    });

    describe("Payments", () => {
        it("#GET", async () => {
            const request = bunqApp.api.payment.get(1, 2);
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#LIST", async () => {
            const request = bunqApp.api.payment.list(1);
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#LIST - with pagination options", async () => {
            const request = bunqApp.api.payment.list(1, 2, {
                newer_id: 1,
                older_id: 2
            });
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#POST", async () => {
            const request = bunqApp.api.payment.post(
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
    });

    describe("Paymentbatch", () => {
        it("#GET", async () => {
            const request = bunqApp.api.paymentBatch.get(1, 2);
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#LIST", async () => {
            const request = bunqApp.api.paymentBatch.list(1);
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#LIST - with pagination options", async () => {
            const request = bunqApp.api.paymentBatch.list(1, 2, {
                newer_id: 1,
                older_id: 2
            });
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#POST", async () => {
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
    });

    describe("RequestInquiry", () => {
        it("#GET", async () => {
            const request = bunqApp.api.requestInquiry.get(1, 2);
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#LIST", async () => {
            const request = bunqApp.api.requestInquiry.list(1);
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#LIST - with pagination options", async () => {
            const request = bunqApp.api.requestInquiry.list(1, 2, {
                newer_id: 1,
                older_id: 2
            });
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#POST", async () => {
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
                    status: "ACCEPTED",
                    merchant_reference: 1,
                    minimum_age: 16,
                    redirect_url: "https://example.com"
                }
            );
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#POST - with invalid minimum age", async () => {
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

            request
                .then(response => expect(false).toBeTruthy())
                .catch(error => expect(true).toBeTruthy());

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

            request2
                .then(response => expect(false).toBeTruthy())
                .catch(error => expect(true).toBeTruthy());
        });

        it("#PUT", async () => {
            const request = bunqApp.api.requestInquiry.put(5, 12, 7);
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#PUT - with custom status", async () => {
            const request = bunqApp.api.requestInquiry.put(5, 12, 7, "REVOKED");
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });
    });

    describe("RequestInquirybatch", () => {
        it("#GET", async () => {
            const request = bunqApp.api.requestInquiryBatch.get(1, 2);
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#LIST", async () => {
            const request = bunqApp.api.requestInquiryBatch.list(1);
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#LIST - with pagination options", async () => {
            const request = bunqApp.api.requestInquiryBatch.list(1, 2, {
                newer_id: 1,
                older_id: 2
            });
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#POST", async () => {
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

            request
                .then(response => expect(false).toBeTruthy())
                .catch(error => expect(true).toBeTruthy());

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

            request2
                .then(response => expect(false).toBeTruthy())
                .catch(error => expect(true).toBeTruthy());
        });

        it("#PUT", async () => {
            const request = bunqApp.api.requestInquiryBatch.put(5, 12, 7);
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#PUT - without default status value", async () => {
            const request = bunqApp.api.requestInquiryBatch.put(
                5,
                12,
                7,
                "REVOKED"
            );
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });
    });

    describe("RequestResponse", () => {
        it("#GET", async () => {
            const request = bunqApp.api.requestResponse.get(1, 2);
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#LIST", async () => {
            const request = bunqApp.api.requestResponse.list(1, 2);
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#LIST - with pagination options", async () => {
            const request = bunqApp.api.requestResponse.list(1, 2, {
                newer_id: 1,
                older_id: 2
            });
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#PUT", async () => {
            const request = bunqApp.api.requestResponse.put(
                1,
                2,
                3,
                "ACCEPTED"
            );
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#PUT - with accepted status", async () => {
            const request = bunqApp.api.requestResponse.put(
                1,
                2,
                3,
                "REJECTED"
            );
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });
    });

    describe("User", () => {
        it("#GET", async () => {
            const request = bunqApp.api.user.get(1);
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#LIST", async () => {
            const request = bunqApp.api.user.list();
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });
    });
});
