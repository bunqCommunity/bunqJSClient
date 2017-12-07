import * as moxios from "moxios";
import BunqJSClient from "../../src/BunqJSClient";
import CustomDb from "../TestHelpers/CustomDb";
import apiInstallation from "../TestData/api-installation";

const fakeApiKey =
    "0d873607f6f84f12bd0d873607f6f84f12bd0d873607f6f84f12bd111111111f";
const fakeEncryptionKey = "3c7a4d431a846ed33a3bb1b1fa9b5c26";

describe("BunqJSClient", () => {
    beforeEach(function() {
        moxios.install();
    });

    afterEach(function() {
        moxios.uninstall();
    });

    describe("#construct()", () => {
        it("should create a new instance", () => {
            const app = new BunqJSClient(new CustomDb("construct1"));
            expect(app instanceof BunqJSClient).toBeTruthy();
        });

        it("should create a new instance without a custom storage interface", () => {
            const app = new BunqJSClient();
            expect(app instanceof BunqJSClient).toBeTruthy();
        });
    });

    describe("#run()", () => {
        it("run with default options", async () => {
            const app = new BunqJSClient(new CustomDb("run1"));

            await app.run(fakeApiKey);

            expect(true);
        });

        it("run with custom options", async () => {
            const app = new BunqJSClient(new CustomDb("run2"));

            await app.run(fakeApiKey, [], "SANDBOX", fakeEncryptionKey);

            expect(true);
        });
    });

    describe("#install()", () => {
        it("installation without pre-existing", async () => {
            const app = new BunqJSClient(new CustomDb("install"));
            await app.run(fakeApiKey, [], "SANDBOX", fakeEncryptionKey);

            await new Promise((resolve, reject) => {
                app
                    .install()
                    .then(resolve)
                    .catch(reject);

                // wait for a request to the moxios instance
                moxios.wait(() => {
                    // respond to the most recent respondWith
                    moxios.requests
                        .mostRecent()
                        .respondWith({
                            status: 200,
                            response: apiInstallation()
                        })
                        .then(() => console.log("success request2"))
                        .catch(reject);
                });
            });

            // re-run, it should be done instantly since the installation is done already
            await app.install();

            expect(true);
        });

        // it("run with custom options", async () => {
        //     const app = new BunqJSClient(new CustomDb("install2"));
        //     await app.run(fakeApiKey, [], "SANDBOX", fakeEncryptionKey);
        //
        //     expect(true);
        // });
    });
});
