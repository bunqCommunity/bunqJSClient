import * as moxios from "moxios";

import BunqJSClient from "../../../src/BunqJSClient";

import SetupApp from "../../TestHelpers/SetupApp";
import { defaultResponse } from "../../TestHelpers/DefaultResponses";

describe("API", () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    describe("NoteText", () => {
        it("#createEndpoint()", async () => {
            const bunqApp: BunqJSClient = await SetupApp();

            const endpointUrl = bunqApp.api.noteText.createEndpoint("payment", 2);
            expect(endpointUrl).toBe("payment/2");
        });

        it("#GET", async () => {
            const bunqApp: BunqJSClient = await SetupApp();

            const request = bunqApp.api.noteText.get("payment", 1, 2, 3, 4);
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#GET - secondary id", async () => {
            const bunqApp: BunqJSClient = await SetupApp();

            const request = bunqApp.api.noteText.get("schedule", 1, 2, 3, 4, 5);
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#LIST", async () => {
            const bunqApp: BunqJSClient = await SetupApp();

            const request = bunqApp.api.noteText.list("payment", 1, 2, 3);
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#LIST - secondary id", async () => {
            const bunqApp: BunqJSClient = await SetupApp();

            const request = bunqApp.api.noteText.list("payment", 1, 2, 3, 4);
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#LIST - with pagination options", async () => {
            const bunqApp: BunqJSClient = await SetupApp();

            const request = bunqApp.api.noteText.list("payment", 1, 2, 3, 4, {
                newer_id: 1,
                older_id: 2,
                count: 200
            });
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#POST", async () => {
            const bunqApp: BunqJSClient = await SetupApp();

            const request = bunqApp.api.noteText.post("payment", 1, 2, 3, "Some description");
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#POST - secondary id", async () => {
            const bunqApp: BunqJSClient = await SetupApp();

            const request = bunqApp.api.noteText.post("whitelist", 1, 2, 3, "Some description", 4);
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#PUT", async () => {
            const bunqApp: BunqJSClient = await SetupApp();

            const request = bunqApp.api.noteText.put("payment", 1, 2, 3, 4, "Some description");
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#PUT - secondary id", async () => {
            const bunqApp: BunqJSClient = await SetupApp();

            const request = bunqApp.api.noteText.put("payment", 1, 2, 3, 4, "Some description", 6);
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#DELETE", async () => {
            const bunqApp: BunqJSClient = await SetupApp();

            const request = bunqApp.api.noteText.delete("payment", 1, 2, 3, 4);
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#DELETE - secondary id", async () => {
            const bunqApp: BunqJSClient = await SetupApp();

            const request = bunqApp.api.noteText.delete("payment", 1, 2, 3, 4, 5);
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });
    });
});
