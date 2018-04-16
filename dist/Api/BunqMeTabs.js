"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BunqMeTabs {
    /**
     * @param {ApiAdapter} ApiAdapter
     */
    constructor(ApiAdapter) {
        this.ApiAdapter = ApiAdapter;
        this.Session = ApiAdapter.Session;
    }
    /**
     * @param {number} userId
     * @param {number} monetaryAccountId
     * @param {number} paymentId
     * @param options
     * @returns {Promise<void>}
     */
    async get(userId, monetaryAccountId, tabId, options = {}) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/bunqme-tab", "GET");
        const response = await limiter.run(async () => this.ApiAdapter.get(`/v1/user/${userId}/monetary-account/${monetaryAccountId}/bunqme-tab/${tabId}`));
        return response.Response[0];
    }
    /**
     * @param {number} userId
     * @param {number} monetaryAccountId
     * @param {PaymentsListOptions} options
     * @returns {Promise<void>}
     */
    async list(userId, monetaryAccountId, options = {
            count: 50,
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
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/bunqme-tab", "LIST");
        const response = await limiter.run(async () => this.ApiAdapter.get(`/v1/user/${userId}/monetary-account/${monetaryAccountId}/bunqme-tab`, {}, {
            axiosOptions: {
                params: params
            }
        }));
        return response.Response;
    }
    /**
     * @param {number} userId
     * @param {number} monetaryAccountId
     * @param {string} description
     * @param {Amount} amount
     * @param options
     * @returns {Promise<void>}
     */
    async post(userId, monetaryAccountId, description, amount, options = {}) {
        const params = {
            description: description,
            amount_inquired: amount
        };
        if (options.redirect_url) {
            params.redirect_url = options.redirect_url;
        }
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/bunqme-tab", "POST");
        const response = await limiter.run(async () => this.ApiAdapter.post(`/v1/user/${userId}/monetary-account/${monetaryAccountId}/bunqme-tab`, {
            bunqme_tab_entry: params
        }));
        return response.Response;
    }
    /**
     * @param {number} userId
     * @param {number} monetaryAccountId
     * @param {number} bunqMeTabId
     * @param {string} status
     * @returns {Promise<void>}
     */
    async put(userId, monetaryAccountId, bunqMeTabId, status = "CANCELLED") {
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/bunqme-tab", "PUT");
        const response = await limiter.run(async () => this.ApiAdapter.put(`/v1/user/${userId}/monetary-account/${monetaryAccountId}/bunqme-tab/${bunqMeTabId}`, {
            status: status
        }));
        return response.Response;
    }
}
exports.default = BunqMeTabs;
