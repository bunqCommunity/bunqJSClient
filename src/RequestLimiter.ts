import axios, { AxiosInstance } from "axios";

export interface IRequestLimiterCallback {
    (axiosClient: AxiosInstance): Promise<any>;
}

export default class RequestLimiter {
    private max_requests: number = 3;
    private interval: number = 3000;
    private axiosClient: AxiosInstance;

    private requests: number = 0;
    private lastRequest: number = 0;
    private timer: boolean | any = false;
    private queue = [];

    constructor(max_requests: number, interval: number, axiosClient: AxiosInstance | false) {
        this.max_requests = max_requests;
        this.interval = interval;
        // default to standard axios instance
        this.axiosClient = axiosClient || axios;
    }

    /**
     * Wrap the callable given by the user and wrap it in a promise
     * @param callable
     * @returns {Promise<any>}
     */
    private wrapCallable = async (callable: IRequestLimiterCallback) => {
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
    private check = () => {
        if (this.timer === false || this.queue.length > 0) {
            this.setTimer();
        }

        // check if we have reached the rate limit yet for this limiter
        if (this.queue.length > 0 && this.requests < this.max_requests) {
            // run as many requests as possible
            for (let i = this.requests; i < this.max_requests; i++) {
                const queueItem = this.queue.shift();

                if (!queueItem) break;

                this.requests++;
                this.lastRequest = Date.now();

                Promise.resolve(queueItem.callable(this.axiosClient))
                    .then(queueItem.resolve)
                    .catch(queueItem.reject);
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
    private setTimer = () => {
        if (this.timer !== false) return;

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
    private clearTimer = () => {
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
    public run: any = async callable => {
        const promise = this.wrapCallable(callable);
        this.check();
        return promise;
    };
}
