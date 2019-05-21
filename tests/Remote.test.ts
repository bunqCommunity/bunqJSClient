import BunqJSClient from "../src/BunqJSClient";
import { derivePasswordKey } from "../src/Crypto/Pbkdf2";
import CustomDb from "./TestHelpers/CustomDb";

describe("Sandbox API", () => {
    it("Should create a new API key", async () => {
        const app = new BunqJSClient(new CustomDb("remote-api-1"));

        const sandboxApiKey = await app.api.sandboxUser.post();

        expect(sandboxApiKey).not.toBeNull();
    });

    it(
        "Should do a single API call to the Sandbox Environment",
        async () => {
            const storage = new CustomDb("remote-api- 2", false);
            const app = new BunqJSClient(storage);

            // create the same encryption key each time
            let derivedData = await derivePasswordKey("some_random_password1234", "9db565a86448e8d48a98f5a284893aba");

            // grab only the key
            const encryptionKey: string = derivedData.key;
            expect(encryptionKey).not.toBeNull();

            // re-use sandbox key when possible
            let sandboxApiKey: string = await storage.get("SANDBOX_API_KEY");
            if (!sandboxApiKey) {
                sandboxApiKey = await app.api.sandboxUser.post();

                // store for re-use
                await storage.set("SANDBOX_API_KEY", sandboxApiKey);
            }

            // enforce real certification generation
            await app.run(sandboxApiKey, ["*"], "SANDBOX", encryptionKey, 2048, true);

            // install using the certificate
            const installResult = await app.install();
            expect(installResult).toBeTruthy();

            // register the device an actual certificate creation
            const deviceRegistrationResult = await app.registerDevice("bunqJSClientUnitTest", 2048, true);
            expect(deviceRegistrationResult).toBeTruthy();

            // create a new session
            const sessionRegistrationResult = await app.registerSession();
            expect(sessionRegistrationResult).toBeTruthy();

            // fetch user list
            const users = await app.api.user.list();
            expect(users).toHaveProperty("UserPerson");

            const userType = Object.keys(users)[0];
            const userInfo = users[userType];

            const monetaryAccounts = await app.api.monetaryAccount.list(userInfo.id);
            expect(monetaryAccounts).toHaveLength(1);
        },
        30000
    );
});
