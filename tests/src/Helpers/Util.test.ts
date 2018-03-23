import { ucfirst } from "../../../src/Helpers/Utils";

const fakeGeolocation = {
    getCurrentPosition: callback => {
        callback({
            coords: {
                latitude: 1,
                longitude: 1
            }
        });
    }
};

describe("Util", () => {
    describe("#ucFirst()", () => {
        it("should turn the single character into uppercase", () => {
            const string = "a";
            expect(ucfirst(string) === "A");
        });

        it("should only turn the first character into uppercase", () => {
            const string = "az";
            expect(ucfirst(string) === "Az");
            const string2 = "aZ";
            expect(ucfirst(string2) === "AZ");
        });
    });

    // describe("#getGeoLocation()", () => {
    //     it("should work with our custom geolocation handler", async () => {
    //         const location = await getGeoLocation(fakeGeolocation);
    //         expect(location).toHaveProperty("longitude");
    //         expect(location).toHaveProperty("latitude");
    //     });
    //
    //     it("should throw an error since navigator.location isn't available", () => {
    //         getGeoLocation()
    //             .then(() => expect(false))
    //             .catch(() => expect(true));
    //     });
    // });
});
