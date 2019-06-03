require("dotenv").config();

const setup = require("./common/setup");

setup()
    .then(async BunqClient => {
        const getMonetaryAccounts = async userid => {
            return BunqClient.api.monetaryAccount.list(userid);
        };
        const getPayments = async (userid, monetaryaccountid) => {
            return BunqClient.api.payment.list(userid, monetaryaccountid);
        };

        // get user info connected to this account
        const users = await BunqClient.getUsers(true);

        // get the direct user object
        const userInfo = users[Object.keys(users)[0]];
        console.log("\nUsers: ", Object.keys(users).length);

        // get accounts list
        const accounts = await getMonetaryAccounts(userInfo.id);
        console.log("\nAccounts: ", accounts.length);

        // filter on the status to get a list of the active accounts
        const activeAccounts = accounts.filter(account => {
            // get the account type for this account
            const accountType = Object.keys(account)[0];

            return account[accountType].status === "ACTIVE";
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
        console.log(error);
        if (error.response) {
            console.log(error.response.data);
        }
    })
    .finally(() => process.exit());
