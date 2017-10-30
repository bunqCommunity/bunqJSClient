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
 * Requests permision for location and
 * @returns {Promise.<*>}
 */
export const getGeoLocation = async () => {
    if (navigator.geolocation) {
        const location: Coordinate = await new Promise<Coordinate>(resolve => {
            navigator.geolocation.getCurrentPosition(
                (location: LocationCoords) => {
                    resolve(location.coords);
                }
            );
        });

        const latitude: number = location.latitude;
        const longitude: number = location.longitude;

        return {
            latitude: ("" + latitude).substring(0, 5),
            longitude: ("" + longitude).substring(0, 5)
        };
    }
    throw new Error("Failed to get location");
};
