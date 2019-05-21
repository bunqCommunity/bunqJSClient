import ApiAdapter from "../ApiAdapter";
import Session from "../Session";
import ApiEndpointInterface from "../Interfaces/ApiEndpointInterface";

export default class CustomerStatementExportContent implements ApiEndpointInterface {
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
     * @returns {Promise<Blob|Buffer>}
     */
    public async list(
        userId: number,
        accountId: number,
        customerStatementId: number,
        options: any = {}
    ): Promise<Blob | Buffer> {
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/customer-statement-export/content", "LIST");

        const response = await limiter.run(async axiosClient =>
            this.ApiAdapter.get(
                `/v1/user/${userId}/monetary-account/${accountId}/customer-statement/${customerStatementId}/content`,
                {},
                {
                    axiosOptions: {
                        responseType: "arraybuffer"
                    }
                },
                axiosClient
            )
        );

        if (typeof Blob === "function") {
            return new Blob([response]);
        }

        return response;
    }
}
