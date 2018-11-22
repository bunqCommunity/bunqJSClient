import * as moxios from "moxios";

import BunqJSClient from "../../../src/BunqJSClient";

import Prepare from "../../TestHelpers/Prepare";
import SetupApp from "../../TestHelpers/SetupApp";
import { fileResponse } from "../../TestHelpers/DefaultResponses";

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
            const request = bunqApp.api.attachmentContent.get("SOME_RANDOM_IMAGE_ID", {
                base64: false
            });
            await fileResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#GET - With default values", async () => {
            const request = bunqApp.api.attachmentContent.get("SOME_RANDOM_IMAGE_ID");
            await fileResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });
    });
});
