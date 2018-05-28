"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Installation {
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
        const result = await this.ApiAdapter.post("/v1/installation", {
            client_public_key: this.Session.publicKeyPem
        }, {}, {
            ignoreVerification: true,
            disableSigning: true,
            unauthenticated: true
        });
        return {
            id: result.Response[0].Id.id,
            token: result.Response[1].Token,
            serverPublicKey: result.Response[2].ServerPublicKey.server_public_key
        };
    }
    /**
     * @param options
     * @returns {Promise<{id; token: any; serverPublicKey: any}>}
     */
    async get(installationId, options = {}) {
        const result = await this.ApiAdapter.get(`/v1/installation/${installationId}`);
        return {
            id: result.Response[0].Id.id,
            token: result.Response[1].Token,
            serverPublicKey: result.Response[2].ServerPublicKey.server_public_key
        };
    }
}
exports.default = Installation;
