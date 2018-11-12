require("dotenv").config();

// const BunqJSClient = require("@bunq-community/bunq-js-client").default;
const BunqJSClient = require("../dist/BunqJSClient").default;

// setup a custom store which works in a node environment
const customStore = require("./custom_store")(__dirname + "\\storage.json");

/**
 * Permitted IPs
 * When you set your current IP address followed by a "*" you will enable
 * wildcard mode for that session. You should usually let the user set
 * this manually in the app but it is possible.
 *
 * Leave the array empty if you're not sure and bunq will register the IP
 * used to send the request
 */
const PERMITTED_IPS = [];

// Wildcard example
// const PERMITTED_IPS = ["1.2.3.4", "*"];

const BunqClient = new BunqJSClient(customStore);

const defaultErrorLogger = error => {
    if (error.response) {
        throw error.response.data;
    }
    throw error;
};

const setup = async () => {
    // load and refresh bunq client
    await BunqClient.run(process.env.API_KEY, PERMITTED_IPS, process.env.ENVIRONMENT, process.env.ENCRYPTION_KEY).catch(
        exception => {
            throw exception;
        }
    );

    // disable keepalive since the server will be online a lot
    // without needing a constantly active session
    BunqClient.setKeepAlive(false);

    // create/re-use a system installation
    await BunqClient.install().catch(defaultErrorLogger);

    // create/re-use a device installation
    await BunqClient.registerDevice(process.env.DEVICE_NAME).catch(defaultErrorLogger);

    // create/re-use a bunq session installation
    await BunqClient.registerSession().catch(defaultErrorLogger);
};

const getMonetaryAccounts = async userid => {
    // get accounts
    const accounts = await BunqClient.api.monetaryAccount.list(userid).catch(error => {
        throw error;
    });

    return accounts;
};

const getPayments = async (userid, monetaryaccountid) => {
    // get payments
    const payments = await BunqClient.api.payment.list(userid, monetaryaccountid).catch(error => {
        throw error;
    });

    return payments;
};

const getUsers = () => BunqClient.getUsers(true);

// run setup and get payments
setup()
    .then(async () => {
        // get user info connected to this account
        const users = await getUsers();

        // get the direct user object
        const userInfo = users[Object.keys(users)[0]];

        console.log("\nUsers: ", Object.keys(users).length, "\n");

        // get accounts list
        const accounts = await getMonetaryAccounts(userInfo.id);

        console.log("\nAccounts: ", accounts.length, "\n");

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

        process.exit();
    })
    .catch(error => {
        console.log(error);
        process.exit();
    });
