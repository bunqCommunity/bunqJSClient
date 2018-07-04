const BunqJSClient = require("@bunq-community/bunq-js-client").default;

// setup a custom store which works in a node environment
const customStore = require("./custom_store")(__dirname + "\\storage.json");

// your api details
const ENCRYPTION_KEY = "3c7a4d431a846ed33a3bb1b1fa9b5c26";
const API_KEY =
    "sandbox_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"; // replace with your sandbox API-key
const DEVICE_NAME = "NodeTest";
const ENVIRONMENT = "SANDBOX"; // OR you can use PRODUCTION
const PERMITTED_IPS = []; // empty array if you're not sure

const BunqClient = new BunqJSClient(customStore);

const setup = async () => {
    // load and refresh bunq client
    await BunqClient.run(
        API_KEY,
        PERMITTED_IPS,
        ENVIRONMENT,
        ENCRYPTION_KEY
    ).catch(exception => {
        throw exception;
    });

    // create/re-use a system installation
    await BunqClient.install().catch(error => {
        throw error.response.data;
    });

    // create/re-use a device installation
    await BunqClient.registerDevice(DEVICE_NAME).catch(error => {
        throw error.response.data;
    });

    // create/re-use a bunq session installation
    await BunqClient.registerSession().catch(error => {
        throw error.response.data;
    });
};

const getMonetaryAccounts = async userid => {
    // get accounts
    const accounts = await BunqClient.api.monetaryAccount
        .list(userid)
        .catch(error => {
            throw error;
        });

    return accounts;
};

const getPayments = async (userid, monetaryaccountid) => {
    // get payments
    const payments = await BunqClient.api.payment
        .list(userid, monetaryaccountid)
        .catch(error => {
            throw error;
        });

    return payments;
};

const getUsers = () => BunqClient.getUsers(true);

// run setup and get payments
setup()
    .then(async setup => {
        // get user info connected to this account
        const users = await getUsers();

        console.log("\nUsers");
        console.log(users);

        // get accounts list
        const accounts = await getMonetaryAccounts(users.UserPerson.id);

        console.log("\n\nAccounts");
        console.log(accounts);

        // filter on the status to get a list of the active accounts
        const activeAccounts = accounts.filter(account => {
            return (
                account.MonetaryAccountBank &&
                account.MonetaryAccountBank.status === "ACTIVE"
            );
        });

        // get all payments for the first monetary account
        const payments = await getPayments(
            users.UserPerson.id,
            activeAccounts[0].MonetaryAccountBank.id
        );

        // log payments to console
        console.log("\n\nPayments");
        console.log(payments);
        process.exit();
    })
    .catch(error => {
        console.log(error);
        process.exit();
    });
