require("dotenv").config();

const BunqJSClient = require("../dist/BunqJSClient").default;
const customStore = require("./custom_store")(__dirname + "\\storage.json");

const PERMITTED_IPS = [];

const BunqClient = new BunqJSClient(customStore);

const defaultErrorLogger = error => {
    if (error.response) {
        console.log(error.response.data);
        console.log(error.request._header);
        // console.log(Object.keys(error.request));
    }
    process.exit();
};

const setup = async () => {
    await BunqClient.run(process.env.API_KEY, PERMITTED_IPS, process.env.ENVIRONMENT, process.env.ENCRYPTION_KEY);
    BunqClient.setKeepAlive(false);
    await BunqClient.install();
    await BunqClient.registerDevice(process.env.DEVICE_NAME);
    await BunqClient.registerSession();
};

const requestCvcCode = (userid, cardId, type = "GENERATED") => {
    return BunqClient.api.cardCvc2.post(userid, cardId, type);
};

// run setup and get payments
setup()
    .then(async () => {
        const cvcResult2 = await requestCvcCode(3059, 198);
        process.exit();
    })
    .catch(defaultErrorLogger);
