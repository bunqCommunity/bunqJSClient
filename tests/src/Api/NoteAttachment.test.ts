import * as moxios from "moxios";

import BunqJSClient from "../../../src/BunqJSClient";

import Prepare from "../../TestHelpers/Prepare";
import SetupApp from "../../TestHelpers/SetupApp";
import { defaultResponse } from "../../TestHelpers/DefaultResponses";

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

    describe("NoteAttachment", () => {
        it("#GET", async () => {
            const request = bunqApp.api.noteAttachment.get("payment", 1, 2, 3, 4);
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#GET - secondary id", async () => {
            const request = bunqApp.api.noteAttachment.get("schedule", 1, 2, 3, 4, 5);
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#LIST", async () => {
            const request = bunqApp.api.noteAttachment.list("payment", 1, 2, 3);
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#LIST - secondary id", async () => {
            const request = bunqApp.api.noteAttachment.list("payment", 1, 2, 3, 4);
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#LIST - with pagination options", async () => {
            const request = bunqApp.api.noteAttachment.list("payment", 1, 2, 3, 4, {
                newer_id: 1,
                older_id: 2,
                count: 200
            });
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#POST", async () => {
            const request = bunqApp.api.noteAttachment.post("payment", 1, 2, 3, 1234, "Some description");
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#POST - secondary id", async () => {
            const request = bunqApp.api.noteAttachment.post("payment", 1, 2, 3, 4, "Some description", 5);
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#PUT", async () => {
            const request = bunqApp.api.noteAttachment.put("payment", 1, 2, 3, 4, 5, "Some description");
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#PUT - secondary id", async () => {
            const request = bunqApp.api.noteAttachment.put("payment", 1, 2, 3, 4, 5, "Some description", 6);
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#DELETE", async () => {
            const request = bunqApp.api.noteAttachment.delete("payment", 1, 2, 3, 4);
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#DELETE - secondary id", async () => {
            const request = bunqApp.api.noteAttachment.delete("whitelist", 1, 2, 3, 4, 5);
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });
    });
});
