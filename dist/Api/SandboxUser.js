"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Session_1 = require("../Session");
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
        const response = await limiter.run(async () => this.ApiAdapter.post(`${Session_1.URL_ENVIROMENTS.SANDBOX}/v1/sandbox-user`, {}, {}, {
            // no signing and no authentication
            disableSigning: true,
            disableAuthentication: true,
            disableVerification: true,
            skipSessionCheck: true
        }));
        return response.Response[0].ApiKey.api_key;
    }
}
exports.default = SandboxUser;
