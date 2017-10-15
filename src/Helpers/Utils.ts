export type Coordinate = {
    latitude: number;
    longitude: number;
};
export type LocationCoords = {
    coords: Coordinate;
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
