import * as moxios from "moxios";

import BunqJSClient from "../../../src/BunqJSClient";

import SetupApp from "../../TestHelpers/SetupApp";
import { fileResponse } from "../../TestHelpers/DefaultResponses";

describe("API", () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    describe("AttachmentContent", () => {
        it("#GET", async () => {
            const bunqApp: BunqJSClient = await SetupApp();

            const request = bunqApp.api.attachmentContent.get("SOME_RANDOM_IMAGE_ID", {
                base64: false
            });
            await fileResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#GET - With default values", async () => {
            const bunqApp: BunqJSClient = await SetupApp();

            const request = bunqApp.api.attachmentContent.get("SOME_RANDOM_IMAGE_ID");
            await fileResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });
    });
});
