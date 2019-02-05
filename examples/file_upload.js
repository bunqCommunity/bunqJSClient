require("dotenv").config();
const fs = require("fs");
const path = require("path");

const setup = require("./setup_files/setup");

setup()
    .then(async BunqClient => {
        // get the image contents
        const file = fs.readFileSync(`${__dirname}${path.sep}setup_files${path.sep}Ali-Niknam-50x50.jpg`);

        // attempt to upload the file
        const imageUuid = await BunqClient.api.attachmentPublic.post(file, "image/jpeg");
        console.log("Image UUID", imageUuid, "\n");

        // fetch the image contents of the newly updated image
        const imageContents = await BunqClient.api.attachmentContent.get(imageUuid, { base64: false });
        console.log("Image private contents\n", imageContents, "\n");

        // write to dist folder to prevent git inclusion, check the results there
        fs.writeFileSync(`${__dirname}${path.sep}..${path.sep}Ali-Niknam-50x50-private-result.jpg`, imageContents);

        // post the imageUuid to turn it into a public avatar
        const avatarUuid = await BunqClient.api.avatar.post(imageUuid);
        console.log("Public avatar UUID", avatarUuid, "\n");
    })
    .catch(error => {
        if (error.response) {
            console.log(error.response.data);
        } else {
            console.log(error);
        }
    })
    .finally(() => process.exit());
