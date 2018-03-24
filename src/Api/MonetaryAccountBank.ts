import ApiAdapter from "../ApiAdapter";
import Session from "../Session";
import ApiEndpointInterface from "../Interfaces/ApiEndpointInterface";
import PaginationOptions from "../Types/PaginationOptions";
import Amount from "../Types/Amount";

export default class MonetaryAccountBank implements ApiEndpointInterface {
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
     * @param {number} monetaryAccountBankId
     * @param options
     * @returns {Promise<any>}
     */
    public async get(
        userId: number,
        monetaryAccountBankId: number,
        options: any = {}
    ) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create(
            "/monetary-account-bank",
            "GET"
        );

        const response = await limiter.run(async () =>
            this.ApiAdapter.get(
                `/v1/user/${userId}/monetary-account-bank/${monetaryAccountBankId}`
            )
        );

        return response.Response[0];
    }

    /**
     * @param {number} userId
     * @returns {Promise<void>}
     */
    public async list(userId: number) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create(
            "/monetary-account-bank",
            "LIST"
        );

        const response = await limiter.run(async () =>
            this.ApiAdapter.get(`/v1/user/${userId}/monetary-account-bank`)
        );

        return response.Response;
    }

    /**
     * @param {number} userId
     * @param {string} currency
     * @param {string} description
     * @param {Amount} dailyLimit
     * @param {string} color
     * @param options
     * @returns {Promise<void>}
     */
    public async post(
        userId: number,
        currency: string,
        description: string,
        dailyLimit: Amount,
        color: string,
        options: any = {}
    ) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create(
            "/monetary-account-bank",
            "POST"
        );

        const response = await limiter.run(async () =>
            this.ApiAdapter.post(`/v1/user/${userId}/monetary-account-bank`, {
                currency: currency,
                description: description,
                daily_limit: {
                    value: dailyLimit,
                    currency: currency
                },
                setting: {
                    color: color,
                    default_avatar_status: "AVATAR_DEFAULT"
                }
            })
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
        const limiter = this.ApiAdapter.RequestLimitFactory.create(
            "/monetary-account-bank",
            "PUT"
        );

        const response = await limiter.run(async () =>
            this.ApiAdapter.put(
                `/v1/user/${userId}/monetary-account-bank/${accountId}`,
                {
                    status: status,
                    sub_status: sub_status,
                    reason: "OTHER",
                    reason_description: reason
                }
            )
        );

        return response.Response;
    }
}
