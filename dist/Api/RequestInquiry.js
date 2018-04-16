"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RequestInquiry {
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
     * @param {number} requestInquiryId
     * @returns {Promise<any>}
     */
    async get(userId, monetaryAccountId, requestInquiryId) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/request-inquiry", "GET");
        const response = await limiter.run(async () => this.ApiAdapter.get(`/v1/user/${userId}/monetary-account/${monetaryAccountId}/request-inquiry/${requestInquiryId}`));
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
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/request-inquiry", "LIST");
        const response = await limiter.run(async () => this.ApiAdapter.get(`/v1/user/${userId}/monetary-account/${monetaryAccountId}/request-inquiry`, {}, {
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
     * @param {Amount} amount_inquired
     * @param {CounterpartyAlias} counterpartyAlias
     * @param {RequestInquiryPostOptions} options
     * @returns {Promise<void>}
     */
    async post(userId, monetaryAccountId, description, amount_inquired, counterpartyAlias, options) {
        const defaultOptions = Object.assign({ status: false, minimum_age: false, allow_bunqme: false, redirect_url: false, require_address: "NONE", merchant_reference: false }, options);
        const requestOptions = {
            counterparty_alias: counterpartyAlias,
            description: description,
            amount_inquired: amount_inquired,
            allow_bunqme: defaultOptions.allow_bunqme,
            require_address: defaultOptions.require_address
        };
        if (defaultOptions.status !== false) {
            requestOptions.status = defaultOptions.status;
        }
        if (defaultOptions.merchant_reference !== false) {
            requestOptions.merchant_reference =
                defaultOptions.merchant_reference;
        }
        if (defaultOptions.minimum_age !== false) {
            if (defaultOptions.minimum_age < 12 ||
                defaultOptions.minimum_age > 100) {
                throw new Error("Invalid minimum_age. Value has to be 12 >= minimum_age <= 100");
            }
            requestOptions.minimum_age = defaultOptions.minimum_age;
        }
        if (defaultOptions.redirect_url !== false) {
            requestOptions.redirect_url = defaultOptions.redirect_url;
        }
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/request-inquiry", "POST");
        const response = await limiter.run(async () => this.ApiAdapter.post(`/v1/user/${userId}/monetary-account/${monetaryAccountId}/request-inquiry`, requestOptions));
        return response.Response;
    }
    /**
     * @param {number} userId
     * @param {number} monetaryAccountId
     * @param {number} requestInquiryId
     * @param {string} status
     * @returns {Promise<void>}
     */
    async put(userId, monetaryAccountId, requestInquiryId, status = "REVOKED") {
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/request-inquiry", "PUT");
        const response = await limiter.run(async () => this.ApiAdapter.put(`/v1/user/${userId}/monetary-account/${monetaryAccountId}/request-inquiry/${requestInquiryId}`, {
            status: status
        }));
        return response.Response;
    }
}
exports.default = RequestInquiry;
