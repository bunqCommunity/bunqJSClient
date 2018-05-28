import ApiAdapter from "../ApiAdapter";
import Session from "../Session";
import ApiEndpointInterface from "../Interfaces/ApiEndpointInterface";

export default class SandboxUser implements ApiEndpointInterface {
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
     * @param options
     * @returns {Promise<{}>}
     */
    public async post(options: any = {}) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create(
            "/sandbox-user",
            "POST"
        );

        const response = await limiter.run(async () =>
            this.ApiAdapter.post(
                `https://sandbox.public.api.bunq.com/v1/sandbox-user`,
                {},
                {},
                {
                    // no signing and no authentication
                    disableSigning: true,
                    unauthenticated: true,
                    ignoreVerification: true
                }
            )
        );

        return response.Response[0].ApiKey.api_key;
    }
}
