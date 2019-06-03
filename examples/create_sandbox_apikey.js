const BunqJSClient = require("../dist/BunqJSClient").default;

// setup a custom store which works in a node environment
const customStoreImport = require("../dist/Stores/JSONFileStore").default;
const customStore = customStoreImport(__dirname + "/common/storage.json");

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
        console.log(error);
        if (error.response) {
            console.log(error.response.data);
        }
    })
    .finally(() => process.exit());
