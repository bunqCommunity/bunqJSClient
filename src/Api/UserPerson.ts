import ApiAdapter from "../ApiAdapter";
import Session from "../Session";
import ApiEndpointInterface from "../Interfaces/ApiEndpointInterface";

export default class UserPerson implements ApiEndpointInterface {
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
     * @param {any} userInfo
     * @returns {Promise<void>}
     */
    public async put(
        userId: number,
        userInfo: any
    ) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create(
            "/user-person",
            "PUT"
        );

        const response = await limiter.run(async () =>
            this.ApiAdapter.put(
                `/v1/user-person/${userId}`,
                userInfo
            )
        );

        return response.Response;
    }
}
