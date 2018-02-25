export const installToken =
    "a4f9d888eea84f52722b9baf2f17c289d549edf6e0eccdbf868eb922be306fb6";
export const serverPublicKeyPem = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA2cKx+z2NbEapmQWvvov2
n0k699ZJmWn1yZulOfVeSfHKdGAVj4TlWwAJuvFmThgtHTp+PiJUxKsNUrHHcp+A
CY0mVH+6f19roBH/B4IS7H5fnXMnpf39IfPDw+hv17bKE+dnuhPuEcloG+LgEOgo
cjwEb18h5IR3dfbxBHXUce2i4wqfGakAzHumJbPb5XgMMYxng+fqV7uH34CpRpS0
4bzjuvkwMlRWQsIMUuOvcAjRoCMf1aViFd2+4sEm7RFlyux5PKkq72F\/GITirzlA
T7T22qrApKnZNPR9y0pGC13FFdx5lVszBNnsKyXDwqrzOsUONSFU+F6JRg6xqUoC
iQIDAQAB
-----END PUBLIC KEY-----`;

export default (success = true) => {
    const date = new Date();
    const dateTime = `${date.getFullYear()}-${date.getFullYear()}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.${date.getMilliseconds()}`;

    return success
        ? {
              status: 200,
              response: {
                  Response: [
                      {
                          Id: {
                              id: 4
                          }
                      },
                      {
                          Token: {
                              id: 134,
                              created: dateTime,
                              updated: dateTime,
                              token: installToken
                          }
                      },
                      {
                          ServerPublicKey: {
                              server_public_key: serverPublicKeyPem
                          }
                      }
                  ]
              }
          }
        : {
              status: 500,
              response: { error: "error description" }
          };
};
