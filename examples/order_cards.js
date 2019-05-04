require("dotenv").config();

const setup = require("./setup_files/setup");

// Some functions are commented out so no accidental things happen such as a request of a new card or change of pincode

setup()
    .then(async BunqClient => {
        // get user info connected to this account
        const users = await BunqClient.getUsers();
        const userInfo = users[Object.keys(users)[0]];

        // list all monetary accounts
        const accounts = await BunqClient.api.monetaryAccount.list(userInfo.id);
        // grab the first monetary account
        const accountInfo = accounts[0][Object.keys(accounts[0])[0]];

        // grab alias list from the first monetary account
        const accountAliasList = accounts.map(account => {
            const accountInfo = account[Object.keys(account)[0]];
            return accountInfo.alias;
        });
        const firstAlias = accountAliasList[0][0];
        console.log(firstAlias);

        // list all allowed card names that can be set when ordering a card
        const allowedCardNameResponse = await BunqClient.api.cardName.get(userInfo.id);
        const allowedCardNames = allowedCardNameResponse[0].CardUserNameArray.possible_card_name_array;
        console.log(allowedCardNames);

        const cardOrderResult = await BunqClient.api.cardDebit.post(
            userInfo.id,
            // personal name
            allowedCardNames[0],
            // the line on the card
            "Card description",
            // initial alias for the card
            firstAlias,
            // card type
            "MAESTRO_MOBILE_NFC",
            [
                // assign PRIMARY, SECONDARY accounts
                {
                    type: "PRIMARY",
                    pin_code: "1337",
                    monetary_account_id: accountInfo.id
                }
            ]
        );
        console.log(cardOrderResult);
    })
    .catch(error => {
        if (error.response) {
            console.log(error.response.data);
        } else {
            console.log(error);
        }
    })
    .finally(() => process.exit());
