"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    /**
     * @param {ApiAdapter} ApiAdapter
     */
    constructor(ApiAdapter) {
        this.ApiAdapter = ApiAdapter;
        this.Session = ApiAdapter.Session;
    }
    /**
     * @param {number} userId
     * @param options
     * @returns {Promise<any>}
     */
    async get(userId, options = {}) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/user", "GET");
        const response = await limiter.run(async () => this.ApiAdapter.get(`/v1/user/${userId}`));
        return response.Response[0];
    }
    /**
     * @param options
     * @returns {Promise<any>}
     */
    async list(options = {}) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/user", "LIST");
        const response = await limiter.run(async () => this.ApiAdapter.get(`/v1/user`));
        return response.Response[0];
    }
}
exports.default = User;
