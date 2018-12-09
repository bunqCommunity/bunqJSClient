import ApiAdapter from "../ApiAdapter";
import Session from "../Session";
import ApiEndpointInterface from "../Interfaces/ApiEndpointInterface";
import PaginationOptions from "../Types/PaginationOptions";
import AmountValue from "../Types/AmountValue";
import MonetaryAccountPutRequest from "../Types/MonetaryAccountPutRequest";

export default class MonetaryAccountSavings implements ApiEndpointInterface {
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
     * @param {number} monetaryAccountSavingsId
     * @param options
     * @returns {Promise<any>}
     */
    public async get(userId: number, monetaryAccountSavingsId: number, options: any = {}) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/monetary-account-savings", "GET");

        const response = await limiter.run(async () =>
            this.ApiAdapter.get(`/v1/user/${userId}/monetary-account-savings/${monetaryAccountSavingsId}`)
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
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/monetary-account-savings", "LIST");

        const response = await limiter.run(async () =>
            this.ApiAdapter.get(`/v1/user/${userId}/monetary-account-savings`)
        );

        return response.Response;
    }

    /**
     * @param {number} userId
     * @param {string} currency
     * @param {string} description
     * @param {AmountValue} dailyLimit
     * @param {string} color
     * @param {AmountValue} savingsGoal
     * @param options
     * @returns {Promise<void>}
     */
    public async post(
        userId: number,
        currency: string,
        description: string,
        dailyLimit: AmountValue,
        color: string,
        savingsGoal: AmountValue,
        options: any = {}
    ) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/monetary-account-savings", "POST");

        const requestBody = {
            currency: currency,
            description: description,
            daily_limit: {
                value: dailyLimit + "",
                currency: currency
            },
            setting: {
                color: color,
                default_avatar_status: "AVATAR_DEFAULT"
            },
            savings_goal: {
                currency: currency,
                value: savingsGoal + ""
            }
        };

        const response = await limiter.run(async () =>
            this.ApiAdapter.post(`/v1/user/${userId}/monetary-account-savings`, requestBody)
        );

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
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/monetary-account-savings", "PUT");

        const response = await limiter.run(async () =>
            this.ApiAdapter.put(`/v1/user/${userId}/monetary-account-savings/${accountId}`, monetaryAccountPutRequest)
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
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/monetary-account-savings", "PUT");

        const response = await limiter.run(async () =>
            this.ApiAdapter.put(`/v1/user/${userId}/monetary-account-savings/${accountId}`, {
                status: status,
                sub_status: sub_status,
                reason: "OTHER",
                reason_description: reason
            })
        );

        return response.Response;
    }
}
