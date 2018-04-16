"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RequestLimiter_1 = require("./RequestLimiter");
class RequestLimitFactory {
    constructor() {
        this.limiters = {};
    }
    /**
     * @param {string} endpoint
     * @param {string} method
     * @returns {any}
     */
    create(endpoint, method = "GET") {
        const limiterKey = `${endpoint}${method}`;
        if (this.limiters[limiterKey]) {
            return this.limiters[limiterKey].limiter;
        }
        let rateLimit = 3;
        switch (method) {
            case "PUT":
                rateLimit = 2;
                break;
            case "POST":
            case "DELETE":
                rateLimit = 5;
                break;
            case "GET":
            case "LIST":
                rateLimit = 3;
                break;
            default:
                throw new Error("Invalid method given");
        }
        this.limiters[limiterKey] = {
            limiter: new RequestLimiter_1.default(rateLimit, 3350),
            method,
            endpoint
        };
        return this.limiters[limiterKey].limiter;
    }
    /**
     * @param {string} endpoint
     * @param {string} method
     * @returns {any}
     */
    getLimiter(endpoint, method = "GET") {
        const limiterKey = `${endpoint}${method}`;
        if (this.limiters[limiterKey]) {
            return this.limiters[limiterKey];
        }
        return false;
    }
    /**
     * @param {string} endpoint
     * @param {string} method
     * @returns {boolean}
     */
    removeLimiter(endpoint, method = "GET") {
        const limiterKey = `${endpoint}${method}`;
        if (this.limiters[limiterKey]) {
            delete this.limiters[limiterKey];
            return true;
        }
        return false;
    }
    getAllLimiters() {
        return this.limiters;
    }
    clearLimiters() {
        this.limiters = {};
    }
}
exports.default = RequestLimitFactory;
