import { validateKey, encryptString, decryptString } from "../../../src/Crypto/Aes";
import Prepare from "../../TestHelpers/Prepare";

const INPUT_KEY = "c9f23cf4aadd693992965686278125ffe9e49acaf3e3a84d9f531212fc93f5f9";
const INPUT_KEY2 = "d9f23cf4aadd693992965686278125ffe9e49acaf3e3a84d9f531212fc92f4f8";
const INVALID_INPUT_STRING = "Super secure but invalid aes key :(";

describe("Aes", () => {
    beforeAll(async done => {
        await Prepare();
        done();
    });

    describe("#validateKey()", () => {
        it("should return true", async () => {
            const hash = await validateKey(INPUT_KEY);

            expect(hash).toBeTruthy();
        });

        it("should return false", async () => {
            const hash = await validateKey(INVALID_INPUT_STRING);

            expect(hash).toBeFalsy();
        });
    });

    describe("#decryptString()", () => {
        it("should decrypt the value", async () => {
            // encrypt a string
            const { iv, key, encryptedString } = await encryptString("INPUT_STRING", INPUT_KEY);

            // attempt to decrypt it again
            const decryptedString = await decryptString(encryptedString, key, iv);

            expect(decryptedString).toBe("INPUT_STRING");
        });

        it("should have no result on invalid key the value", async () => {
            // encrypt a string
            const { iv, encryptedString } = await encryptString("INPUT_STRING", INPUT_KEY);

            return decryptString(encryptedString, INPUT_KEY2, iv)
                .then(() => expect(true).toBe("SHOULD FAIL"))
                .catch(() => expect(true).toBeTruthy());
        });
    });
});
