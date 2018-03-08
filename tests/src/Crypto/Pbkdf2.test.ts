import { derivePasswordKey } from "../../../src/Crypto/Pbkdf2";

const INPUT_STRING = "abcdefghijklmnopqrstuvwxyz1234567890";

describe("Pbkdf2", () => {
    describe("#derivePasswordKey()", () => {
        it("should return a valid object with key and iv hex values", async () => {
            const encryptionKeyData = await derivePasswordKey(
                INPUT_STRING,
                false,
                2500
            );
            expect(encryptionKeyData.salt).toBeDefined();
            expect(encryptionKeyData.salt.length).toBe(256);

            expect(encryptionKeyData.key).toBeDefined();
            expect(encryptionKeyData.key.length).toBe(32);
        });

        it("should return a valid object with key and iv hex values with default values", async () => {
            const encryptionKeyData = await derivePasswordKey(INPUT_STRING);
            expect(encryptionKeyData.salt).toBeDefined();
            expect(encryptionKeyData.salt.length).toBe(256);

            expect(encryptionKeyData.key).toBeDefined();
            expect(encryptionKeyData.key.length).toBe(32);
        });

        it("should return a valid object with key and iv hex values with a custom salt", async () => {
            const customSalt =
                "b9cac84b1c8c81d3c00cf3be4f9a78a327aff1139bb35053c4d4a90f05288376d47ffa30803548ff994d5863cdf2ae335a1bd527f170f26e24091aa2025b7a64dc5b6854304aa4d911ff778a76ccb254010c2286300a344743e72f767315897fdb19f0055b4e462cbced705d1c0cc404ce1b3a6dd3a34783f18407cdd5256c41";
            const encryptionKeyData = await derivePasswordKey(
                INPUT_STRING,
                customSalt
            );
            expect(encryptionKeyData.salt).toBeDefined();
            expect(encryptionKeyData.salt.length).toBe(256);

            expect(encryptionKeyData.key).toBeDefined();
            expect(encryptionKeyData.key.length).toBe(32);
        });

        it("should reject the promise when invalid options are given", async () => {
            derivePasswordKey(INPUT_STRING, false, -1200)
                .then(result => {
                    expect(true).toBeFalsy();
                })
                .catch(error => {
                    expect(true).toBeTruthy();
                });
        });
    });
});
