import RequestLimitFactory, { RequestLimitConfig } from "../../src/RequestLimitFactory";
import RequestLimiter from "../../src/RequestLimiter";
import Prepare from "../TestHelpers/Prepare";

const METHODS = ["GET", "POST", "DELETE", "LIST", "PUT"];

describe("RequestLimitFactory", () => {
    beforeEach(function() {
        Prepare();
    });

    describe("#create()", () => {
        it("should create and return a new RequestLimiter for all valid methods", async () => {
            const factory = new RequestLimitFactory();

            METHODS.map(method => {
                const requestLimitConfig: RequestLimitConfig = factory.create("/endpoint", method);
                expect(requestLimitConfig.limiter).toBeInstanceOf(RequestLimiter);
            });
        });

        it("should return the same instance for the same endpoint/method", async () => {
            const factory = new RequestLimitFactory();
            const requestLimitConfig: RequestLimitConfig = factory.create("/endpoint", "PUT");
            expect(requestLimitConfig.limiter).toBeInstanceOf(RequestLimiter);

            const requestLimitConfig2: RequestLimitConfig = factory.create("/endpoint", "PUT");
            expect(requestLimitConfig2.limiter).toBeInstanceOf(RequestLimiter);

            // both limiters should be the same instance
            expect(requestLimitConfig.limiter).toBe(requestLimitConfig2.limiter);
        });

        it("should NOT return the same instance for different endpoint/method", async () => {
            const factory = new RequestLimitFactory();
            const requestLimitConfig: RequestLimitConfig = factory.create("/endpoint", "GET");
            expect(requestLimitConfig.limiter).toBeInstanceOf(RequestLimiter);

            const requestLimitConfig2: RequestLimitConfig = factory.create("/endpoint-2", "GET");
            expect(requestLimitConfig2.limiter).toBeInstanceOf(RequestLimiter);

            // both limiters should be the same instance
            expect(requestLimitConfig.limiter).not.toBe(requestLimitConfig2.limiter);
        });

        it("should throw an error when an invalid method is given", async () => {
            const factory = new RequestLimitFactory();
            expect(() => {
                factory.create("/endpoint", "TEAPOT");
            }).toThrow();
        });
    });

    describe("#getLimiter()", () => {
        it("should return false if endpoint/method does not exist yet", async () => {
            const factory = new RequestLimitFactory();
            const requestLimitConfig: RequestLimitConfig | false = factory.getLimiter("invalid-key");
            expect(requestLimitConfig).toBeFalsy();
        });

        it("should return the correct(existing) instance", async () => {
            const factory = new RequestLimitFactory();
            const requestLimitConfig: RequestLimitConfig = factory.create("/endpoint", "PUT");
            expect(requestLimitConfig.limiter).toBeInstanceOf(RequestLimiter);

            const requestLimitConfig2 = factory.getLimiter(requestLimitConfig.limiterKey);
            expect(requestLimitConfig2).not.toBeFalsy();
            expect(requestLimitConfig2).toHaveProperty("limiter");

            if (requestLimitConfig2 !== false) {
                // both limiters should be the same instance
                expect(requestLimitConfig.limiter).toBe(requestLimitConfig2.limiter);
            }
        });
    });

    describe("#removeLimiter()", () => {
        it("should remove a stored limiter with custom options", async () => {
            const factory = new RequestLimitFactory();
            const requestLimitConfig: RequestLimitConfig = factory.create("/endpoint", "PUT");
            expect(requestLimitConfig.limiter).toBeInstanceOf(RequestLimiter);

            const removed = factory.removeLimiter(requestLimitConfig.limiterKey);
            expect(removed).toBeTruthy();
        });

        it("should remove a stored limiter with default options", async () => {
            const factory = new RequestLimitFactory();
            const requestLimitConfig: RequestLimitConfig = factory.create("/endpoint");
            expect(requestLimitConfig.limiter).toBeInstanceOf(RequestLimiter);

            const removed = factory.removeLimiter(requestLimitConfig.limiterKey);
            expect(removed).toBeTruthy();
        });

        it("should return false if limiter doesn't exist", async () => {
            const factory = new RequestLimitFactory();
            const requestLimitConfig: RequestLimitConfig = factory.create("/endpoint");
            expect(requestLimitConfig.limiter).toBeInstanceOf(RequestLimiter);

            const removed = factory.removeLimiter("invalid-key");
            expect(removed).toBeFalsy();
        });
    });

    describe("#getAllLimiters()", () => {
        it("should return 2 stored limiters", async () => {
            const factory = new RequestLimitFactory();
            const requestLimitConfig: RequestLimitConfig = factory.create("/endpoint", "PUT");
            const requestLimitConfig2: RequestLimitConfig = factory.create("/endpoint", "GET");

            expect(requestLimitConfig.limiter).toBeInstanceOf(RequestLimiter);
            expect(requestLimitConfig2.limiter).toBeInstanceOf(RequestLimiter);

            const limiters = factory.getAllLimiters();
            expect(Object.keys(limiters).length).toBe(2);
        });
    });

    describe("#clearLimiters()", () => {
        it("should remove all stored limiters", async () => {
            const factory = new RequestLimitFactory();
            const requestLimitConfig: RequestLimitConfig = factory.create("/endpoint", "PUT");
            expect(requestLimitConfig.limiter).toBeInstanceOf(RequestLimiter);

            factory.clearLimiters();

            const limiters = factory.getAllLimiters();

            expect(Object.keys(limiters).length).toBe(0);
        });
    });
});
