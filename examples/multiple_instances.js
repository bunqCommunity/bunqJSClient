require("dotenv").config();
const path = require("path");
const forge = require("node-forge");

const BunqJSClient = require("../dist/BunqJSClient").default;
const customStore = require("../dist/Stores/JSONFileStore").default;

const storageBasePath = `${__dirname}${path.sep}common${path.sep}`;

// used to cache data across sessions
const customStoreInstance = customStore(`${storageBasePath}storage-testdata.json`);
const sandboxAccountClient = new BunqJSClient(customStoreInstance);

/**
 * This example tests how multiple bunqJSClient instances can be run alongside eachother
 * by sharing the requestLimiterFactory object.
 *
 * This ensure that even when multiple clients do calls it won't hit the
 * rate limit which is set per IP address by bunq.
 */

/**
 * Renerate a random encryption key
 */
const generateRandomKey = keySize => {
    const key = forge.random.getBytesSync(keySize);
    return forge.util.bytesToHex(key);
};

/**
 * Quick setup wrapper with hardcoded sandbox options
 */
const setupInstance = async (apiKey, encryptionKey, name) => {
    const customStoreInstance = customStore(`${storageBasePath}storage-${name}.json`);
    const BunqClient = new BunqJSClient(customStoreInstance);

    // load and refresh bunq client
    await BunqClient.run(apiKey, [], "SANDBOX", encryptionKey).catch(exception => {
        throw exception;
    });
    // disable keep-alive since the server will stay online without the need for a constant active session
    BunqClient.setKeepAlive(false);
    // create/re-use a system installation
    await BunqClient.install();
    // create/re-use a device installation
    await BunqClient.registerDevice(process.env.DEVICE_NAME);
    // create/re-use a bunq session installation
    await BunqClient.registerSession();

    return BunqClient;
};

const getEvents = async (BunqClient, userId) => BunqClient.api.event.list(userId);

/**
 * Runs a test script on a single instance of the bunqJSClient
 */
const instanceApiTest = async BunqClient => {
    // get user info connected to this account
    const users = await BunqClient.getUsers(true);

    // get the direct user object
    const userInfo = users[Object.keys(users)[0]];

    // do multiple calls to test the rate limit for this instance
    await Promise.all([
        getEvents(BunqClient, userInfo.id),
        getEvents(BunqClient, userInfo.id),
        getEvents(BunqClient, userInfo.id),
        getEvents(BunqClient, userInfo.id),
        getEvents(BunqClient, userInfo.id)
    ]);
};

/**
 * Persistent api/encryption key creation stored in plain text
 */
const getSandboxKey = async name => {
    const storageKey = `apikey-${name}`;
    if (customStoreInstance.get(storageKey)) {
        return customStoreInstance.get(storageKey);
    }
    const apiKey = await sandboxAccountClient.api.sandboxUser.post();
    customStoreInstance.set(storageKey, apiKey);

    return apiKey;
};
const getEncryptionKey = async name => {
    const storageKey = `encryptionKey-${name}`;
    if (customStoreInstance.get(storageKey)) {
        return customStoreInstance.get(storageKey);
    }
    const randomEncryptionKey = generateRandomKey(32);
    customStoreInstance.set(storageKey, randomEncryptionKey);

    return randomEncryptionKey;
};

/**
 * Main example wrapper
 */
const example = async () => {
    // generate three sandbox keys
    const apiKey1 = await getSandboxKey("key1");
    const apiKey2 = await getSandboxKey("key2");
    const apiKey3 = await getSandboxKey("key3");
    const encryptionKey1 = await getEncryptionKey("key1");
    const encryptionKey2 = await getEncryptionKey("key2");
    const encryptionKey3 = await getEncryptionKey("key3");

    // setup the first bunqJSClient
    const BunqClient = await setupInstance(apiKey1, encryptionKey1, "client1");

    // get the factory for the first instance
    const requestLimitFactory = BunqClient.ApiAdapter.RequestLimitFactory;

    // create more clients
    const BunqClient2 = await setupInstance(apiKey2, encryptionKey2, "client2");
    const BunqClient3 = await setupInstance(apiKey3, encryptionKey3, "client3");

    /**
     * Overwrite the request limit factory with the single instance that already exists
     *
     * Commenting out these two lines should cause the rate limit to be reached.
     */
    BunqClient2.ApiAdapter.RequestLimitFactory = requestLimitFactory;
    BunqClient3.ApiAdapter.RequestLimitFactory = requestLimitFactory;

    // test all clients at the same time which should NOT cause the rate limit to fail
    await Promise.all([instanceApiTest(BunqClient), instanceApiTest(BunqClient2), instanceApiTest(BunqClient3)]);
};

example()
    .then(() => {})
    .catch(error => {
        console.log(error);
        if (error.response) {
            console.log(error.response.data);
        }
    })
    .finally(() => process.exit());
