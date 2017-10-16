import ApiAdapter from "../ApiAdapter";
import Session from "../Session";
import ApiEndpointInterface from "../Interfaces/ApiEndpointInterface";

export default class MonetaryAccount implements ApiEndpointInterface {
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
     *
     * @param options
     * @returns {Promise<any>}
     */
    public async get(
        userId: number,
        monetaryAccountId: number,
        options: any = {}
    ) {
        const response = await this.ApiAdapter.get(
            `/v1/user/${userId}/monetary-account/${monetaryAccountId}`
        );

        // return raw respone image
        return response;
    }
    /**
     *
     * @param options
     * @returns {Promise<any>}
     */
    public async list(userId: number, options: any = {}) {
        const response = await this.ApiAdapter.get(
            `/v1/user/${userId}/monetary-account`
        );

        // return raw respone image
        return response.Response;
    }
}
