import * as moxios from "moxios";

import BunqJSClient from "../../src/BunqJSClient";

import Prepare from "../TestHelpers/Prepare";
import SetupApp from "../TestHelpers/SetupApp";
import {
    defaultResponse,
    deviceServerRegistration,
    installationRegistration,
    sessionRegistration,
    fileResponse
} from "../TestHelpers/DefaultResponses";

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

    describe("AttachmentContent", () => {
        it("#GET", async () => {
            const request = bunqApp.api.attachmentContent.get(
                "SOME_RANDOM_IMAGE_ID",
                {
                    base64: false
                }
            );
            await fileResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#GET - With default values", async () => {
            const request = bunqApp.api.attachmentContent.get(
                "SOME_RANDOM_IMAGE_ID"
            );
            await fileResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });
    });

    describe("BunqMeTabs", () => {
        it("#GET", async () => {
            const request = bunqApp.api.bunqMeTabs.get(1, 2, 3);
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
        it("#GET", async () => {
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

    describe("CardCvc2", () => {
        it("#GET", async () => {
            const request = bunqApp.api.cardCvc2.get(1, 2, 3);
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#LIST", async () => {
            const request = bunqApp.api.cardCvc2.list(1, 2);
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#LIST - with pagination options", async () => {
            const request = bunqApp.api.cardCvc2.list(1, 2, {
                newer_id: 1,
                older_id: 2
            });
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#POST", async () => {
            const request = bunqApp.api.cardCvc2.post(5, 12);
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });
    });

    describe("CustomerStatementExport", () => {
        it("#GET", async () => {
            const request = bunqApp.api.customerStatementExport.get(1, 2, 3);
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#LIST", async () => {
            const request = bunqApp.api.customerStatementExport.list(1, 2);
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#LIST - with pagination options", async () => {
            const request = bunqApp.api.customerStatementExport.list(1, 2, {
                newer_id: 1,
                older_id: 2
            });
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#POST", async () => {
            const request = bunqApp.api.customerStatementExport.post(1, 2, 3);
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#DELETE", async () => {
            const request = bunqApp.api.customerStatementExport.delete(1, 2, 3);
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });
    });

    describe("CustomerStatementExportContent", () => {
        it("#LIST", async () => {
            const request = bunqApp.api.customerStatementExportContent.list(
                1,
                2,
                3
            );
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#LIST - with pagination options", async () => {
            const request = bunqApp.api.customerStatementExportContent.list(
                1,
                2,
                3,
                {
                    newer_id: 1,
                    older_id: 2
                }
            );
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });
    });

    describe("DeviceRegistration", () => {
        it("#ADD", async () => {
            const request = bunqApp.api.deviceRegistration.add({
                description: "SomeDeviceName",
                permitted_ips: ["1.1.1.1"]
            });
            await deviceServerRegistration(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#ADD - with default options", async () => {
            const request = bunqApp.api.deviceRegistration.add();
            await deviceServerRegistration(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#GET", async () => {
            const request = bunqApp.api.deviceRegistration.get({ deviceId: 1 });
            await deviceServerRegistration(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#GET - with default options", async () => {
            const request = bunqApp.api.deviceRegistration.get();
            await deviceServerRegistration(moxios);
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

    describe("Installation", () => {
        it("#ADD", async () => {
            const request = bunqApp.api.installation.add();
            await installationRegistration(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#GET", async () => {
            const request = bunqApp.api.installation.get(1);
            await installationRegistration(moxios);
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
                older_id: 2,
                count: 50
            });
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });
    });

    describe("MonetaryAccountBank", () => {
        it("#GET", async () => {
            const request = bunqApp.api.monetaryAccountBank.get(1, 3);
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#POST", async () => {
            const request = bunqApp.api.monetaryAccountBank.post(
                1,
                "EUR",
                "Account description",
                {
                    value: "50.00",
                    currency: "EUR"
                },
                "#FF0000"
            );
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#PUT", async () => {
            const request = bunqApp.api.monetaryAccountBank.put(1, 2, {
                description: "New account description"
            });
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#PUT - Cancel account helper endpoint", async () => {
            const request = bunqApp.api.monetaryAccountBank.putCancel(
                1,
                2,
                "CANCELLED",
                "REDEMPTION_VOLUNTARY",
                "No longer need the account"
            );
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#LIST", async () => {
            const request = bunqApp.api.monetaryAccountBank.list(1);
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#LIST - with pagination options", async () => {
            const request = bunqApp.api.monetaryAccountBank.list(1, {
                newer_id: 1,
                older_id: 2,
                count: 50
            });
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });
    });

    describe("Payments", () => {
        it("#GET", async () => {
            const request = bunqApp.api.payment.get(1, 2, 3);
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#LIST", async () => {
            const request = bunqApp.api.payment.list(1, 2);
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#LIST - with pagination options", async () => {
            const request = bunqApp.api.payment.list(1, 2, {
                newer_id: 1,
                older_id: 2,
                count: 50
            });
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#POST", async () => {
            const request = bunqApp.api.payment.post(
                1,
                2,
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

    describe("SandboxUser", () => {
        it("#POST", async () => {
            const request = bunqApp.api.sandboxUser.post();
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });
    });

    describe("Schedule", () => {
        it("#LIST", async () => {
            const request = bunqApp.api.schedule.list(1, 2);
            await sessionRegistration(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#LIST - with pagination options", async () => {
            const request = bunqApp.api.schedule.list(1, 2, {
                newer_id: 1,
                older_id: 2,
                count: 50
            });
            await sessionRegistration(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });
    });

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
                count: 50
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

    describe("ShareInviteBankResponse", () => {
        it("#LIST", async () => {
            const request = bunqApp.api.shareInviteBankResponse.list(1);
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#LIST - with pagination options", async () => {
            const request = bunqApp.api.shareInviteBankResponse.list(1, {
                newer_id: 1,
                older_id: 2,
                count: 50
            });
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });
    });

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

    describe("SessionServer", () => {
        it("#ADD", async () => {
            const request = bunqApp.api.sessionServer.add();
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#DELETE", async () => {
            const request = bunqApp.api.sessionServer.delete();
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

    describe("UserCompany", () => {
        it("#PUT", async () => {
            const request = bunqApp.api.userCompany.put(1, {});
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });
    });

    describe("UserPerson", () => {
        it("#PUT", async () => {
            const request = bunqApp.api.userPerson.put(1, {});
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });
    });
});
