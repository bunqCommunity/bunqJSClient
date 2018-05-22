import RequestLimitFactory from "../../src/RequestLimitFactory";
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
                const requestLimiter: RequestLimiter = factory.create(
                    "/endpoint",
                    method
                );
                expect(requestLimiter).toBeInstanceOf(RequestLimiter);
            });
        });

        it("should return the same instance for the same endpoint/method", async () => {
            const factory = new RequestLimitFactory();
            const requestLimiter: RequestLimiter = factory.create(
                "/endpoint",
                "PUT"
            );
            expect(requestLimiter).toBeInstanceOf(RequestLimiter);

            const requestLimiter2: RequestLimiter = factory.create(
                "/endpoint",
                "PUT"
            );
            expect(requestLimiter2).toBeInstanceOf(RequestLimiter);

            // both limiters should be the same instance
            expect(requestLimiter).toBe(requestLimiter2);
        });

        it("should NOT return the same instance for different endpoint/method", async () => {
            const factory = new RequestLimitFactory();
            const requestLimiter: RequestLimiter = factory.create(
                "/endpoint",
                "GET"
            );
            expect(requestLimiter).toBeInstanceOf(RequestLimiter);

            const requestLimiter2: RequestLimiter = factory.create(
                "/endpoint-2",
                "GET"
            );
            expect(requestLimiter2).toBeInstanceOf(RequestLimiter);

            // both limiters should be the same instance
            expect(requestLimiter).not.toBe(requestLimiter2);
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

            const requestLimiter = factory.getLimiter("/endpoint", "PUT");

            expect(requestLimiter).toBeFalsy();
        });

        it("should return the correct(existing) instance", async () => {
            const factory = new RequestLimitFactory();
            const requestLimiter: RequestLimiter = factory.create(
                "/endpoint",
                "PUT"
            );
            expect(requestLimiter).toBeInstanceOf(RequestLimiter);

            const limiterWrapper = factory.getLimiter("/endpoint", "PUT");
            expect(limiterWrapper.limiter).toBeInstanceOf(RequestLimiter);

            // both limiters should be the same instance
            expect(requestLimiter).toBe(limiterWrapper.limiter);
        });

        it("should return the correct(existing) instance - default options", async () => {
            const factory = new RequestLimitFactory();
            const requestLimiter: RequestLimiter = factory.create(
                "/endpoint",
                "GET"
            );
            expect(requestLimiter).toBeInstanceOf(RequestLimiter);

            const limiterWrapper = factory.getLimiter("/endpoint");
            expect(limiterWrapper.limiter).toBeInstanceOf(RequestLimiter);

            // both limiters should be the same instance
            expect(requestLimiter).toBe(limiterWrapper.limiter);
        });
    });

    describe("#removeLimiter()", () => {
        it("should remove a stored limiter with custom options", async () => {
            const factory = new RequestLimitFactory();
            const requestLimiter: RequestLimiter = factory.create(
                "/endpoint",
                "PUT"
            );
            expect(requestLimiter).toBeInstanceOf(RequestLimiter);

            const removed = factory.removeLimiter("/endpoint", "PUT");
            expect(removed).toBeTruthy();
        });

        it("should remove a stored limiter with default options", async () => {
            const factory = new RequestLimitFactory();
            const requestLimiter: RequestLimiter = factory.create("/endpoint");
            expect(requestLimiter).toBeInstanceOf(RequestLimiter);

            const removed = factory.removeLimiter("/endpoint");
            expect(removed).toBeTruthy();
        });

        it("should return false if limiter doesn't exist", async () => {
            const factory = new RequestLimitFactory();
            const requestLimiter: RequestLimiter = factory.create("/endpoint");
            expect(requestLimiter).toBeInstanceOf(RequestLimiter);

            const removed = factory.removeLimiter("/endpoint-invalid");
            expect(removed).toBeFalsy();
        });
    });

    describe("#getAllLimiters()", () => {
        it("should return 2 stored limiters", async () => {
            const factory = new RequestLimitFactory();
            const requestLimiter: RequestLimiter = factory.create(
                "/endpoint",
                "PUT"
            );
            const requestLimiter2: RequestLimiter = factory.create(
                "/endpoint",
                "GET"
            );
            expect(requestLimiter).toBeInstanceOf(RequestLimiter);
            expect(requestLimiter2).toBeInstanceOf(RequestLimiter);

            const limiters = factory.getAllLimiters();
            expect(Object.keys(limiters).length).toBe(2);
        });
    });

    describe("#clearLimiters()", () => {
        it("should remove all stored limiters", async () => {
            const factory = new RequestLimitFactory();
            const requestLimiter: RequestLimiter = factory.create(
                "/endpoint",
                "PUT"
            );
            expect(requestLimiter).toBeInstanceOf(RequestLimiter);

            factory.clearLimiters();

            const limiters = factory.getAllLimiters();

            expect(Object.keys(limiters).length).toBe(0);
        });
    });
});
