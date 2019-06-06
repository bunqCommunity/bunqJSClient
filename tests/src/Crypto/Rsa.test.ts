import { createKeyPair } from "../../../src/Crypto/Rsa";
import Prepare from "../../TestHelpers/Prepare";

describe("Rsa", () => {
    beforeAll(async done => {
        await Prepare();
        done();
    });

    describe("#createKeyPair()", () => {
        it("should return true", async () => {
            const keyPair = await createKeyPair();

            expect(keyPair).not.toBe(null);
        });
    });
});
