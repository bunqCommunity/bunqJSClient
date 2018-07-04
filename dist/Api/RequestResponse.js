"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RequestResponse {
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
    async get(userId, monetaryAccountId, requestResponseId) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/request-response", "GET");
        const response = await limiter.run(async () => this.ApiAdapter.get(`/v1/user/${userId}/monetary-account/${monetaryAccountId}/request-response/${requestResponseId}`));
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
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/request-response", "LIST");
        const response = await limiter.run(async () => this.ApiAdapter.get(`/v1/user/${userId}/monetary-account/${monetaryAccountId}/request-response`, {}, {
            axiosOptions: {
                params: params
            }
        }));
        return response.Response;
    }
    /**
     * @param {number} userId
     * @param {number} monetaryAccountId
     * @param {number} requestResponseId
     * @param {"ACCEPTED" | "REJECTED"} status
     * @param {RequestResponsePutOptions} options
     * @returns {Promise<void>}
     */
    async put(userId, monetaryAccountId, requestResponseId, status, options) {
        const defaultOptions = Object.assign({ status: status, amount_responded: false, address_shipping: false, address_billing: false }, options);
        const requestOptions = {
            status: status
        };
        // if request is accepted we set the shipping and amount details
        if (status === "ACCEPTED") {
            requestOptions.amount_responded = defaultOptions.amount_responded;
            if (defaultOptions.address_shipping) {
                requestOptions.address_shipping =
                    defaultOptions.address_shipping;
            }
            if (defaultOptions.address_billing) {
                requestOptions.address_billing = defaultOptions.address_billing;
            }
        }
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/request-response", "PUT");
        const response = await limiter.run(async () => this.ApiAdapter.put(`/v1/user/${userId}/monetary-account/${monetaryAccountId}/request-response/${requestResponseId}`, requestOptions));
        return response.Response;
    }
}
exports.default = RequestResponse;
