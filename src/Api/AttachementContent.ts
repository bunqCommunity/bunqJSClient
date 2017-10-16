import ApiAdapter from "../ApiAdapter";
import Session from "../Session";
import ApiEndpointInterface from "../Interfaces/ApiEndpointInterface";

const converterEngine = (input: any) => {
    let uInt8Array = new Uint8Array(input),
        i = uInt8Array.length;
    let biStr = [];
    while (i--) {
        biStr[i] = String.fromCharCode(uInt8Array[i]);
    }
    return btoa(biStr.join(""));
};

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
        const response = await this.ApiAdapter.get(
            `/v1/attachment-public/${attachmendUUID}/content`,
            {},
            {
                axiosOptions: {
                    // we need this as a array buffer
                    responseType: "arraybuffer"
                }
            }
        );

        // return data as base64
        if (options.base64 === true) {
            return new Buffer(response, "binary").toString("base64");
        }

        // return raw respone image
        return response;
    }
}
