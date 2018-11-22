"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MonetaryAccountJoint {
    /**
     * @param {ApiAdapter} ApiAdapter
     */
    constructor(ApiAdapter) {
        this.ApiAdapter = ApiAdapter;
        this.Session = ApiAdapter.Session;
    }
    /**
     * @param {number} userId
     * @param {number} monetaryAccountJointId
     * @param options
     * @returns {Promise<any>}
     */
    async get(userId, monetaryAccountJointId, options = {}) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/monetary-account-joint", "GET");
        const response = await limiter.run(async () => this.ApiAdapter.get(`/v1/user/${userId}/monetary-account-joint/${monetaryAccountJointId}`));
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
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/monetary-account-joint", "LIST");
        const response = await limiter.run(async () => this.ApiAdapter.get(`/v1/user/${userId}/monetary-account-joint`));
        return response.Response;
    }
    /**
     * @param {number} userId
     * @param {number} accountId
     * @param {monetaryAccountPutRequest} MonetaryAccountPutRequest
     * @param op¶tions
     * @returns {Promise<any>}
     */
    async put(userId, accountId, monetaryAccountPutRequest, options = {}) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/monetary-account-joint", "PUT");
        const response = await limiter.run(async () => this.ApiAdapter.put(`/v1/user/${userId}/monetary-account-joint/${accountId}`, monetaryAccountPutRequest));
        return response.Response;
    }
}
exports.default = MonetaryAccountJoint;
