import { ucfirst, fixHeaderCase } from "../../../src/Helpers/Utils";

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

    describe("#fixHeaderCase()", () => {
        it("should turn the lowercase variation into uppercase", () => {
            const badHeader = "x-bunq-test-variation";
            const goodHeader = "X-Bunq-Test-Variation";
            expect(fixHeaderCase(badHeader)).toBe(goodHeader);
        });
    });
});
