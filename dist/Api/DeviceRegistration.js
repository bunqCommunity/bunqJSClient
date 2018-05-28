"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DeviceRegistration {
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
    async add(options = { description: "My Device", permitted_ips: [] }) {
        const postData = {
            description: options.description,
            secret: this.Session.apiKey
        };
        if (options.permitted_ips.length > 0) {
            postData["permitted_ips"] = options.permitted_ips;
        }
        const response = await this.ApiAdapter.post("/v1/device-server", postData, {}, {
            ignoreVerification: true
        });
        // return the device id
        return response.Response[0].Id.id;
    }
    /**
     *
     * @param options
     * @returns {Promise<any>}
     */
    async get(options = { deviceId: null }) {
        if (options.deviceId === null) {
            // if none is set we default to our current deviceId
            options.deviceId = this.Session.deviceId;
        }
        const response = await this.ApiAdapter.get(`/v1/device-server/${options.deviceId}`);
        // return the device id
        return response.Response[0].Id.id;
    }
}
exports.default = DeviceRegistration;
