import * as moxios from "moxios";
import BunqJSClient from "../../../src/BunqJSClient";
import VerifyResponseHandler from "../../../src/HTTP/VerifyResponseHandler";
import CustomError from "../../../src/Interfaces/CustomError";

import Prepare from "../../TestHelpers/Prepare";
import SetupApp from "../../TestHelpers/SetupApp";

export const unVerifyableResponse = async (moxios, responseType = "default", status: any = 200) => {
    await new Promise((resolve, reject) => {
        moxios.wait(() => {
            let responseData: any = "";

            switch (responseType) {
                case "string":
                    responseData = "string-content";
                    break;
                case "none":
                    responseData = undefined;
                    break;
                case "default":
                default:
                    responseData = {
                        Response: [
                            {
                                Id: {
                                    id: 1273489172394
                                }
                            },
                            {
                                Token: {
                                    token: ""
                                }
                            },
                            {
                                UserPerson: {
                                    id: ""
                                }
                            }
                        ]
                    };
                    break;
            }

            moxios.requests
                .mostRecent()
                .respondWith({
                    status: status,
                    headers: {
                        "Content-Type": "application/json",
                        "X-Bunq-Response-Id": "123nr27q0vn37rq2",
                        "X-Bunq-Server-Signature": "123nr27q0vn37rq2"
                    },
                    response: responseData
                })
                .then(resolve)
                .catch(reject);
        });
    });
};

describe("VerifyResponseHandler", () => {
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

    describe("#verifyResponse()", () => {

        // TODO add tests with actual bunq sample responses

        it("should invalidate a invalid response", async () => {
            const bunqApp: BunqJSClient = await SetupApp();
            expect.assertions(1);

            // wrapper around the promise since Jest docs example doesn't work ...
            await expect(
                new Promise((resolve, reject) => {
                    // disable CI check for verification
                    process.env.ENV_CI = "false";

                    unVerifyableResponse(moxios).catch(ex => {
                        process.env.ENV_CI = "true";
                        reject(ex);
                    });

                    bunqApp.api.sessionServer
                        .add()
                        .then(result => {
                            process.env.ENV_CI = "true";
                            resolve(result);
                        })
                        .catch(ex => {
                            process.env.ENV_CI = "true";
                            reject(ex);
                        });
                })
            ).rejects.toThrow(CustomError);
        });

        it("should ignore validation without serverPublicKey", async () => {
            const bunqApp: BunqJSClient = await SetupApp();
            expect.assertions(1);

            bunqApp.Session.serverPublicKey = "";

            const request = bunqApp.api.sessionServer.add();
            await unVerifyableResponse(moxios);
            await expect(request).resolves.toBeTruthy();
        });

        it("should handle other response types", async () => {
            const bunqApp: BunqJSClient = await SetupApp();
            expect.assertions(3);

            const request = bunqApp.ApiAdapter.request("/url");
            await unVerifyableResponse(moxios);
            await expect(request).resolves.toBeTruthy();

            const request2 = bunqApp.ApiAdapter.request("/url");
            await unVerifyableResponse(moxios, "string");
            await expect(request2).resolves.toBeTruthy();

            const request3 = bunqApp.ApiAdapter.request("/url");
            await unVerifyableResponse(moxios, "none");
            await expect(request3).resolves.toBeTruthy();
        });

        it("should handle other status", async () => {
            const bunqApp: BunqJSClient = await SetupApp();
            expect.assertions(1);

            const request = bunqApp.ApiAdapter.request("/url");
            await unVerifyableResponse(moxios, "default", false);
            await expect(request).resolves.toBeTruthy();
        });
    });
});
