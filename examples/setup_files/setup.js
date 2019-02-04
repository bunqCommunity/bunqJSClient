require("dotenv").config();
const path = require("path");

const BunqJSClient = require("../../dist/BunqJSClient").default;

// setup a custom store which works in a node environment
const customStore = require("../../dist/Stores/JSONFileStore").default;

const defaultErrorLogger = error => {
    if (error.response) {
        throw error.response.data;
    }
    throw error;
};

const permittedIps = process.env.PERMITTED_IPS ? process.env.PERMITTED_IPS.split(",") : [];

// the basic setup function
const setup = async () => {
    // setup a new store instance
    const customStoreInstance = customStore(`${__dirname}${path.sep}storage.json`);

    // setup a bunqClient
    const BunqClient = new BunqJSClient(customStoreInstance);

    // load and refresh bunq client
    await BunqClient.run(process.env.API_KEY, permittedIps, process.env.ENVIRONMENT, process.env.ENCRYPTION_KEY).catch(
        exception => {
            throw exception;
        }
    );

    // disable keep-alive since the server will stay online without the need for a constant active session
    BunqClient.setKeepAlive(false);

    // create/re-use a system installation
    await BunqClient.install().catch(defaultErrorLogger);

    // create/re-use a device installation
    await BunqClient.registerDevice(process.env.DEVICE_NAME).catch(defaultErrorLogger);

    // create/re-use a bunq session installation
    await BunqClient.registerSession().catch(defaultErrorLogger);

    return BunqClient;
};

module.exports = setup;
