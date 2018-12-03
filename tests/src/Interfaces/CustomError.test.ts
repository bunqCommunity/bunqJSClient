import CustomError from "../../../src/Interfaces/CustomError";

describe("CustomError", () => {
    describe("#constructor()", () => {
        it("extends the Error object", () => {
            expect(() => {
                const error = new CustomError("something went wrong!");

                throw error;
            }).toThrow(CustomError);
        });

        it("has custom properties", () => {
            const CUSTOM_ERROR_CODE = "CUSTOM_ERROR_CODE";
            const error = new CustomError("something went wrong!", { responsePropety: "yes" }, CUSTOM_ERROR_CODE);

            expect(() => {
                throw error;
            }).toThrow(CustomError);

            expect(error).toHaveProperty("name");
            expect(error).toHaveProperty("message");
            expect(error).toHaveProperty("stack");
            expect(error).toHaveProperty("response");
            expect(error).toHaveProperty("errorCode");
        });
    });
});
