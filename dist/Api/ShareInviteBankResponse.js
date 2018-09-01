"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ShareInviteBankResponse {
    /**
     * @param {ApiAdapter} ApiAdapter
     */
    constructor(ApiAdapter) {
        this.ApiAdapter = ApiAdapter;
        this.Session = ApiAdapter.Session;
    }
    /**
     * @param {number} userId
     * @param {number} accountId
     * @param {PaginationOptions} options
     * @returns {Promise<void>}
     */
    async get(userId, shareInviteBankResponseId, options = {
        count: 200,
        newer_id: false,
        older_id: false
    }) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/share-invite-bank-response", "GET");
        const response = await limiter.run(async () => this.ApiAdapter.get(`/v1/user/${userId}/share-invite-bank-response/${shareInviteBankResponseId}`));
        return response.Response;
    }
    /**
     * @param {number} userId
     * @param {PaginationOptions} options
     * @returns {Promise<void>}
     */
    async list(userId, options = {
        count: 200,
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
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/share-invite-bank-response", "LIST");
        const response = await limiter.run(async () => this.ApiAdapter.get(`/v1/user/${userId}/share-invite-bank-response`, {}, {
            axiosOptions: {
                params: params
            }
        }));
        return response.Response;
    }
    /**
     * @param {number} userId
     * @param {number} monetaryAccountId
     * @param {CounterpartyAlias} counterpartyAlias
     * @param {ShareInviteBankInquiryPostShareDetail} shareDetail
     * @param {ShareInviteBankInquiryPostStatus} status
     * @param {ShareInviteBankInquiryPostOptions} options
     * @returns {Promise<any>}
     */
    async put(userId, shareInviteBankResponseId, status) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/share-invite-bank-response", "PUT");
        const response = await limiter.run(async () => this.ApiAdapter.put(`/v1/user/${userId}/share-invite-bank-response/${shareInviteBankResponseId}`, {
            status: status
        }));
        return response.Response;
    }
}
exports.default = ShareInviteBankResponse;
