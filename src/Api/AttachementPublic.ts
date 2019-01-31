import ApiAdapter from "../ApiAdapter";
import Session from "../Session";
import ApiEndpointInterface from "../Interfaces/ApiEndpointInterface";

export default class AttachmentPublic implements ApiEndpointInterface {
    ApiAdapter: ApiAdapter;
    Session: Session;

    /**
     * @param {ApiAdapter} ApiAdapter
     */
    constructor(ApiAdapter: ApiAdapter) {
        this.ApiAdapter = ApiAdapter;
        this.Session = ApiAdapter.Session;
    }

    public async post(buffer: Buffer, contentType: string, options: any = {}): Promise<string> {
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/attachment-public", "POST");

        // do the actual call
        const response = await limiter.run(async () =>
            this.ApiAdapter.post(
                `/v1/attachment-public`,
                buffer,
                {
                    "Content-Type": contentType,
                    "X-Bunq-Attachment-Description": "Default description"
                },
                {
                    includesFile: true
                }
            )
        );

        return response.Response[0].Uuid.uuid;
    }
}
