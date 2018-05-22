import Prepare from "../TestHelpers/Prepare";

const awaiting = require("awaiting");
import RequestLimitFactory from "../../src/RequestLimitFactory";
import RequestLimiter from "../../src/RequestLimiter";

describe("RequestLimiter", () => {
    beforeEach(function() {
        Prepare();
    });

    describe("#wrapCallable()", () => {
        it("should create and return a new RequestLimiter", async () => {
            const factory = new RequestLimitFactory();

            const requestLimiter: RequestLimiter = factory.create(
                "/endpoint",
                "GET"
            );

            expect(requestLimiter).toBeInstanceOf(RequestLimiter);
        });

        it("should properly throttle when many requests are done", async () => {
            const factory = new RequestLimitFactory();

            const requestLimiter: RequestLimiter = factory.create(
                "/endpoint",
                "GET"
            );

            expect(requestLimiter).toBeInstanceOf(RequestLimiter);

            const promise1 = requestLimiter.run(async () =>
                awaiting.delay(500)
            );
            const promise2 = requestLimiter.run(async () =>
                awaiting.delay(500)
            );
            const promise3 = requestLimiter.run(async () =>
                awaiting.delay(500)
            );
            const promise4 = requestLimiter.run(async () =>
                awaiting.delay(500)
            );
            const promise5 = requestLimiter.run(async () =>
                awaiting.delay(500)
            );
            const promise6 = requestLimiter.run(async () =>
                awaiting.delay(500)
            );

            await Promise.all([
                promise1,
                promise2,
                promise3,
                promise4,
                promise5,
                promise6
            ]);
        });

        it("should allow for non-promise callbacks", async () => {
            const factory = new RequestLimitFactory();

            const requestLimiter: RequestLimiter = factory.create(
                "/endpoint",
                "GET"
            );

            expect(requestLimiter).toBeInstanceOf(RequestLimiter);

            const result = await requestLimiter.run(() => {
                // return a random int
                return 123;
            });
            const result2 = await requestLimiter.run(() => {
                // returns undefined
            });

            expect(result).toBe(123);
            expect(result2).toBe(undefined);
        });

        it("should throw errors if callback rejects/fails", async () => {
            const factory = new RequestLimitFactory();

            const requestLimiter: RequestLimiter = factory.create(
                "/endpoint",
                "GET"
            );

            expect(requestLimiter).toBeInstanceOf(RequestLimiter);

            try {
                await requestLimiter.run(() => {
                    throw new Error("Ahhhh");
                });

                expect(false).toBeTruthy();
            } catch (ex) {
                expect(true).toBeTruthy();
            }
        });
    });
});
