"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CardCvc2 {
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
    async get(userId, cardId, cvc2Id) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/generated-cvc2", "GET");
        const response = await limiter.run(async () => this.ApiAdapter.get(`/v1/user/${userId}/card/${cardId}/generated-cvc2/${cvc2Id}`));
        return response.Response[0];
    }
    /**
     * @param {number} userId
     * @param {number} cardId
     * @param {any} options
     * @returns {Promise<any>}
     */
    async list(userId, cardId, options = {}) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/generated-cvc2", "LIST");
        const response = await limiter.run(async () => this.ApiAdapter.get(`/v1/user/${userId}/card/${cardId}/generated-cvc2`));
        return response.Response;
    }
    /**
     * @param {number} userId
     * @param {number} cardId
     * @returns {Promise<void>}
     */
    async post(userId, cardId, options = {}) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/generated-cvc2", "POST");
        const response = await limiter.run(async () => this.ApiAdapter.put(`/v1/user/${userId}/card/${cardId}/generated-cvc2`, {}, {}, { isEncrypted: true }));
        return response.Response[0];
    }
}
exports.default = CardCvc2;
