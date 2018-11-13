import ApiAdapter from "../ApiAdapter";
import Session from "../Session";
import ApiEndpointInterface from "../Interfaces/ApiEndpointInterface";
import PaginationOptions from "../Types/PaginationOptions";
import Amount from "../Types/Amount";
import MonetaryAccountPutRequest from "../Types/MonetaryAccountPutRequest";

export default class MonetaryAccountJoint implements ApiEndpointInterface {
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
     * @param {number} userId
     * @param {number} monetaryAccountJointId
     * @param options
     * @returns {Promise<any>}
     */
    public async get(userId: number, monetaryAccountJointId: number, options: any = {}) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/monetary-account-joint", "GET");

        const response = await limiter.run(async () =>
            this.ApiAdapter.get(`/v1/user/${userId}/monetary-account-joint/${monetaryAccountJointId}`)
        );

        return response.Response[0];
    }

    /**
     * @param {number} userId
     * @param {PaginationOptions} options
     * @returns {Promise<void>}
     */
    public async list(
        userId: number,
        options: PaginationOptions = {
            count: 25,
            newer_id: false,
            older_id: false
        }
    ) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/monetary-account-joint", "LIST");

        const response = await limiter.run(async () => this.ApiAdapter.get(`/v1/user/${userId}/monetary-account-joint`));

        return response.Response;
    }

    /**
     * @param {number} userId
     * @param {number} accountId
     * @param {monetaryAccountPutRequest} MonetaryAccountPutRequest
     * @param options
     * @returns {Promise<any>}
     */
    public async put(
        userId: number,
        accountId: number,
        monetaryAccountPutRequest: MonetaryAccountPutRequest,
        options: any = {}
    ) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/monetary-account-joint", "PUT");

        const response = await limiter.run(async () =>
            this.ApiAdapter.put(`/v1/user/${userId}/monetary-account-joint/${accountId}`, monetaryAccountPutRequest)
        );

        return response.Response;
    }

    /**
     * @param {number} userId
     * @param {number} accountId
     * @param {"CANCELLED"} status
     * @param {"REDEMPTION_VOLUNTARY"} sub_status
     * @param {string} reason
     * @param options
     * @returns {Promise<any>}
     */
    public async putCancel(
        userId: number,
        accountId: number,
        status: "CANCELLED",
        sub_status: "REDEMPTION_VOLUNTARY",
        reason: string,
        options: any = {}
    ) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/monetary-account-joint", "PUT");

        const response = await limiter.run(async () =>
            this.ApiAdapter.put(`/v1/user/${userId}/monetary-account-joint/${accountId}`, {
                status: status,
                sub_status: sub_status,
                reason: "OTHER",
                reason_description: reason
            })
        );

        return response.Response;
    }
}
