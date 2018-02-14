import * as moxios from "moxios";

import Prepare from "../TestHelpers/Prepare";
import SetupApp from "../TestHelpers/SetupApp";
import { defaultResponse } from "../TestHelpers/DefaultResponses";

describe("API", () => {
    beforeAll(async done => {
        await Prepare();
        done();
    });

    beforeEach(function() {
        moxios.install();
    });

    afterEach(function() {
        moxios.uninstall();
    });

    describe("BunqMeTabs", () => {
        it("#GET", async () => {
            const app = await SetupApp("ApiBunqMeTabsGet1");

            const request = app.api.bunqMeTabs.get(1, 2);
            await defaultResponse(moxios);
            const response = await request;
        });

        it("#LIST", async () => {
            const app = await SetupApp("ApiBunqMeTabsList1");

            const request = app.api.bunqMeTabs.list(1);
            await defaultResponse(moxios);
            const response = await request;
        });

        it("#LIST - with pagination options", async () => {
            const app = await SetupApp("ApiBunqMeTabsList2");

            const request = app.api.bunqMeTabs.list(1, 2, {
                newer_id: 1,
                older_id: 2
            });
            await defaultResponse(moxios);
            const response = await request;
        });

        it("#POST", async () => {
            const app = await SetupApp("ApiBunqMeTabsPost1");

            const request = app.api.bunqMeTabs.post(
                5,
                12,
                "description",
                "12.00"
            );
            await defaultResponse(moxios);
            const response = await request;
        });

        it("#POST - with redirect url option", async () => {
            const app = await SetupApp("ApiBunqMeTabsPost2");

            const request = app.api.bunqMeTabs.post(
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
        });

        it("#PUT", async () => {
            const app = await SetupApp("ApiBunqMeTabsPut1");

            const request = app.api.bunqMeTabs.put(1, 2, 3);
            await defaultResponse(moxios);
            const response = await request;
        });
    });

    describe("Card", () => {
        it("#GET - should handle the request", async () => {
            const app = await SetupApp("ApiCardGet1");

            const request = app.api.card.get(1, 2);
            await defaultResponse(moxios);
            const response = await request;
        });

        it("#LIST", async () => {
            const app = await SetupApp("ApiCardList1");

            const request = app.api.card.list(1);
            await defaultResponse(moxios);
            const response = await request;
        });

        it("#LIST - with pagination options", async () => {
            const app = await SetupApp("ApiCardList2");

            const request = app.api.card.list(1, {
                newer_id: 1,
                older_id: 2
            });
            await defaultResponse(moxios);
            const response = await request;
        });
    });

    describe("DraftPayments", () => {
        it("#GET", async () => {
            const app = await SetupApp("ApiDraftPaymentsGet1");

            const request = app.api.draftPayment.get(1, 2, 3);
            await defaultResponse(moxios);
            const response = await request;
        });

        it("#LIST", async () => {
            const app = await SetupApp("ApiDraftPaymentsList1");

            const request = app.api.draftPayment.list(1, 2);
            await defaultResponse(moxios);
            const response = await request;
        });

        it("#LIST - with pagination options", async () => {
            const app = await SetupApp("ApiDraftPaymentsList2");

            const request = app.api.draftPayment.list(1, 2, {
                newer_id: 1,
                older_id: 2
            });
            await defaultResponse(moxios);
            const response = await request;
        });

        it("#POST", async () => {
            const app = await SetupApp("ApiDraftPaymentsPost1");

            const request = app.api.draftPayment.post(
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
        });

        it("#POST - with single counterparty (object not an array)", async () => {
            const app = await SetupApp("ApiDraftPaymentsPost1");

            const request = app.api.draftPayment.post(
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
        });
    });

    describe("MastercardActions", () => {
        it("#GET", async () => {
            const app = await SetupApp("ApiMastercardActionsGet1");

            const request = app.api.masterCardAction.get(1, 2, 3);
            await defaultResponse(moxios);
            const response = await request;
        });

        it("#LIST", async () => {
            const app = await SetupApp("ApiMastercardActionsList1");

            const request = app.api.masterCardAction.list(1, 2);
            await defaultResponse(moxios);
            const response = await request;
        });

        it("#LIST - with pagination options", async () => {
            const app = await SetupApp("ApiMastercardActionsList2");

            const request = app.api.masterCardAction.list(1, 2, {
                newer_id: 1,
                older_id: 2
            });
            await defaultResponse(moxios);
            const response = await request;
        });
    });

    describe("MonetaryAccounts", () => {
        it("#GET", async () => {
            const app = await SetupApp("ApiMonetaryAccountsGet1");

            const request = app.api.monetaryAccount.get(1, 3);
            await defaultResponse(moxios);
            const response = await request;
        });

        it("#LIST", async () => {
            const app = await SetupApp("ApiMonetaryAccountsList1");

            const request = app.api.monetaryAccount.list(1);
            await defaultResponse(moxios);
            const response = await request;
        });

        it("#LIST - with pagination options", async () => {
            const app = await SetupApp("ApiMonetaryAccountsList2");

            const request = app.api.monetaryAccount.list(1, {
                newer_id: 1,
                older_id: 2
            });
            await defaultResponse(moxios);
            const response = await request;
        });
    });

    describe("Payments", () => {
        it("#GET", async () => {
            const app = await SetupApp("ApiPaymentsGet1");

            const request = app.api.payment.get(1, 2);
            await defaultResponse(moxios);
            const response = await request;
        });

        it("#LIST", async () => {
            const app = await SetupApp("ApiPaymentsList1");

            const request = app.api.payment.list(1);
            await defaultResponse(moxios);
            const response = await request;
        });

        it("#LIST - with pagination options", async () => {
            const app = await SetupApp("ApiPaymentsList2");

            const request = app.api.payment.list(1, 2, {
                newer_id: 1,
                older_id: 2
            });
            await defaultResponse(moxios);
            const response = await request;
        });

        it("#POST", async () => {
            const app = await SetupApp("ApiPaymentsPost1");

            const request = app.api.payment.post(
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
        });
    });

    describe("Paymentbatch", () => {
        it("#GET", async () => {
            const app = await SetupApp("ApiPaymentbatchGet1");

            const request = app.api.paymentBatch.get(1, 2);
            await defaultResponse(moxios);
            const response = await request;
        });

        it("#LIST", async () => {
            const app = await SetupApp("ApiPaymentbatchList1");

            const request = app.api.paymentBatch.list(1);
            await defaultResponse(moxios);
            const response = await request;
        });

        it("#LIST - with pagination options", async () => {
            const app = await SetupApp("ApiPaymentbatchList2");

            const request = app.api.paymentBatch.list(1, 2, {
                newer_id: 1,
                older_id: 2
            });
            await defaultResponse(moxios);
            const response = await request;
        });

        it("#POST", async () => {
            const app = await SetupApp("ApiPaymentbatchPost1");

            const request = app.api.paymentBatch.post(
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
        });
    });

    describe("RequestInquiry", () => {
        it("#GET", async () => {
            const app = await SetupApp("ApiRequestInquiryGet1");

            const request = app.api.requestInquiry.get(1, 2);
            await defaultResponse(moxios);
            const response = await request;
        });

        it("#LIST", async () => {
            const app = await SetupApp("ApiRequestInquiryList1");

            const request = app.api.requestInquiry.list(1);
            await defaultResponse(moxios);
            const response = await request;
        });

        it("#LIST - with pagination options", async () => {
            const app = await SetupApp("ApiRequestInquiryList2");

            const request = app.api.requestInquiry.list(1, 2, {
                newer_id: 1,
                older_id: 2
            });
            await defaultResponse(moxios);
            const response = await request;
        });

        it("#POST", async () => {
            const app = await SetupApp("ApiRequestInquiryPost1");

            const request = app.api.requestInquiry.post(
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
        });
    });
});
