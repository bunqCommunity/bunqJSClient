require("dotenv").config();

const setup = require("./setup_files/setup");

setup()
    .then(async BunqClient => {
        const requestCvcCode = (userid, cardId, type = "GENERATED") => {
            return BunqClient.api.cardCvc2.post(userid, cardId, type);
        };

        // get user info connected to this account
        const users = await BunqClient.getUsers(true);
        console.log("\nUsers: ", Object.keys(users).length, "\n");

        // get the direct user object
        const userInfo = users[Object.keys(users)[0]];

        const cards = await BunqClient.api.card.list(userInfo.id);
        console.log("\nCards: ", Object.keys(cards).length, "\n");

        const cvcResult = await requestCvcCode(userInfo.id, 227468);
        console.log(cvcResult);
    })
    .catch(error => {
        if (error.response) {
            console.log(error.response.data);
        } else {
            console.log(error);
        }
    })
    .finally(() => process.exit());
