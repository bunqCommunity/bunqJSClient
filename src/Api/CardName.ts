import ApiAdapter from "../ApiAdapter";
import Session from "../Session";
import ApiEndpointInterface from "../Interfaces/ApiEndpointInterface";

export default class CardName implements ApiEndpointInterface {
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
     * @param {any} options
     * @returns {Promise<void>}
     */
    public async list(userId: number, options = {}) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/card-name", "LIST");

        const response = await limiter.run(async () => this.ApiAdapter.get(`/v1/user/${userId}/card-name`));

        return response.Response;
    }
}
