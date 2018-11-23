import { validateKey } from "../../../src/Crypto/Aes";
import Prepare from "../../TestHelpers/Prepare";

const INPUT_STRING = "c9f23cf4aadd693992965686278125ffe9e49acaf3e3a84d9f531212fc93f5f9";
const INVALID_INPUT_STRING = "Super secure but invalid aes key :(";

describe("Aes", () => {
    beforeAll(async done => {
        await Prepare();
        done();
    });

    describe("#validateKey()", () => {
        it("should return true", async () => {
            const hash = await validateKey(INPUT_STRING);

            expect(hash).toBeTruthy();
        });

        it("should return false", async () => {
            const hash = await validateKey(INVALID_INPUT_STRING);

            expect(hash).toBeFalsy();
        });
    });
});
