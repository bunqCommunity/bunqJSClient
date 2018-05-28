"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SandboxUser {
    /**
     * @param {ApiAdapter} ApiAdapter
     */
    constructor(ApiAdapter) {
        this.ApiAdapter = ApiAdapter;
        this.Session = ApiAdapter.Session;
    }
    /**
     * @param options
     * @returns {Promise<{}>}
     */
    async post(options = {}) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/sandbox-user", "POST");
        const response = await limiter.run(async () => this.ApiAdapter.post(`https://sandbox.public.api.bunq.com/v1/sandbox-user`, {}, {}, {
            ignoreVerification: true,
            disableSigning: true
        }));
        return response.Response[0].ApiKey.api_key;
    }
}
exports.default = SandboxUser;
