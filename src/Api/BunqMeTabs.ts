import ApiAdapter from "../ApiAdapter";
import Session from "../Session";
import ApiEndpointInterface from "../Interfaces/ApiEndpointInterface";
import Amount from "../Types/Amount";
import PaginationOptions from "../Types/PaginationOptions";

export default class BunqMeTabs implements ApiEndpointInterface {
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
     * @param {number} monetaryAccountId
     * @param {number} paymentId
     * @param options
     * @returns {Promise<void>}
     */
    public async get(
        userId: number,
        monetaryAccountId: number,
        tabId: number,
        options: any = {}
    ) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create(
            "/bunqme-tab",
            "GET"
        );

        const response = await limiter.run(async () =>
            this.ApiAdapter.get(
                `/v1/user/${userId}/monetary-account/${monetaryAccountId}/bunqme-tab/${tabId}`
            )
        );

        return response.Response[0];
    }

    /**
     * @param {number} userId
     * @param {number} monetaryAccountId
     * @param {PaymentsListOptions} options
     * @returns {Promise<void>}
     */
    public async list(
        userId: number,
        monetaryAccountId: number,
        options: PaginationOptions = {
            count: 50,
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

        const limiter = this.ApiAdapter.RequestLimitFactory.create(
            "/bunqme-tab",
            "LIST"
        );

        const response = await limiter.run(async () =>
            this.ApiAdapter.get(
                `/v1/user/${userId}/monetary-account/${monetaryAccountId}/bunqme-tab`,
                {},
                {
                    axiosOptions: {
                        params: params
                    }
                }
            )
        );

        // return raw respone image
        return response.Response;
    }

    /**
     * @param {number} userId
     * @param {number} monetaryAccountId
     * @param {string} description
     * @param {Amount} amount
     * @param options
     * @returns {Promise<void>}
     */
    public async post(
        userId: number,
        monetaryAccountId: number,
        description: string,
        amount: Amount,
        options: any = {}
    ) {
        const params: any = {
            description: description,
            amount_inquired: amount
        };

        if (options.redirect_url) {
            params.redirect_url = options.redirect_url;
        }

        const limiter = this.ApiAdapter.RequestLimitFactory.create(
            "/bunqme-tab",
            "POST"
        );

        const response = await limiter.run(async () =>
            this.ApiAdapter.post(
                `/v1/user/${userId}/monetary-account/${monetaryAccountId}/bunqme-tab`,
                {
                    bunqme_tab_entry: params
                }
            )
        );

        // return raw respone image
        return response.Response;
    }

    /**
     * @param {number} userId
     * @param {number} monetaryAccountId
     * @param {number} bunqMeTabId
     * @param {string} status
     * @returns {Promise<void>}
     */
    public async put(
        userId: number,
        monetaryAccountId: number,
        bunqMeTabId: number,
        status: string = "CANCELLED"
    ) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create(
            "/bunqme-tab",
            "PUT"
        );

        const response = await limiter.run(async () =>
            this.ApiAdapter.put(
                `/v1/user/${userId}/monetary-account/${monetaryAccountId}/bunqme-tab/${bunqMeTabId}`,
                {
                    status: status
                }
            )
        );

        // return raw respone image
        return response.Response;
    }
}
