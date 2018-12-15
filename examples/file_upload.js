const fs = require("fs");
require("dotenv").config();

const BunqJSClient = require("../dist/BunqJSClient.js").default;
const customStore = require("./custom_store")(__dirname + "\\storage.json");

const PERMITTED_IPS = [];
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

    BunqClient.setKeepAlive(false);
    await BunqClient.install().catch(defaultErrorLogger);
    await BunqClient.registerDevice(process.env.DEVICE_NAME).catch(defaultErrorLogger);
    await BunqClient.registerSession().catch(defaultErrorLogger);
};

// run setup and get payments
setup()
    .then(async () => {
        // get the image contents
        const file = fs.readFileSync(__dirname + "/Ali-Niknam-50x50.jpg");

        // attempt to upload the file
        const imageUuid = await BunqClient.api.attachmentPublic.post(file, "image/jpeg");

        console.log("Image UUID", imageUuid, "\n");

        const imageContents = await BunqClient.api.attachmentContent.get(imageUuid, { base64: false });

        console.log("Image private contents",imageContents, "\n");

        // write to dist folder to prevent git inclusion, check the results there
        fs.writeFileSync(__dirname + "/../dist/Ali-Niknam-50x50-private-result.jpg", imageContents);

        const avatarUuid = await BunqClient.api.avatar.post(imageUuid);

        console.log("Public avatar UUID", avatarUuid, "\n");

        process.exit();
    })
    .catch(error => {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.statusMessage);
            console.log(error.response.data);
        } else {
            console.log(error);
        }
        process.exit();
    });
