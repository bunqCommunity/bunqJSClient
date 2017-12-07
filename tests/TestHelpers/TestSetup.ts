import BunqJSClient from "../../src/BunqJSClient";
import CustomDb from "./CustomDb";

const fakeApiKey =
    "0d873607f6f84f12bd0d873607f6f84f12bd0d873607f6f84f12bd111111111f";
const fakeEncryptionKey = "3c7a4d431a846ed33a3bb1b1fa9b5c26";

export default async (moxios, name = "default") => {
    const app = new BunqJSClient(new CustomDb(name));

    await app.run(fakeApiKey, [], "SANDBOX", fakeEncryptionKey);

    return app;
};
