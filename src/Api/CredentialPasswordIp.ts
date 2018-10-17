import ApiAdapter from "../ApiAdapter";
import Session from "../Session";
import ApiEndpointInterface from "../Interfaces/ApiEndpointInterface";
import PaginationOptions from "../Types/PaginationOptions";

export default class CredentialPasswordIp implements ApiEndpointInterface {
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
     * @param {number} credentialPasswordIpId
     * @param options
     * @returns {Promise<void>}
     */
    public async get(userId: number, credentialPasswordIpId: number, options: any = {}) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/credential-password-ip", "GET");

        const response = await limiter.run(async () =>
            this.ApiAdapter.get(`/v1/user/${userId}/credential-password-ip/${credentialPasswordIpId}`)
        );

        return response.Response[0];
    }

    /**
     * @param {number} userId
     * @param {PaymentsListOptions} options
     * @returns {Promise<void>}
     */
    public async list(
        userId: number,
        options: PaginationOptions = {
            count: 200,
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

        const limiter = this.ApiAdapter.RequestLimitFactory.create("/credential-password-ip", "LIST");

        const response = await limiter.run(async () =>
            this.ApiAdapter.get(
                `/v1/user/${userId}/credential-password-ip`,
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
