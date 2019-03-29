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
        console.log("\nCards: ", cards.length, "\n");

        const masterCardTypes = ["MASTERCARD", "MASTERCARD_VIRTUAL"];
        const masterCard = cards.find(card => {
            const cardKey = Object.keys(card)[0];
            const cardInfo = card[cardKey];

            return masterCardTypes.includes(cardInfo.type);
        });

        if (!masterCard) {
            console.log("No card found with type of:", masterCardTypes);
            return;
        }
        const cardKey = Object.keys(masterCard)[0];
        const masterCardInfo = masterCard[cardKey];

        const cvcResult = await requestCvcCode(userInfo.id, masterCardInfo.id);
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
