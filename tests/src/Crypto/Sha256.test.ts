import {
    signString,
    stringToHash,
    verifyString
} from "../../../src/Crypto/Sha256";
import { privateKeyFromPem, publicKeyFromPem } from "../../../src/Crypto/Rsa";
import Prepare from "../../TestHelpers/Prepare";

const INPUT_STRING = "abcdefghijklmnopqrstuvwxyz1234567890";

describe("Sha256", () => {
    beforeAll(async done => {
        await Prepare();
        done();
    });

    describe("#stringToHash()", () => {
        it("should not return the original string", async () => {
            const hash = await stringToHash(INPUT_STRING);

            expect(hash).not.toBe(INPUT_STRING);
        });

        it("should return a valid hash", async () => {
            const hash = await stringToHash(INPUT_STRING);

            expect(hash).toBe(
                "77d721c817f9d216c1fb783bcad9cdc20aaa2427402683f1f75dd6dfbe657470"
            );
        });
    });

    describe("#signString ()", () => {
        it("should sign data without errors", async () => {
            const PRIVATE_KEY = await privateKeyFromPem(
                process.env.CI_PRIVATE_KEY_PEM
            );

            await signString(INPUT_STRING, PRIVATE_KEY);
        });
    });

    describe("#verifyString()", () => {
        // TODO enable when verifyString functionality is fixed properly
        // it("should verify data without errors and validate the data", async () => {
        //     const PUBLIC_KEY = await publicKeyFromPem(
        //         process.env.CI_PUBLIC_KEY_PEM
        //     );
        //     const PRIVATE_KEY = await privateKeyFromPem(
        //         process.env.CI_PRIVATE_KEY_PEM
        //     );
        //
        //     // sign a string with our private key
        //     const signature = await signString(INPUT_STRING, PRIVATE_KEY);
        //
        //     // check if the original data and signature match
        //     const valid = await verifyString(
        //         INPUT_STRING,
        //         PUBLIC_KEY,
        //         signature
        //     );
        //
        //     expect(valid).toBeTruthy();
        // });

        it("should return false if the signature doesn't match", async () => {
            const PUBLIC_KEY = await publicKeyFromPem(
                process.env.CI_PUBLIC_KEY_PEM
            );
            const PRIVATE_KEY = await privateKeyFromPem(
                process.env.CI_PRIVATE_KEY_PEM
            );

            // sign a string with our private key
            const signedData = await signString(INPUT_STRING, PRIVATE_KEY);

            // check if different data and signature match
            const valid = await verifyString(
                "1234",
                PUBLIC_KEY,
                signedData
            );

            expect(valid).toBeFalsy();
        });

        it("should return false when invalid keys or data is given", async () => {
            const PUBLIC_KEY = await publicKeyFromPem(
                process.env.CI_PUBLIC_KEY_PEM
            );
            const PRIVATE_KEY = await privateKeyFromPem(
                process.env.CI_PRIVATE_KEY_PEM
            );

            // sign a string with our private key
            const signedData = await signString(INPUT_STRING, PRIVATE_KEY);

            // check if different data and signature match
            const valid = await verifyString(
                INPUT_STRING,
                PUBLIC_KEY,
                signedData + "asdf" // change data to be invalid
            );

            expect(valid).toBeFalsy();
        });
    });
});
