import ApiAdapter from "../ApiAdapter";
import Session from "../Session";
import ApiEndpointInterface from "../Interfaces/ApiEndpointInterface";

export default class SessionServer implements ApiEndpointInterface {
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
        const result = await this.ApiAdapter.post(
            "/v1/session-server",
            {
                secret: this.Session.apiKey
            },
            {},
            {
                ignoreVerification: true
            }
        );

        return {
            id: result.Response[0].Id.id,
            token: result.Response[1].Token,
            user_info: result.Response[2]
        };
    }

    /**
     * @param options
     * @returns {Promise<{id; token: any; user_info}>}
     */
    public async delete(options: any = {}) {
        await this.ApiAdapter.delete(`/v1/session/${this.Session.sessionId}`);

        return true;
    }
}
