"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Event {
    /**
     * @param {ApiAdapter} ApiAdapter
     */
    constructor(ApiAdapter) {
        this.ApiAdapter = ApiAdapter;
        this.Session = ApiAdapter.Session;
    }
    /**
     * @param {number} userId
     * @param {number} eventId
     * @param options
     * @returns {Promise<void>}
     */
    async get(userId, eventId, options = {}) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/event");
        const response = await limiter.run(async () => this.ApiAdapter.get(`/v1/user/${userId}/event/${eventId}`));
        return response.Response[0];
    }
    /**
     * @param {number} userId
     * @param {PaginationOptions} options
     * @returns {Promise<void>}
     */
    async list(userId, options = {
        count: 200,
        newer_id: false,
        older_id: false
    }) {
        const params = {};
        if (options.count !== undefined) {
            params.count = options.count;
        }
        if (options.newer_id !== false && options.newer_id !== undefined) {
            params.newer_id = options.newer_id;
        }
        if (options.older_id !== false && options.older_id !== undefined) {
            params.older_id = options.older_id;
        }
        if (options.monetary_account_id !== false && options.monetary_account_id !== undefined) {
            params.monetary_account_id = options.monetary_account_id;
        }
        if (options.status !== false && options.status !== undefined) {
            params.status = options.status;
        }
        if (options.display_user_event !== undefined) {
            params.display_user_event = options.display_user_event;
        }
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/event", "LIST");
        const response = await limiter.run(async () => this.ApiAdapter.get(`/v1/user/${userId}/event`, {}, {
            axiosOptions: {
                params: params
            }
        }));
        return response.Response;
    }
}
exports.default = Event;
