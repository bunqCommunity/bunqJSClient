require("dotenv").config();

// const BunqJSClient = require("@bunq-community/bunq-js-client").default;
const BunqJSClient = require("../dist/BunqJSClient").default;

// setup a custom store which works in a node environment
const customStore = require("./custom_store")(__dirname + "\\storage.json");

// your api details
const PERMITTED_IPS = []; // empty array if you're not sure

const BunqClient = new BunqJSClient(customStore);

const defaultErrorLogger = error => {
    if (error.response) {
        throw error.response.data;
    }
    throw error;
};

const setup = async () => {
    // load and refresh bunq client
    await BunqClient.run(
        process.env.API_KEY,
        PERMITTED_IPS,
        process.env.ENVIRONMENT,
        process.env.ENCRYPTION_KEY
    ).catch(exception => {
        throw exception;
    });

    // disable keepalive since the server will be online a lot
    // without needing a constantly active session
    BunqClient.setKeepAlive(false);

    // create/re-use a system installation
    await BunqClient.install().catch(defaultErrorLogger);

    // create/re-use a device installation
    await BunqClient.registerDevice(process.env.DEVICE_NAME).catch(
        defaultErrorLogger
    );

    // create/re-use a bunq session installation
    await BunqClient.registerSession().catch(defaultErrorLogger);
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

        // console.log("\nUsers");
        // console.log(users);

        // get accounts list
        const accounts = await getMonetaryAccounts(users.UserPerson.id);

        // console.log("\n\nAccounts");
        // console.log(accounts);

        // filter on the status to get a list of the active accounts
        const activeAccounts = accounts.filter(account => {
            if (account.MonetaryAccountBank) {
                return account.MonetaryAccountBank.status === "ACTIVE";
            }
            if (account.MonetaryAccountJoint) {
                return account.MonetaryAccountJoint.status === "ACTIVE";
            }
            return false;
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
