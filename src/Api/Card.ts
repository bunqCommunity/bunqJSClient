import ApiAdapter from "../ApiAdapter";
import Session from "../Session";
import ApiEndpointInterface from "../Interfaces/ApiEndpointInterface";
import PaginationOptions from "../Types/PaginationOptions";
import CountryPermissionCollection from "../Types/CountryPermissionCollection";
import LimitCollection from "../Types/LimitCollection";
import PinCodeAssignmentCollection from "../Types/PinCodeAssignmentCollection";
import Amount from "../Types/Amount";
import MagStripePermission from "../Types/MagStripePermission";

export default class Card implements ApiEndpointInterface {
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
     * @param options
     * @returns {Promise<any>}
     */
    public async get(userId: number, cardId: number, options: any = {}) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/card", "GET");

        const response = await limiter.run(async axiosClient =>
            this.ApiAdapter.get(`/v1/user/${userId}/card/${cardId}`, {}, {}, axiosClient)
        );

        return response.Response;
    }

    /**
     * @param {number} userId
     * @param {CardListOptions} options
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
        const params: any = {};

        if (options.count !== undefined) {
            params.count = options.count;
        }
        if (options.newer_id !== false && options.newer_id !== undefined) {
            params.newer_id = options.newer_id;
        }
        if (options.older_id !== false && options.older_id !== undefined) {
            params.older_id = options.older_id;
        }

        const limiter = this.ApiAdapter.RequestLimitFactory.create("/card", "LIST");

        const response = await limiter.run(async axiosClient =>
            this.ApiAdapter.get(
                `/v1/user/${userId}/card`,
                {},
                {
                    axiosOptions: {
                        params: params
                    }
                },
                axiosClient
            )
        );

        return response.Response;
    }

    /**
     * @param {number} userId
     * @param {number} cardId
     * @param {string} pinCode
     * @param {string} activationCode
     * @param {string} status
     * @param {Amount} cardLimit
     * @param {Limit} limits
     * @param {MagStripePermission} magStripePermission
     * @param {CountryPermissionCollection} countryPermissions
     * @param {PinCodeAssignmentCollection} pinCodeAssignment
     * @param {number} monetaryAccountIdFallback
     * @param options
     * @returns {Promise<any>}
     */
    public async update(
        userId: number,
        cardId: number,
        pinCode: string = null,
        activationCode: string = null,
        status: string = null,
        cardLimit: Amount = null,
        limits: LimitCollection = null,
        countryPermissions: CountryPermissionCollection = null,
        pinCodeAssignment: PinCodeAssignmentCollection = null,
        monetaryAccountIdFallback: number = null,
        options: any = {}
    ) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/card", "PUT");

        const data: any = {};
        if (pinCode) data.pin_code = pinCode;
        if (activationCode) data.activation_code = activationCode;
        if (status) data.status = status;
        if (cardLimit) data.card_limit = cardLimit;
        if (limits) data.limits = limits;
        if (countryPermissions) data.country_permissions = countryPermissions;
        if (pinCodeAssignment) data.pin_code_assignment = pinCodeAssignment;
        if (monetaryAccountIdFallback) data.monetary_account_id_fallback = monetaryAccountIdFallback;

        const response = await limiter.run(async axiosClient =>
            this.ApiAdapter.put(`/v1/user/${userId}/card/${cardId}`, data, {}, { isEncrypted: true }, axiosClient)
        );

        return response.Response;
    }
}
