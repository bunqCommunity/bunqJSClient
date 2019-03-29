require("dotenv").config();

const setup = require("./setup_files/setup");

setup()
    .then(async BunqClient => {
        const getCardNames = async userid => {
            const cardNames = await BunqClient.api.cardName.get(userid).catch(error => {
                throw error;
            });
            return cardNames;
        };
        const getMonetaryAccounts = async userid => {
            const accounts = await BunqClient.api.monetaryAccount.list(userid).catch(error => {
                throw error;
            });
            return accounts;
        };

        const getPayments = async (userid, monetaryaccountid) => {
            const payments = await BunqClient.api.payment.list(userid, monetaryaccountid).catch(error => {
                throw error;
            });
            return payments;
        };

        // get user info connected to this account
        const users = await BunqClient.getUsers(true);

        // get the direct user object
        const userInfo = users[Object.keys(users)[0]];
        console.log("\nUsers: ", Object.keys(users).length);

        // get accounts list
        const accounts = await getMonetaryAccounts(userInfo.id);
        console.log("\nAccounts: ", accounts.length);

        // get card names list
        const cardNames = await getCardNames(userInfo.id);
        console.log("\nPossible card Names: ", cardNames[0].CardUserNameArray);

        // filter on the status to get a list of the active accounts
        const activeAccounts = accounts.filter(account => {
            if (account.MonetaryAccountBank) {
                return account.MonetaryAccountBank.status === "ACTIVE";
            }
            if (account.MonetaryAccountJoint) {
                return account.MonetaryAccountJoint.status === "ACTIVE";
            }
            if (account.MonetaryAccountSavings) {
                return account.MonetaryAccountSavings.status === "ACTIVE";
            }
            return false;
        });

        if (activeAccounts.length > 0) {
            const accountType = Object.keys(activeAccounts[0])[0];

            // get all payments for the first monetary account
            const payments = await getPayments(userInfo.id, activeAccounts[0][accountType].id);

            // log payments to console
            console.log("\nPayments: ", payments.length, "\n");
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
