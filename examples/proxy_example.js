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

        // enable proxy support
        BunqClient.setRequestProxies([false, process.env.SOCKS5_PROXY_URL]);

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
            const accountId = activeAccounts[0][accountType].id;

            // get all payments for the first monetary account
            console.log("\nStart WITH proxy:");
            const withProxyStart = new Date();
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
            const withProxyDuration = new Date().getTime() - withProxyStart.getTime();
            console.log(`${withProxyDuration.toLocaleString()}ms duration`);

            console.log("\nSetting default connection proxy (none)");
            // enable proxy support
            BunqClient.setRequestProxies([false]);

            console.log("Waiting 4s to reset the rate limit to reset");
            await new Promise(resolve => setTimeout(resolve, 4000));

            // get all payments for the first monetary account
            console.log("\nStart regular:");
            const noProxyStart = new Date();
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
            const noProxyDuration = new Date().getTime() - noProxyStart.getTime();
            console.log(`${noProxyDuration.toLocaleString()}ms duration`);
        }
    })
    .catch(error => {
        console.log(error);
        if (error.response) {
            console.log(error.response.data);
        }
    })
    .finally(() => process.exit());
