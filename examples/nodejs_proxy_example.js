const RequestLimitFactory = require("../dist/RequestLimitFactory").default;

require("dotenv").config();

const setup = require("./setup_files/setup");

setup()
    .then(async BunqClient => {
        const getMonetaryAccounts = async userid => {
            return BunqClient.api.monetaryAccount.list(userid);
        };

        const getPayments = async (userid, monetaryaccountid) => {
            return BunqClient.api.payment.list(userid, monetaryaccountid);
        };

        // overwrite request limit factory with our own version which has proxy support
        BunqClient.ApiAdapter.RequestLimitFactory = new RequestLimitFactory([false, process.env.SOCKS5_PROXY_URL]);

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
            const accountId = activeAccounts[0][accountType].id;

            // get all payments for the first monetary account
            console.log(new Date());
            await Promise.all([
                getPayments(userInfo.id, accountId),
                getPayments(userInfo.id, accountId),
                getPayments(userInfo.id, accountId),
                getPayments(userInfo.id, accountId),
                getPayments(userInfo.id, accountId),
                getPayments(userInfo.id, accountId),
                getPayments(userInfo.id, accountId),
                getPayments(userInfo.id, accountId),
                getPayments(userInfo.id, accountId)
            ]);
            console.log(new Date());
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
