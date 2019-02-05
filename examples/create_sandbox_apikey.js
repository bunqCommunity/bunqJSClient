// const BunqJSClient = require("@bunq-community/bunq-js-client").default;
const BunqJSClient = require("../dist/BunqJSClient").default;

// setup a custom store which works in a node environment
const customStore = require("./custom_store")(__dirname + "\\storage.json");

// setup a plain bunqjsclient
const BunqClient = new BunqJSClient(customStore);

const setup = async () => {
    const apiKey = await BunqClient.api.sandboxUser.post();

    return apiKey;
};

// run setup and get users
setup()
    .then(apiKey => {
        console.log(apiKey);
        process.exit();
    })
    .catch(error => {
        console.error(error);
        process.exit();
    });
