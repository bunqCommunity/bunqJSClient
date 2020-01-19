import ApiAdapter from "../ApiAdapter";
import Session from "../Session";
import ApiEndpointInterface from "../Interfaces/ApiEndpointInterface";
import { arrayBufferToBase64 } from "../Helpers/FileReaderHelper";

export default class AttachmentContent implements ApiEndpointInterface {
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
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/attachment-public/content", "GET");

        const response = await limiter.run(async axiosClient =>
            this.ApiAdapter.get(
                `/v1/attachment-public/${attachmendUUID}/content`,
                {},
                {
                    axiosOptions: {
                        responseType: "arraybuffer"
                    }
                },
                axiosClient
            )
        );

        // return data as base64
        if (options.base64 === true) {
            /* istanbul ignore else - can't be tested for browser */
            if (response instanceof Buffer) {
                // buffers are simply encoded as base64
                return response.toString("base64");
            } else if (typeof FileReader !== "undefined") {
                // turn the array buffer result into a base64 string
                return arrayBufferToBase64(response);
            }

            /* istanbul ignore next line - can't be tested for browser */
            throw new Error("No valid Buffer given and FileReader not available");
        }

        // return raw respone image
        return response;
    }
}
