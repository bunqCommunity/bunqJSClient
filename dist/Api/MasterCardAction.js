"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MasterCardAction {
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
     * @param {number} requestResponseId
     * @returns {Promise<any>}
     */
    async get(userId, monetaryAccountId, masterCardActionId) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/mastercard-action", "GET");
        const response = await limiter.run(async () => this.ApiAdapter.get(`/v1/user/${userId}/monetary-account/${monetaryAccountId}/mastercard-action/${masterCardActionId}`));
        return response.Response[0];
    }
    /**
     * @param {number} userId
     * @param {number} monetaryAccountId
     * @param {PaymentsListOptions} options
     * @returns {Promise<any>}
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
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/mastercard-action", "LIST");
        const response = await limiter.run(async () => this.ApiAdapter.get(`/v1/user/${userId}/monetary-account/${monetaryAccountId}/mastercard-action`, {}, {
            axiosOptions: {
                params: params
            }
        }));
        return response.Response;
    }
}
exports.default = MasterCardAction;
