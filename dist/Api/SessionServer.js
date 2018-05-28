"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SessionServer {
    /**
     * @param {ApiAdapter} ApiAdapter
     */
    constructor(ApiAdapter) {
        this.ApiAdapter = ApiAdapter;
        this.Session = ApiAdapter.Session;
    }
    /**
     * @param options
     * @returns {Promise<{id; token: any; serverPublicKey: any}>}
     */
    async add(options = {}) {
        const result = await this.ApiAdapter.post("/v1/session-server", {
            secret: this.Session.apiKey
        }, {}, {
            ignoreVerification: true
        });
        return {
            id: result.Response[0].Id.id,
            token: result.Response[1].Token,
            user_info: result.Response[2]
        };
    }
    /**
     * @param options
     * @returns {Promise<{id; token: any; user_info}>}
     */
    async delete(options = {}) {
        await this.ApiAdapter.delete(`/v1/session/${this.Session.sessionId}`);
        return true;
    }
}
exports.default = SessionServer;
