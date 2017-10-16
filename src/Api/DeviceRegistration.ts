import ApiAdapter from "../ApiAdapter";
import Session from "../Session";
import ApiEndpointInterface from "../Interfaces/ApiEndpointInterface";

export default class DeviceRegistration implements ApiEndpointInterface {
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
    public async add(options: any = { description: "My Device" }) {
        const response = await this.ApiAdapter.post("/v1/device-server", {
            description: options.description,
            // permitted_ips: this.Session.allowdIps.map(ip => {
            //     return { ipv4: ip };
            // }),
            secret: this.Session.apiKey
        });

        // return the device id
        return response.Response[0].Id.id;
    }

    /**
     *
     * @param options
     * @returns {Promise<any>}
     */
    public async get(options: any = { deviceId: null }) {
        if (options.deviceId === null) {
            // if none is set we default to our current deviceId
            options.deviceId = this.Session.deviceId;
        }
        const response = await this.ApiAdapter.get(
            `/v1/device-server/${options.deviceId}`
        );

        // return the device id
        return response.Response[0].Id.id;
    }
}
