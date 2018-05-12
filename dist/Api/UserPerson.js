"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserPerson {
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
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/user-person", "PUT");
        const response = await limiter.run(async () => this.ApiAdapter.put(`/v1/user-person/${userId}`, userInfo));
        return response.Response;
    }
}
exports.default = UserPerson;
