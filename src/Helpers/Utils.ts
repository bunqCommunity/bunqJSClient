/**
 * First character becomes uppercase
 * @param {string} string
 * @returns {string}
 */
export const ucfirst = (string: string): string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

/**
 * Turns an arraybuffer into a valid binary string
 * @param {ArrayBuffer} arrayBuffer
 * @returns {string}
 */
export const arrayBufferToString = arrayBuffer => {
    return new Uint8Array(arrayBuffer).reduce(function(data, byte) {
        return data + String.fromCharCode(byte);
    }, "");
};

/**
 * Turns bunq headers bakc to uppercase
 * @param {string} key
 * @returns {string}
 */
export const fixHeaderCase = (key: string) => {
    // split by - character
    const headerParts = key.split("-");
    // add uppercase back since axios makes every header key lowercase
    const headerPartsFixed = headerParts.map(ucfirst);
    // merge back to a string
    return headerPartsFixed.join("-");
};
