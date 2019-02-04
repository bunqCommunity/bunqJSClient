import * as moxios from "moxios";
// import BunqJSClient from "../../../src/BunqJSClient";
import EncryptRequestHandler from "../../../src/HTTP/EncryptRequestHandler";

import Prepare from "../../TestHelpers/Prepare";
// import SetupApp from "../../TestHelpers/SetupApp";

describe("EncryptRequestHandler", () => {
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

    describe("#encryptRequest()", () => {
        // TODO add tests with more variations

        it("should be true", async () => {
            expect(true);
        });
    });
});
