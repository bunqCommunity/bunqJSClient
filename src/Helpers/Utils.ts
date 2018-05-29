import Coordinate from "../Types/Coordinate";
import LocationCoords from "../Types/LocationCoords";

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
    return String.fromCharCode.apply(null, new Uint8Array(arrayBuffer));
};

/**
 * Requests permision for location and
 * @param {boolean|any} geoLocationHandler
 * @returns {Promise<{latitude: string; longitude: string}>}
 */
// export const getGeoLocation = async (geoLocationHandler: any = false) => {
//     if (
//         geoLocationHandler !== false ||
//         (navigator !== undefined && navigator.geolocation !== undefined)
//     ) {
//         const handler =
//             geoLocationHandler === false
//                 ? navigator.geolocation
//                 : geoLocationHandler;
//
//         const location: Coordinate = await new Promise<Coordinate>(resolve => {
//             handler.getCurrentPosition((location: LocationCoords) => {
//                 resolve(location.coords);
//             });
//         });
//
//         const latitude: number = location.latitude;
//         const longitude: number = location.longitude;
//
//         return {
//             latitude: ("" + latitude).substring(0, 5),
//             longitude: ("" + longitude).substring(0, 5)
//         };
//     }
//
//     throw new Error("Failed to get location, no valid geolocation available");
// };
