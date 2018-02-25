import RequestLimiter from "./RequestLimiter";

export default class RequestLimitFactory {
    private limiters: any = {};

    /**
     * @param {string} endpoint
     * @param {string} method
     * @returns {any}
     */
    public create(
        endpoint: string,
        method: string = "GET"
    ): RequestLimiter {
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
            limiter: new RequestLimiter(rateLimit, 3750),
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
    public getLimiter(endpoint: string, method: string = "GET") {
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
    public removeLimiter(endpoint: string, method: string = "GET") {
        const limiterKey = `${endpoint}${method}`;
        if (this.limiters[limiterKey]) {
            delete this.limiters[limiterKey];
            return true;
        }
        return false;
    }

    public getAllLimiters() {
        return this.limiters;
    }

    public clearLimiters() {
        this.limiters = {};
    }
}
