require("dotenv").config();

const setup = require("./common/setup");

const getObject = object => {
    const objectKeys = Object.keys(object);
    const objectKey = objectKeys[0];

    return object[objectKey];
};

// Some functions are commented out so no accidental things happen such as a request of a new card or change of pincode

setup()
    .then(async BunqClient => {
        // get user info connected to this account
        const users = await BunqClient.getUsers(true);
        const userInfo = users[Object.keys(users)[0]];

        // list all monetary accounts
        const accounts = await BunqClient.api.monetaryAccount.list(userInfo.id);

        // list all cards
        const cards = await BunqClient.api.card.list(userInfo.id);
        const card = getObject(cards[Object.keys(cards)[0]]);

        let cardId = card["id"];

        let mainAccountId = getObject(accounts[0])["id"];
        let secondAccountId = getObject(accounts[1])["id"]; // Assumes user has at least 2 monetary accounts
        const assign = [
            {
                type: "PRIMARY",
                //pin_code: "1334", // Not mandatory
                monetary_account_id: secondAccountId
            }
        ];

        // Activate card
        // STATUS: Untested
        // const mainAccount = await BunqClient.api.monetaryAccount.get(userInfo.id, mainAccountId);
        // const testAccount = await BunqClient.api.monetaryAccount.get(userInfo.id, secondAccountId);
        // let mainAlias = {
        //     type: mainAccount.MonetaryAccountBank.alias[0].type,
        //     value: mainAccount.MonetaryAccountBank.alias[0].value,
        //     name: mainAccount.MonetaryAccountBank.alias[0].name
        // };
        // let testAlias = {
        //     type: testAccount.MonetaryAccountBank.alias[0].type,
        //     value: testAccount.MonetaryAccountBank.alias[0].value,
        //     name: testAccount.MonetaryAccountBank.alias[0].name
        // };
        //
        // const activate = await BunqClient.api.card.update(userInfo.id, cardId, null, activationCode);
        // console.log("\nActivation: ", activate, "\n");

        // Check if activated card
        // STATUS: Tested on production
        const activatedCard = await BunqClient.api.card.get(userInfo.id, cardId).catch(error => {
            throw error;
        });
        console.log("\nCard: ", getObject(activatedCard[0])["status"], "\n");

        // Change pinCode
        // STATUS: Does not respond with succes or an error if too simple (pinassignment works for changing pincode)
        // const pinCode = await BunqClient.api.card.update(userInfo.id, cardId, "1234")
        // console.log("\nPinCode: ", pinCode, "\n");

        // Change card assignment
        // STATUS: Tested on production
        const assignment = await BunqClient.api.card.update(
            userInfo.id,
            cardId,
            null,
            null,
            null,
            null,
            null,
            null,
            assign
        );
        console.log("\nAssignment: ", getObject(assignment[0])["pin_code_assignment"], "\n");

        // New card limit
        // STATUS: tested on production
        // NOTE: This overides limit:CARD_LIMIT_POS_ICC
        const limit = await BunqClient.api.card.update(userInfo.id, cardId, null, null, null, {
            value: "45.00",
            currency: "EUR"
        });
        console.log("\nCard limit: ", getObject(limit[0])["card_limit"], "\n");

        // Set ATM limit
        // STATUS: tested on production
        const atmLimit = await BunqClient.api.card.update(userInfo.id, cardId, null, null, null, null, {
            value: "50.00",
            currency: "EUR"
        });
        console.log("\nATM limit:", getObject(atmLimit[0])["card_limit_atm"]);

        // Card name check, before request card
        // STATUS: tested on production
        const names = await BunqClient.api.cardName.get(userInfo.id);
        const possible_names = getObject(names[Object.keys(names)[0]])["possible_card_name_array"];

        // Card Debit
        // STATUS: tested on production
        const cardHolder = "CardHolder";

        if (possible_names.includes(cardHolder)) {
            // const newCard = await BunqClient.api.cardDebit.post(
            // 	userInfo.id,
            // 	cardHolder, // Must match available names on endpoint card-name
            // 	"Description",
            // 	mainAlias,
            // 	"MAESTRO",
            // 	assign
            // );
            // console.log("\nNew card: ", newCard, "\n");
        } else {
            console.log("Name on card is not valid, choose one of the following:\n", possible_names);
        }
    })
    .catch(error => {
        if (error.response) {
            console.log(error.response.data);
        } else {
            console.log(error);
        }
    })
    .finally(() => process.exit());
