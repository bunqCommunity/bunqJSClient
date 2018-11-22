"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Ip {
    /**
     * @param {ApiAdapter} ApiAdapter
     */
    constructor(ApiAdapter) {
        this.ApiAdapter = ApiAdapter;
        this.Session = ApiAdapter.Session;
    }
    /**
     * @param {number} userId
     * @param {number} credentialPasswordIpId
     * @param {number} ipId
     * @param options
     * @returns {Promise<void>}
     */
    async get(userId, credentialPasswordIpId, ipId, options = {}) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/credential-password-ip/ip", "GET");
        const response = await limiter.run(async () => this.ApiAdapter.get(`/v1/user/${userId}/credential-password-ip/${credentialPasswordIpId}/ip/${ipId}`));
        return response.Response[0];
    }
    /**
     * @param {number} userId
     * @param {number} credentialPasswordIpId
     * @param {PaginationOptions} options
     * @returns {Promise<void>}
     */
    async list(userId, credentialPasswordIpId, options = {
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
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/credential-password-ip/ip", "LIST");
        const response = await limiter.run(async () => this.ApiAdapter.get(`/v1/user/${userId}/credential-password-ip/${credentialPasswordIpId}/ip`, {}, {
            axiosOptions: {
                params: params
            }
        }));
        return response.Response;
    }
    /**
     * @param {number} userId
     * @param {number} credentialPasswordIpId
     * @param {string} ip
     * @param {"ACTIVE" | "INACTIVE"} status
     * @param options
     * @returns {Promise<any>}
     */
    async post(userId, credentialPasswordIpId, ip, status, options = {}) {
        const data = {
            ip: ip,
            status: status
        };
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/credential-password-ip/ip", "POST");
        const response = await limiter.run(async () => this.ApiAdapter.post(`/v1/user/${userId}/credential-password-ip/${credentialPasswordIpId}/ip`, data));
        return response.Response;
    }
    /**
     * @param {number} userId
     * @param {number} credentialPasswordIpId
     * @param {number} ipId
     * @param {string} ip
     * @param {"ACTIVE" | "INACTIVE"} status
     * @param options
     * @returns {Promise<any>}
     */
    async put(userId, credentialPasswordIpId, ipId, ip, status, options = {}) {
        const data = {
            ip: ip,
            status: status
        };
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/credential-password-ip/ip", "PUT");
        const response = await limiter.run(async () => this.ApiAdapter.put(`/v1/user/${userId}/credential-password-ip/${credentialPasswordIpId}/ip/${ipId}`, data));
        return response.Response;
    }
}
exports.default = Ip;
