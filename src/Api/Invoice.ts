import ApiAdapter from "../ApiAdapter";
import Session from "../Session";
import ApiEndpointInterface from "../Interfaces/ApiEndpointInterface";
import PaginationOptions from "../Types/PaginationOptions";

export default class Invoice implements ApiEndpointInterface {
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
     * @param {number} invoiceId
     * @param options
     * @returns {Promise<any>}
     */
    public async get(userId: number, invoiceId: number, options: any = {}) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/invoice", "GET");

        const response = await limiter.run(async () => this.ApiAdapter.post(`/v1/user/${userId}/invoice/${invoiceId}`));

        return response.Response;
    }

    /**
     * @param {number} userId
     * @param {PaginationOptions} options
     * @returns {Promise<any>}
     */
    public async list(
        userId: number,
        options: PaginationOptions = {
            count: 25,
            newer_id: false,
            older_id: false
        }
    ) {
        const params: any = {};

        if (options.count !== undefined) {
            params.count = options.count;
        }
        if (options.newer_id !== false && options.newer_id !== undefined) {
            params.newer_id = options.newer_id;
        }
        if (options.older_id !== false && options.older_id !== undefined) {
            params.older_id = options.older_id;
        }

        const limiter = this.ApiAdapter.RequestLimitFactory.create("/invoice", "LIST");

        const response = await limiter.run(async () =>
            this.ApiAdapter.get(
                `/v1/user/${userId}/invoice`,
                {},
                {
                    axiosOptions: {
                        params: params
                    }
                }
            )
        );

        return response.Response;
    }
    /**
     * @param {number} userId
     * @param {number} monetaryAccountId
     * @param {number} invoiceId
     * @param options
     * @returns {Promise<any>}
     */
    public async getMonetaryAccount(userId: number, monetaryAccountId: number, invoiceId: number, options: any = {}) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/monetary-account/invoice", "GET");

        const response = await limiter.run(async () =>
            this.ApiAdapter.post(`/v1/user/${userId}/monetary-account/${monetaryAccountId}/invoice/${invoiceId}`)
        );

        return response.Response;
    }

    /**
     * @param {number} userId
     * @param {number} monetaryAccountId
     * @param {PaginationOptions} options
     * @returns {Promise<any>}
     */
    public async listMonetaryAccount(
        userId: number,
        monetaryAccountId: number,
        options: PaginationOptions = {
            count: 25,
            newer_id: false,
            older_id: false
        }
    ) {
        const params: any = {};

        if (options.count !== undefined) {
            params.count = options.count;
        }
        if (options.newer_id !== false && options.newer_id !== undefined) {
            params.newer_id = options.newer_id;
        }
        if (options.older_id !== false && options.older_id !== undefined) {
            params.older_id = options.older_id;
        }

        const limiter = this.ApiAdapter.RequestLimitFactory.create("/monetary-account/invoice", "LIST");

        const response = await limiter.run(async () =>
            this.ApiAdapter.get(
                `/v1/user/${userId}/invoice`,
                {},
                {
                    axiosOptions: {
                        params: params
                    }
                }
            )
        );

        return response.Response;
    }
}
