import ApiAdapter from "../ApiAdapter";
import Session from "../Session";
import ApiEndpointInterface from "../Interfaces/ApiEndpointInterface";
import Amount from "../Types/Amount";
import CounterpartyAlias from "../Types/CounterpartyAlias";
import PaginationOptions from "../Types/PaginationOptions";
import CounterPartyAliasCollection from "../Types/CounterPartyAliasCollection";

export default class DraftPayment implements ApiEndpointInterface {
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
            "/draft-payment"
        );

        const response = await limiter.run(async () =>
            this.ApiAdapter.get(
                `/v1/user/${userId}/monetary-account/${monetaryAccountId}/draft-payment/${paymentId}`
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
            "/draft-payment",
            "LIST"
        );

        const response = await limiter.run(async () =>
            this.ApiAdapter.get(
                `/v1/user/${userId}/monetary-account/${monetaryAccountId}/draft-payment`,
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
     * @param {CounterpartyAlias|CounterPartyAliasCollection} counterpartyAlias
     * @param options
     * @returns {Promise<void>}
     */
    public async post(
        userId: number,
        monetaryAccountId: number,
        description: string,
        amount: Amount,
        counterparty: CounterpartyAlias | CounterPartyAliasCollection,
        options: any = {}
    ) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create(
            "/draft-payment",
            "POST"
        );

        const entries = [];
        if (Array.isArray(counterparty)) {
            counterparty.map(counterpartyAlias => {
                entries.push({
                    counterparty_alias: counterpartyAlias,
                    description: description,
                    amount: amount
                });
            });
        } else {
            entries.push({
                counterparty_alias: counterparty,
                description: description,
                amount: amount
            });
        }

        const response = await limiter.run(async () =>
            this.ApiAdapter.post(
                `/v1/user/${userId}/monetary-account/${monetaryAccountId}/draft-payment`,
                {
                    entries: entries,
                    number_of_required_accepts: 1
                }
            )
        );

        return response.Response;
    }
}
