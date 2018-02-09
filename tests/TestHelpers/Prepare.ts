import { createKeyPair, keyPairToPem } from "../../src/Crypto/Rsa";

export default async () => {
    try {
        // create a new keypair once and create pem strings
        const keyPair = await createKeyPair();
        const { publicKey, privateKey } = await keyPairToPem(keyPair);

        // store the values in the environment
        process.env.CI_PUBLIC_KEY_PEM = publicKey;
        process.env.CI_PRIVATE_KEY_PEM = privateKey;
    } catch (ex) {
        console.error(ex);
    }
};
