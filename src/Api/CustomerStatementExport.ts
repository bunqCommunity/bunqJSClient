import ApiAdapter from "../ApiAdapter";
import Session from "../Session";
import ApiEndpointInterface from "../Interfaces/ApiEndpointInterface";

export default class CustomerStatementExport implements ApiEndpointInterface {
    ApiAdapter: ApiAdapter;
    Session: Session;

    /**
     * @param {ApiAdapter} ApiAdapter
     */
    constructor(ApiAdapter: ApiAdapter) {
        this.ApiAdapter = ApiAdapter;
        this.Session = ApiAdapter.Session;
    }

    /**
     * @param {number} userId
     * @param {number} accountId
     * @param {"CSV" | "PDF" | "MT940"} statement_format
     * @param {Date} date_start
     * @param {Date} date_end
     * @param options
     * @returns {Promise<any>}
     */
    public async post(
        userId: number,
        accountId: number,
        statement_format: "CSV" | "PDF" | "MT940",
        date_start: Date,
        date_end: Date,
        options: any = {
            regional_format: "EUROPEAN"
        }
    ) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create(
            "/customer-statement-export",
            "POST"
        );

        const response = await limiter.run(async () =>
            this.ApiAdapter.post(
                `/v1/user/${userId}/monetary-account/${accountId}/customer-statement/`,
                {
                    statement_format: statement_format,
                    date_start: date_start,
                    date_end: date_end,
                    regional_format: options.regional_format
                }
            )
        );

        return response.Response[0];
    }

    /**
     * @param {number} userId
     * @param {number} accountId
     * @param {number} customerStatementId
     * @param options
     * @returns {Promise}
     */
    public async get(
        userId: number,
        accountId: number,
        customerStatementId: number,
        options: any = {}
    ) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create(
            "/customer-statement-export",
            "GET"
        );

        const response = await limiter.run(async () =>
            this.ApiAdapter.get(
                `/v1/user/${userId}/monetary-account/${accountId}/customer-statement/${customerStatementId}`
            )
        );

        return response.Response[0];
    }

    /**
     * @param {number} userId
     * @param {number} accountId
     * @param {number} customerStatementId
     * @param options
     * @returns {Promise}
     */
    public async delete(
        userId: number,
        accountId: number,
        customerStatementId: number,
        options: any = {}
    ) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create(
            "/customer-statement-export",
            "DELETE"
        );

        const response = await limiter.run(async () =>
            this.ApiAdapter.delete(
                `/v1/user/${userId}/monetary-account/${accountId}/customer-statement/${customerStatementId}`
            )
        );

        return response.Response;
    }

    /**
     * @param {number} userId
     * @param {number} accountId
     * @param options
     * @returns {Promise}
     */
    public async list(userId: number, accountId: number, options: any = {}) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create(
            "/customer-statement-export",
            "LIST"
        );

        const response = await limiter.run(async () =>
            this.ApiAdapter.get(
                `/v1/user/${userId}/monetary-account/${accountId}/customer-statement`
            )
        );

        return response.Response;
    }
}
