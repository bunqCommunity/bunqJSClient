const BunqJSClient = require("@bunq-community/bunq-js-client").default;

// an example storage solution which implements the required get/set/remove functions
const JSONStore = require("json-store");

// create a storage object
const LocalStorage = JSONStore(__dirname + "\\storage.json");

const ENCRYPTION_KEY = "3c7a4d431a846ed33a3bb1b1fa9b5c26";
const API_KEY = "sandbox_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"; // replace with your sandbox API-key
const DEVICE_NAME = "NodeTest";
const ENVIRONMENT = "SANDBOX"; // OR you can use PRODUCTION
const PERMITTED_IPS = []; // empty array if you're not sure

BunqClient = new BunqJSClient(LocalStorage);

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

    // register a new session
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

// shortcut to fetch the BunqJSClient users
const getUsers = () => BunqClient.getUsers(true);

// run setup and get payments
setup()
    .then(async setup => {
        const users = await getUsers();

        getMonetaryAccounts(users.UserPerson.id)
            .then(async accounts => {
                getPayments(
                    users.UserPerson.id,
                    accounts[0].MonetaryAccountBank.id
                )
                    .then(async payments => {
                        // log payments to console
                        console.log(payments);
                        process.exit();
                    })
                    .catch(error => {
                        console.log(error);
                        process.exit();
                    });
            })
            .catch(error => {
                console.log(error);
                process.exit();
            });
    })
    .catch(error => {
        console.log(error);
        process.exit();
    });
