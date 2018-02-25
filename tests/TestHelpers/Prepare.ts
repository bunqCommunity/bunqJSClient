import { createKeyPair, keyPairToPem } from "../../src/Crypto/Rsa";

export default async () => {
    try {
        // create a new keypair once and create pem strings
        const keyPair = await createKeyPair(512);
        const { publicKey, privateKey } = await keyPairToPem(keyPair);

        // store the values in the environment
        process.env.CI_PUBLIC_KEY_PEM = publicKey;
        process.env.CI_PRIVATE_KEY_PEM = privateKey;
    } catch (error) {
        console.log("Fallback certs triggered");
        process.env.CI_PUBLIC_KEY_PEM = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCLnbVFMMx/EYORBz8FTkpCu7io
GGW1LUPPCeRKh9tuiI77RXzvXENdZEQsgz504W1Z8KzgwVrMr5rNy6/Gm/SVKB+W
Y/19zgS2AwiVqX9+3zp7aqYT6FS6FChOnWY72/PsyTue12UipoSjJTiNbwDnvPkd
b54KP6JJSRgXd1yDVwIDAQAB
-----END PUBLIC KEY-----`;
        process.env.CI_PRIVATE_KEY_PEM = `-----BEGIN RSA PRIVATE KEY-----
MIICXQIBAAKBgQCLnbVFMMx/EYORBz8FTkpCu7ioGGW1LUPPCeRKh9tuiI77RXzv
XENdZEQsgz504W1Z8KzgwVrMr5rNy6/Gm/SVKB+WY/19zgS2AwiVqX9+3zp7aqYT
6FS6FChOnWY72/PsyTue12UipoSjJTiNbwDnvPkdb54KP6JJSRgXd1yDVwIDAQAB
AoGAJYLR2S0rRFioSKbxv7MxMIzPKBql+O+YcF/v/jZSNnhqMgiRcJ4RW149EtiQ
R0bp4mhPinNoueXUacZ4C5yLMb5QL1WFiw0TO/s5q+cjMonqmTc68iIGsHzOPoAD
xzr4fbd9A3qPCawH3LIrjvTKsSrPZpWxPtiNa6Ix34J2dkECQQD62N3p5j4W8IiZ
SSYLH4llMPs1HHaLYfA6j/mzG4uekaV8w04KG5JxqfkYAy9FG3HrsSvY8jwKIgUx
68OV1MxVAkEAjnvoqbUTA4UZi9xo+ig4vw0Pl/4Fnx4FAFhQDjLbD3H4cLggigXs
3I1Omg6etgbe/65G4vkz1qVO6btdeMN8+wJANlj8I2wN8bxlbAiMJIbNps3o70Xe
bS5n9NgyulpycoWNvC04YDo/DT9NR6WQ/UEH+o+lN1isJ2ndhEZXVsQHDQJBAIR6
BLs1lrYhHL2Dcz+UAh7wf90r3AIzoSbO9bAd7LuRlhMHv4lVNQNjhv+KNFq+TLyh
R1tlpKMgFB0RjjjoWd0CQQDS+JYT6w36tKMlofEtsLvlou8h+SvlArDt+iMsl7+d
OuCxX3RBgdrZWtbREr4rCyNeKxjGezKHuCI/gXaVVJju
-----END RSA PRIVATE KEY-----`;
    }
};
