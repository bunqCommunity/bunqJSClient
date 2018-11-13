"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MonetaryAccountSavings {
    /**
     * @param {ApiAdapter} ApiAdapter
     */
    constructor(ApiAdapter) {
        this.ApiAdapter = ApiAdapter;
        this.Session = ApiAdapter.Session;
    }
    /**
     * @param {number} userId
     * @param {number} monetaryAccountSavingsId
     * @param options
     * @returns {Promise<any>}
     */
    async get(userId, monetaryAccountSavingsId, options = {}) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/monetary-account-savings", "GET");
        const response = await limiter.run(async () => this.ApiAdapter.get(`/v1/user/${userId}/monetary-account-savings/${monetaryAccountSavingsId}`));
        return response.Response[0];
    }
    /**
     * @param {number} userId
     * @param {PaginationOptions} options
     * @returns {Promise<void>}
     */
    async list(userId, options = {
        count: 25,
        newer_id: false,
        older_id: false
    }) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/monetary-account-savings", "LIST");
        const response = await limiter.run(async () => this.ApiAdapter.get(`/v1/user/${userId}/monetary-account-savings`));
        return response.Response;
    }
    /**
     * @param {number} userId
     * @param {string} currency
     * @param {string} description
     * @param {Amount} dailyLimit
     * @param {string} color
     * @param options
     * @returns {Promise<void>}
     */
    async post(userId, currency, description, dailyLimit, color, savingsGoal = false, options = {}) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/monetary-account-savings", "POST");
        const requestBody = {
            currency: currency,
            description: description,
            daily_limit: {
                value: dailyLimit,
                currency: currency
            },
            setting: {
                color: color,
                default_avatar_status: "AVATAR_DEFAULT"
            },
            savings_goal: {
                currency: "EUR",
                value: savingsGoal
            }
        };
        const response = await limiter.run(async () => this.ApiAdapter.post(`/v1/user/${userId}/monetary-account-savings`, requestBody));
        return response.Response;
    }
    /**
     * @param {number} userId
     * @param {number} accountId
     * @param {monetaryAccountPutRequest} MonetaryAccountPutRequest
     * @param options
     * @returns {Promise<any>}
     */
    async put(userId, accountId, monetaryAccountPutRequest, options = {}) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/monetary-account-savings", "PUT");
        const response = await limiter.run(async () => this.ApiAdapter.put(`/v1/user/${userId}/monetary-account-savings/${accountId}`, monetaryAccountPutRequest));
        return response.Response;
    }
    /**
     * @param {number} userId
     * @param {number} accountId
     * @param {"CANCELLED"} status
     * @param {"REDEMPTION_VOLUNTARY"} sub_status
     * @param {string} reason
     * @param options
     * @returns {Promise<any>}
     */
    async putCancel(userId, accountId, status, sub_status, reason, options = {}) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/monetary-account-savings", "PUT");
        const response = await limiter.run(async () => this.ApiAdapter.put(`/v1/user/${userId}/monetary-account-savings/${accountId}`, {
            status: status,
            sub_status: sub_status,
            reason: "OTHER",
            reason_description: reason
        }));
        return response.Response;
    }
}
exports.default = MonetaryAccountSavings;
