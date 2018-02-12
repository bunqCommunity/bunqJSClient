const crypto = require("crypto");

export const randomHex = len => {
    return crypto
        .randomBytes(Math.ceil(len / 2))
        .toString("hex")
        .slice(0, len);
};
