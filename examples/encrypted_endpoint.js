require("dotenv").config();

const BunqJSClient = require("../dist/BunqJSClient").default;
const customStore = require("./custom_store")(__dirname + "\\storage.json");

const PERMITTED_IPS = [];

const BunqClient = new BunqJSClient(customStore);

const setup = async () => {
    await BunqClient.run(process.env.API_KEY, PERMITTED_IPS, process.env.ENVIRONMENT, process.env.ENCRYPTION_KEY);
    BunqClient.setKeepAlive(false);
    await BunqClient.install();
    await BunqClient.registerDevice(process.env.DEVICE_NAME);
    await BunqClient.registerSession();
};

const getUsers = () => BunqClient.getUsers(true);

const getCardList = userid => {
    return BunqClient.api.card.list(userid);
};

const requestCvcCode = (userid, cardId, type = "GENERATED") => {
    return BunqClient.api.cardCvc2.post(userid, cardId, type);
};

// run setup and get payments
setup()
    .then(async () => {
        // get user info connected to this account
        const users = await getUsers();
        console.log("\nUsers: ", Object.keys(users).length, "\n");

        // get the direct user object
        const userInfo = users[Object.keys(users)[0]];

        const cards = await getCardList(userInfo.id);
        console.log("\nCards: ", Object.keys(cards).length, "\n");

        const cvcResult = await requestCvcCode(userInfo.id, 227468);
        console.log(cvcResult);

        process.exit();
    })
    .catch(error => {
        if (error.response) {
            console.log(error.response.request._header);
            console.log(error.response.data);
        } else {
            console.log(error);
        }
        process.exit();
    });
