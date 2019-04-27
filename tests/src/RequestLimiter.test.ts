import Prepare from "../TestHelpers/Prepare";

const awaiting = require("awaiting");

import RequestLimiter from "../../src/RequestLimiter";
import Logger from "../../src/Helpers/Logger";
import RequestLimitFactory, { RequestLimitConfig } from "../../src/RequestLimitFactory";

describe("RequestLimiter", () => {
    beforeEach(function() {
        Prepare();
    });

    describe("#wrapCallable()", () => {
        it("should create and return a new RequestLimiter", async () => {
            const factory = new RequestLimitFactory(Logger);

            const requestLimitConfig: RequestLimitConfig = factory.create("/endpoint", "GET");

            expect(requestLimitConfig.limiter).toBeInstanceOf(RequestLimiter);
        });

        it("should properly throttle when many requests are done", async () => {
            const factory = new RequestLimitFactory(Logger);

            const requestLimitConfig: RequestLimitConfig = factory.create("/endpoint", "GET");

            expect(requestLimitConfig.limiter).toBeInstanceOf(RequestLimiter);

            await Promise.all([
                requestLimitConfig.run(async () => awaiting.delay(500)),
                requestLimitConfig.run(async () => awaiting.delay(500)),
                requestLimitConfig.run(async () => awaiting.delay(500)),
                requestLimitConfig.run(async () => awaiting.delay(500)),
                requestLimitConfig.run(async () => awaiting.delay(500)),
                requestLimitConfig.run(async () => awaiting.delay(500))
            ]);
        });

        it("should allow for non-promise callbacks", async () => {
            const factory = new RequestLimitFactory(Logger);

            const requestLimitConfig: RequestLimitConfig = factory.create("/endpoint", "GET");

            expect(requestLimitConfig.limiter).toBeInstanceOf(RequestLimiter);

            const result = await requestLimitConfig.run(async () => {
                // return a random int
                return 123;
            });
            const result2 = await requestLimitConfig.run(async () => {
                // returns undefined
            });

            expect(result).toBe(123);
            expect(result2).toBe(undefined);
        });

        it("should throw errors if callback rejects/fails", async () => {
            const factory = new RequestLimitFactory(Logger);

            const requestLimitConfig: RequestLimitConfig = factory.create("/endpoint", "GET");

            expect(requestLimitConfig.limiter).toBeInstanceOf(RequestLimiter);

            try {
                await requestLimitConfig.run(() => {
                    throw new Error("Ahhhh");
                });

                expect(false).toBeTruthy();
            } catch (ex) {
                expect(true).toBeTruthy();
            }
        });
    });
});
