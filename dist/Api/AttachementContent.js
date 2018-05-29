"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AttachementContent {
    /**
     * @param {ApiAdapter} ApiAdapter
     */
    constructor(ApiAdapter) {
        this.ApiAdapter = ApiAdapter;
        this.Session = ApiAdapter.Session;
    }
    /**
     *
     * @param options
     * @returns {Promise<any>}
     */
    async get(attachmendUUID, options = { base64: true }) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/attachment-public/content", "GET");
        const response = await limiter.run(async () => this.ApiAdapter.get(`/v1/attachment-public/${attachmendUUID}/content`, {}, {
            axiosOptions: {
                responseType: "arraybuffer"
            }
        }));
        // return data as base64
        if (options.base64 === true) {
            return new Promise((resolve, reject) => {
                if (response instanceof Buffer) {
                    // buffers are simply encoded as base64
                    resolve(response.toString("base64"));
                }
                else {
                    const blob = new Blob([response], { type: "image/png" });
                    // create a new filereader and transform response blob data into a base64 url
                    const reader = new FileReader();
                    reader.readAsDataURL(blob);
                    reader.onload = () => resolve(reader.result);
                    reader.onerror = error => reject(error);
                }
            });
        }
        // return raw respone image
        return response;
    }
}
exports.default = AttachementContent;
