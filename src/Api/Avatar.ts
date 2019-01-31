import ApiAdapter from "../ApiAdapter";
import Session from "../Session";
import ApiEndpointInterface from "../Interfaces/ApiEndpointInterface";

export default class Avatar implements ApiEndpointInterface {
    ApiAdapter: ApiAdapter;
    Session: Session;

    /**
     * @param {ApiAdapter} ApiAdapter
     */
    constructor(ApiAdapter: ApiAdapter) {
        this.ApiAdapter = ApiAdapter;
        this.Session = ApiAdapter.Session;
    }

    public async post(attachmentUuid: string, options: any = {}): Promise<string> {
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/avatar", "POST");

        // do the actual call
        const response = await limiter.run(async () =>
            this.ApiAdapter.post(`/v1/avatar`, {
                attachment_public_uuid: attachmentUuid
            })
        );

        return response.Response[0].Uuid.uuid;
    }
}
