const fs = require("fs");
require("dotenv").config();

// const BunqJSClient = require("@bunq-community/bunq-js-client").default;
const BunqJSClient = require("../src/BunqJSClient.ts").default;

// setup a custom store which works in a node environment
const customStore = require("./custom_store")(__dirname + "\\storage.json");

/**
 * Permitted IPs
 * When you set your current IP address followed by a "*" you will enable
 * wildcard mode for that session. You should usually let the user set
 * this manually in the app but it is possible.
 *
 * Leave the array empty if you're not sure and bunq will register the IP
 * used to send the request
 */
const PERMITTED_IPS = ["*"];

const BunqClient = new BunqJSClient(customStore);

const defaultErrorLogger = error => {
    if (error.response) {
        throw error.response.data;
    }
    throw error;
};

const setup = async () => {
    // load and refresh bunq client
    await BunqClient.run(process.env.API_KEY, PERMITTED_IPS, process.env.ENVIRONMENT, process.env.ENCRYPTION_KEY).catch(
        exception => {
            throw exception;
        }
    );

    // disable keepalive since the server will be online a lot
    // without needing a constantly active session
    BunqClient.setKeepAlive(false);

    // create/re-use a system installation
    await BunqClient.install().catch(defaultErrorLogger);

    // create/re-use a device installation
    await BunqClient.registerDevice(process.env.DEVICE_NAME).catch(defaultErrorLogger);

    // create/re-use a bunq session installation
    await BunqClient.registerSession().catch(defaultErrorLogger);
};

// run setup and get payments
setup()
    .then(async () => {
        const file = fs.readFileSync(__dirname + "/../dist/input.png");

        const result = await BunqClient.api.attachmentPublic.post(file, "image/png");
        // const file = fs.readFileSync(__dirname + "/../dist/input-jpg.jpeg");
        // const result = await BunqClient.api.attachmentPublic.post(file, "image/jpeg");

        const imageUuid = result.Response[0].Uuid.uuid

        console.log(result.Response);

        const imageContents = await BunqClient.api.attachmentContent.get(imageUuid);
        console.log(imageContents);



        console.log("Success");

        process.exit();
    })
    .catch(error => {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.statusMessage);
            console.log(error.response.data);
        } else {
            console.log(error);
        }
        process.exit();
    });
