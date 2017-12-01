import ApiAdapter from "../ApiAdapter";
import Session from "../Session";
import ApiEndpointInterface from "../Interfaces/ApiEndpointInterface";

export default class AttachementContent implements ApiEndpointInterface {
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
    public async get(attachmendUUID: string, options: any = { base64: true }) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create(
            "/attachment-public/content",
            "GET"
        );

        const response = await limiter.run(async () =>
            this.ApiAdapter.get(
                `/v1/attachment-public/${attachmendUUID}/content`,
                {},
                {
                    axiosOptions: {
                        responseType: "blob"
                    }
                }
            )
        );

        // return data as base64
        if (options.base64 === true) {
            return new Promise(resolve => {
                // create a new filereader and transform response blob data into a base64 url
                const reader = new FileReader();
                reader.readAsDataURL(response);
                reader.onload = () => resolve(reader.result);
            });
        }

        // return raw respone image
        return response;
    }
}
