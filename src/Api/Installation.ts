import ApiAdapter from "../ApiAdapter";
import Session from "../Session";
import ApiEndpointInterface from "../Interfaces/ApiEndpointInterface";

export default class Installation implements ApiEndpointInterface {
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
     * @returns {Promise<{id; token: any; serverPublicKey: any}>}
     */
    public async add(options: any = {}) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/installation", "POST");

        const result = await limiter.run(async axiosClient =>
            this.ApiAdapter.post(
                "/v1/installation",
                {
                    client_public_key: this.Session.publicKeyPem
                },
                {},
                {
                    disableVerification: true,
                    disableSigning: true,
                    disableAuthentication: true,
                    skipSessionCheck: true
                },
                axiosClient
            )
        );

        return {
            id: result.Response[0].Id.id,
            token: result.Response[1].Token,
            serverPublicKey: result.Response[2].ServerPublicKey.server_public_key
        };
    }

    /**
     * @param options
     * @returns {Promise<{id; token: any; serverPublicKey: any}>}
     */
    public async get(installationId: number, options: any = {}) {
        const result = await this.ApiAdapter.get(`/v1/installation/${installationId}`);

        return {
            id: result.Response[0].Id.id,
            token: result.Response[1].Token,
            serverPublicKey: result.Response[2].ServerPublicKey.server_public_key
        };
    }
}
