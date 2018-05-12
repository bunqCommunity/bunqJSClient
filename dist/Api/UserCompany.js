"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserCompany {
    /**
     * @param {ApiAdapter} ApiAdapter
     */
    constructor(ApiAdapter) {
        this.ApiAdapter = ApiAdapter;
        this.Session = ApiAdapter.Session;
    }
    /**
     * @param {number} userId
     * @param {any} userInfo
     * @returns {Promise<void>}
     */
    async put(userId, userInfo) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/user-company", "PUT");
        const response = await limiter.run(async () => this.ApiAdapter.put(`/v1/user-company/${userId}`, userInfo));
        return response.Response;
    }
}
exports.default = UserCompany;
