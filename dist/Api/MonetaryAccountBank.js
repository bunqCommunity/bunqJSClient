"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MonetaryAccountBank {
    /**
     * @param {ApiAdapter} ApiAdapter
     */
    constructor(ApiAdapter) {
        this.ApiAdapter = ApiAdapter;
        this.Session = ApiAdapter.Session;
    }
    /**
     * @param {number} userId
     * @param {number} monetaryAccountBankId
     * @param options
     * @returns {Promise<any>}
     */
    async get(userId, monetaryAccountBankId, options = {}) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/monetary-account-bank", "GET");
        const response = await limiter.run(async () => this.ApiAdapter.get(`/v1/user/${userId}/monetary-account-bank/${monetaryAccountBankId}`));
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
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/monetary-account-bank", "LIST");
        const response = await limiter.run(async () => this.ApiAdapter.get(`/v1/user/${userId}/monetary-account-bank`));
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
    async post(userId, currency, description, dailyLimit, color, options = {}) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/monetary-account-bank", "POST");
        const response = await limiter.run(async () => this.ApiAdapter.post(`/v1/user/${userId}/monetary-account-bank`, {
            currency: currency,
            description: description,
            daily_limit: {
                value: dailyLimit,
                currency: currency
            },
            setting: {
                color: color,
                default_avatar_status: "AVATAR_DEFAULT"
            }
        }));
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
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/monetary-account-bank", "PUT");
        const response = await limiter.run(async () => this.ApiAdapter.put(`/v1/user/${userId}/monetary-account-bank/${accountId}`, monetaryAccountPutRequest));
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
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/monetary-account-bank", "PUT");
        const response = await limiter.run(async () => this.ApiAdapter.put(`/v1/user/${userId}/monetary-account-bank/${accountId}`, {
            status: status,
            sub_status: sub_status,
            reason: "OTHER",
            reason_description: reason
        }));
        return response.Response;
    }
}
exports.default = MonetaryAccountBank;
