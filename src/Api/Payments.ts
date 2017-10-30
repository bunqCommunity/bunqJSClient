import ApiAdapter from "../ApiAdapter";
import Session from "../Session";
import ApiEndpointInterface from "../Interfaces/ApiEndpointInterface";
import CounterpartyAlias from "../Types/CounterpartyAlias";
import Amount from "../Types/Amount";

type PaymentsListOptions = {
    count: number;
    newer_id: number | false;
    older_id: number | false;
};

export default class Payments implements ApiEndpointInterface {
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
     * @param {number} monetaryAccountId
     * @param {number} paymentId
     * @param options
     * @returns {Promise<void>}
     */
    public async get(
        userId: number,
        monetaryAccountId: number,
        paymentId: number,
        options: any = {}
    ) {
        const response = await this.ApiAdapter.get(
            `/v1/user/${userId}/monetary-account/${monetaryAccountId}/payment/${paymentId}`
        );

        // return raw respone image
        return response.Response[0].Payment;
    }

    /**
     * @param {number} userId
     * @param {number} monetaryAccountId
     * @param {PaymentsListOptions} options
     * @returns {Promise<void>}
     */
    public async list(
        userId: number,
        monetaryAccountId: number,
        options: PaymentsListOptions = {
            count: 50,
            newer_id: false,
            older_id: false
        }
    ) {
        const params: any = {
            count: options.count
        };

        if (options.newer_id !== false) {
            params.newer_id = options.newer_id;
        }
        if (options.older_id !== false) {
            params.older_id = options.older_id;
        }

        const response = await this.ApiAdapter.get(
            `/v1/user/${userId}/monetary-account/${monetaryAccountId}/payment`,
            {},
            {
                axiosOptions: {
                    params: params
                }
            }
        );

        // return raw respone image
        return response.Response;
    }

    /**
     * @param {number} userId
     * @param {number} monetaryAccountId
     * @param {string} description
     * @param {Amount} amount
     * @param {CounterpartyAlias} counterpartyAlias
     * @param options
     * @returns {Promise<void>}
     */
    public async post(
        userId: number,
        monetaryAccountId: number,
        description: string,
        amount: Amount,
        counterpartyAlias: CounterpartyAlias,
        options: any = {}
    ) {
        const response = await this.ApiAdapter.post(
            `/v1/user/${userId}/monetary-account/${monetaryAccountId}/payment`,
            {
                counterparty_alias: counterpartyAlias,
                description: description,
                amount: amount
            }
        );

        // return raw respone image
        return response.Response;
    }
}
