import ApiAdapter from "../ApiAdapter";
import Session from "../Session";
import ApiEndpointInterface from "../Interfaces/ApiEndpointInterface";
import PaginationOptions from "../Types/PaginationOptions";
import RequestResponsePutOptions from "../Types/RequestResponsePutOptions";

export default class RequestResponse implements ApiEndpointInterface {
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
     * @param {number} requestResponseId
     * @returns {Promise<any>}
     */
    public async get(
        userId: number,
        monetaryAccountId: number,
        requestResponseId: number
    ) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create(
            "/request-response",
            "GET"
        );

        const response = await limiter.run(async () =>
            this.ApiAdapter.get(
                `/v1/user/${userId}/monetary-account/${monetaryAccountId}/request-response/${requestResponseId}`
            )
        );

        return response.Response[0];
    }

    /**
     * @param {number} userId
     * @param {number} monetaryAccountId
     * @param {PaymentsListOptions} options
     * @returns {Promise<any>}
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
            "/request-response",
            "LIST"
        );

        const response = await limiter.run(async () =>
            this.ApiAdapter.get(
                `/v1/user/${userId}/monetary-account/${monetaryAccountId}/request-response`,
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
     * @param {number} requestResponseId
     * @param {"ACCEPTED" | "REJECTED"} status
     * @param {RequestResponsePutOptions} options
     * @returns {Promise<void>}
     */
    public async put(
        userId: number,
        monetaryAccountId: number,
        requestResponseId: number,
        status: "ACCEPTED" | "REJECTED",
        options: RequestResponsePutOptions
    ) {
        const defaultOptions = {
            status: status,
            amount_responded: false,
            address_shipping: false,
            address_billing: false,
            ...options
        };

        const requestOptions: any = {
            status: status
        };

        // if request is accepted we set the shipping and amount details
        if (status === "ACCEPTED") {
            requestOptions.amount_responded = defaultOptions.amount_responded;
            if (defaultOptions.address_shipping) {
                requestOptions.address_shipping =
                    defaultOptions.address_shipping;
            }
            if (defaultOptions.address_billing) {
                requestOptions.address_billing = defaultOptions.address_billing;
            }
        }

        const limiter = this.ApiAdapter.RequestLimitFactory.create(
            "/request-response",
            "PUT"
        );

        const response = await limiter.run(async () =>
            this.ApiAdapter.put(
                `/v1/user/${userId}/monetary-account/${monetaryAccountId}/request-response/${requestResponseId}`,
                requestOptions
            )
        );

        return response.Response;
    }
}
