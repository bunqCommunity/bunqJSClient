"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomerStatementExportContent {
    /**
     * @param {ApiAdapter} ApiAdapter
     */
    constructor(ApiAdapter) {
        this.ApiAdapter = ApiAdapter;
        this.Session = ApiAdapter.Session;
    }
    /**
     *
     * @param options
     * @returns {Promise<Blob>}
     */
    async list(userId, accountId, customerStatementId, options = {}) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/customer-statement-export/content", "LIST");
        const response = await limiter.run(async () => this.ApiAdapter.get(`/v1/user/${userId}/monetary-account/${accountId}/customer-statement/${customerStatementId}/content`, {}, {
            ignoreVerification: true,
            axiosOptions: {
                responseType: "blob"
            }
        }));
        return response;
    }
}
exports.default = CustomerStatementExportContent;
