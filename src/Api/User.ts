import ApiAdapter from "../ApiAdapter";
import Session from "../Session";
import ApiEndpointInterface from "../Interfaces/ApiEndpointInterface";

export default class User implements ApiEndpointInterface {
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
     * @param options
     * @returns {Promise<any>}
     */
    public async get(userId: number, options: any = {}) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create(
            "/user",
            "GET"
        );

        const response = await limiter.run(async () =>
            this.ApiAdapter.get(`/v1/user/${userId}`)
        );

        return response.Response[0];
    }

    /**
     * @param options
     * @returns {Promise<any>}
     */
    public async list(options: any = {}) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create(
            "/user",
            "LIST"
        );

        const response = await limiter.run(async () =>
            this.ApiAdapter.get(`/v1/user`)
        );

        return response.Response[0];
    }
}
