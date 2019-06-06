import * as moxios from "moxios";

import BunqJSClient from "../../../src/BunqJSClient";

import SetupApp from "../../TestHelpers/SetupApp";
import { defaultResponse } from "../../TestHelpers/DefaultResponses";

describe("API", () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    describe("ShareInviteBankInquiry", () => {
        it("#GET", async () => {
            const bunqApp: BunqJSClient = await SetupApp();

            const request = bunqApp.api.shareInviteBankInquiry.get(1, 2, 3);
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#LIST", async () => {
            const bunqApp: BunqJSClient = await SetupApp();

            const request = bunqApp.api.shareInviteBankInquiry.list(1, 2, {});
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#LIST - defaults", async () => {
            const bunqApp: BunqJSClient = await SetupApp();

            const request = bunqApp.api.shareInviteBankInquiry.list(1, 2);
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#LIST - with pagination options", async () => {
            const bunqApp: BunqJSClient = await SetupApp();

            const request = bunqApp.api.shareInviteBankInquiry.list(1, 2, {
                newer_id: 1,
                older_id: 2,
                count: 200
            });
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#LIST - with default options", async () => {
            const bunqApp: BunqJSClient = await SetupApp();

            const request = bunqApp.api.shareInviteBankInquiry.list(1, 2, {});
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#POST", async () => {
            const bunqApp: BunqJSClient = await SetupApp();

            const request = bunqApp.api.shareInviteBankInquiry.post(
                1,
                2,
                {
                    type: "EMAIL",
                    value: "mail@mail.com"
                },
                {
                    ShareDetailPayment: {
                        make_payments: true,
                        make_draft_payments: true,
                        view_balance: true,
                        view_old_events: true,
                        view_new_events: true
                    }
                },
                "PENDING",
                {}
            );
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#POST - defaults", async () => {
            const bunqApp: BunqJSClient = await SetupApp();

            const request = bunqApp.api.shareInviteBankInquiry.post(
                1,
                2,
                {
                    type: "EMAIL",
                    value: "mail@mail.com"
                },
                {
                    ShareDetailPayment: {
                        make_payments: true,
                        make_draft_payments: true,
                        view_balance: true,
                        view_old_events: true,
                        view_new_events: true
                    }
                }
            );
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#POST - specific options", async () => {
            const bunqApp: BunqJSClient = await SetupApp();

            const request = bunqApp.api.shareInviteBankInquiry.post(
                1,
                2,
                {
                    type: "EMAIL",
                    value: "mail@mail.com"
                },
                {
                    ShareDetailPayment: {
                        make_payments: true,
                        make_draft_payments: true,
                        view_balance: true,
                        view_old_events: true,
                        view_new_events: true
                    }
                },
                "REVOKED",
                {
                    share_type: "STANDARD",
                    start_date: new Date(),
                    end_date: new Date()
                }
            );
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#PUT", async () => {
            const bunqApp: BunqJSClient = await SetupApp();

            const request = bunqApp.api.shareInviteBankInquiry.put(
                1,
                2,
                3,
                {
                    type: "EMAIL",
                    value: "mail@mail.com"
                },
                {
                    ShareDetailPayment: {
                        make_payments: true,
                        make_draft_payments: true,
                        view_balance: true,
                        view_old_events: true,
                        view_new_events: true
                    }
                },
                "REVOKED",
                {
                    share_type: "STANDARD",
                    start_date: new Date(),
                    end_date: new Date()
                }
            );
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#PUT - defaults", async () => {
            const bunqApp: BunqJSClient = await SetupApp();

            const request = bunqApp.api.shareInviteBankInquiry.put(
                1,
                2,
                3,
                {
                    type: "EMAIL",
                    value: "mail@mail.com"
                },
                {
                    ShareDetailPayment: {
                        make_payments: true,
                        make_draft_payments: true,
                        view_balance: true,
                        view_old_events: true,
                        view_new_events: true
                    }
                }
            );
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#PUT - no default share_type", async () => {
            const bunqApp: BunqJSClient = await SetupApp();

            const request = bunqApp.api.shareInviteBankInquiry.put(
                1,
                2,
                3,
                {
                    type: "EMAIL",
                    value: "mail@mail.com"
                },
                {
                    ShareDetailPayment: {
                        make_payments: true,
                        make_draft_payments: true,
                        view_balance: true,
                        view_old_events: true,
                        view_new_events: true
                    }
                },
                "PENDING",
                {}
            );
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#PUT - putStatus", async () => {
            const bunqApp: BunqJSClient = await SetupApp();

            const request = bunqApp.api.shareInviteBankInquiry.putStatus(1, 2, 3, "PENDING");
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });
    });
});
