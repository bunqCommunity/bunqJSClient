"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Logger_1 = require("./Helpers/Logger");
class RequestLimiter {
    constructor(max_requests, interval) {
        this.max_requests = 3;
        this.interval = 3000;
        this.requests = 0;
        this.lastRequest = 0;
        this.timer = false;
        this.queue = [];
        /**
         * Wrap the callable given by the user and wrap it in a promise
         * @param callable
         * @returns {Promise<any>}
         */
        this.wrapCallable = async (callable) => {
            let resolvedCallback = null;
            let rejectCallback = null;
            const delayedPromise = new Promise((resolve, reject) => {
                resolvedCallback = resolve;
                rejectCallback = reject;
            });
            this.queue.push({
                resolve: resolvedCallback,
                reject: rejectCallback,
                callable: callable
            });
            return delayedPromise;
        };
        /**
         * Check if a new item from the queue should be called
         */
        this.check = () => {
            if (this.timer === false || this.queue.length > 0) {
                this.setTimer();
            }
            // check if we have reached the rate limit yet for this limiter
            if (this.queue.length > 0 && this.requests < this.max_requests) {
                // run as many requests as possible
                for (let i = this.requests; i < this.max_requests; i++) {
                    const queueItem = this.queue.shift();
                    if (!queueItem)
                        break;
                    this.requests++;
                    this.lastRequest = Date.now();
                    try {
                        const result = queueItem.callable();
                        // check if the callback has a promise and catch any rejections
                        if (result && result.then)
                            result.catch(Logger_1.default.error);
                        queueItem.resolve(result);
                    }
                    catch (error) {
                        queueItem.reject(error);
                    }
                }
                this.check();
            }
            if (this.queue.length === 0) {
                this.clearTimer();
            }
        };
        /**
         * Start the timer which updates and resets the limits
         */
        this.setTimer = () => {
            if (this.timer !== false)
                return;
            this.timer = setInterval(() => {
                if (this.queue.length === 0) {
                    this.clearTimer();
                }
                this.requests = 0;
                this.check();
            }, this.interval);
        };
        /**
         * Clear the timer
         */
        this.clearTimer = () => {
            if (this.timer !== false) {
                clearInterval(this.timer);
                this.timer = false;
            }
        };
        /**
         * Run the request limit checker
         * @param callable
         * @returns {any}
         */
        this.run = async (callable) => {
            const promise = this.wrapCallable(callable);
            this.check();
            return promise;
        };
        this.max_requests = max_requests;
        this.interval = interval;
    }
}
exports.default = RequestLimiter;
