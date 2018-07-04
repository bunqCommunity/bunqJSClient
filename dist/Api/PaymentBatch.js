"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PaymentBatch {
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
    async get(userId, monetaryAccountId, paymentId, options = {}) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/payment-batch");
        const response = await limiter.run(async () => this.ApiAdapter.get(`/v1/user/${userId}/monetary-account/${monetaryAccountId}/payment-batch/${paymentId}`));
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
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/payment-batch", "LIST");
        const response = await limiter.run(async () => this.ApiAdapter.get(`/v1/user/${userId}/monetary-account/${monetaryAccountId}/payment-batch`, {}, {
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
     * @param {CounterPartyAliasCollection} counterpartyAliasCollection
     * @param options
     * @returns {Promise<void>}
     */
    async post(userId, monetaryAccountId, description, amount, counterpartyAliasCollection, options = {}) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/payment-batch", "POST");
        const payments = counterpartyAliasCollection.map(counterpartyAlias => {
            return {
                counterparty_alias: counterpartyAlias,
                description: description,
                amount: amount
            };
        });
        const response = await limiter.run(async () => this.ApiAdapter.post(`/v1/user/${userId}/monetary-account/${monetaryAccountId}/payment-batch`, { payments: payments }));
        return response.Response;
    }
}
exports.default = PaymentBatch;
