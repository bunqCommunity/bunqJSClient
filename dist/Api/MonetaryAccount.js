"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MonetaryAccount {
    /**
     * @param {ApiAdapter} ApiAdapter
     */
    constructor(ApiAdapter) {
        this.ApiAdapter = ApiAdapter;
        this.Session = ApiAdapter.Session;
    }
    /**
     *
     * @param options
     * @returns {Promise<any>}
     */
    async get(userId, monetaryAccountId, options = {}) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/monetary-account", "GET");
        const response = await limiter.run(async () => this.ApiAdapter.get(`/v1/user/${userId}/monetary-account/${monetaryAccountId}`));
        return response.Response[0];
    }
    /**
     * @param {number} userId
     * @param {MonetaryAccountListOptions} options
     * @returns {Promise<void>}
     */
    async list(userId, options = {
            count: 25,
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
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/monetary-account", "LIST");
        const response = await limiter.run(async () => this.ApiAdapter.get(`/v1/user/${userId}/monetary-account`, {}, {
            axiosOptions: {
                params: params
            }
        }));
        return response.Response;
    }
}
exports.default = MonetaryAccount;
