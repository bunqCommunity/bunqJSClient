"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * First character becomes uppercase
 * @param {string} string
 * @returns {string}
 */
exports.ucfirst = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};
/**
 * Turns an arraybuffer into a valid binary string
 * @param {ArrayBuffer} arrayBuffer
 * @returns {string}
 */
exports.arrayBufferToString = arrayBuffer => {
    return new Uint8Array(arrayBuffer).reduce(function (data, byte) {
        return data + String.fromCharCode(byte);
    }, "");
};
/**
 * Turns bunq headers bakc to uppercase
 * @param {string} key
 * @returns {string}
 */
exports.fixHeaderCase = (key) => {
    // split by - character
    const headerParts = key.split("-");
    // add uppercase back since axios makes every header key lowercase
    const headerPartsFixed = headerParts.map(exports.ucfirst);
    // merge back to a string
    return headerPartsFixed.join("-");
};
