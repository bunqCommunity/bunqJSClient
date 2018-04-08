import ApiAdapter from "../ApiAdapter";
import Session from "../Session";
import ApiEndpointInterface from "../Interfaces/ApiEndpointInterface";
import Amount from "../Types/Amount";
import CounterPartyAliasCollection from "../Types/CounterPartyAliasCollection";
import PaginationOptions from "../Types/PaginationOptions";

export default class PaymentBatch implements ApiEndpointInterface {
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
        const limiter = this.ApiAdapter.RequestLimitFactory.create(
            "/payment-batch"
        );

        const response = await limiter.run(async () =>
            this.ApiAdapter.get(
                `/v1/user/${userId}/monetary-account/${monetaryAccountId}/payment-batch/${paymentId}`
            )
        );

        return response.Response[0];
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
        options: PaginationOptions = {
            count: 50,
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

        const limiter = this.ApiAdapter.RequestLimitFactory.create(
            "/payment-batch",
            "LIST"
        );

        const response = await limiter.run(async () =>
            this.ApiAdapter.get(
                `/v1/user/${userId}/monetary-account/${monetaryAccountId}/payment-batch`,
                {},
                {
                    axiosOptions: {
                        params: params
                    }
                }
            )
        );

        return response.Response;
    }

    /**
     * @param {number} userId
     * @param {number} monetaryAccountId
     * @param {string} description
     * @param {Amount} amount
     * @param {CounterPartyAliasCollection} counterpartyAliasCollection
     * @param options
     * @returns {Promise<void>}
     */
    public async post(
        userId: number,
        monetaryAccountId: number,
        description: string,
        amount: Amount,
        counterpartyAliasCollection: CounterPartyAliasCollection,
        options: any = {}
    ) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create(
            "/payment-batch",
            "POST"
        );

        const payments = counterpartyAliasCollection.map(counterpartyAlias => {
            return {
                counterparty_alias: counterpartyAlias,
                description: description,
                amount: amount
            };
        });

        const response = await limiter.run(async () =>
            this.ApiAdapter.post(
                `/v1/user/${userId}/monetary-account/${monetaryAccountId}/payment-batch`,
                { payments: payments }
            )
        );

        return response.Response;
    }
}
