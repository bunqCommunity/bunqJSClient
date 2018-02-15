import RequestLimitFactory from "../../src/RequestLimitFactory";
import RequestLimiter from "../../src/RequestLimiter";

describe("RequestLimiter", () => {

    describe("#wrapCallable()", () => {
        it("should create and return a new RequestLimiter", async () => {
            const factory = new RequestLimitFactory();

            const requestLimiter: RequestLimiter = factory.create(
                "/endpoint",
                "GET"
            );

            expect(requestLimiter).toBeInstanceOf(RequestLimiter);
        });
    });

});
