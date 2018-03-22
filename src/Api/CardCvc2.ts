import ApiAdapter from "../ApiAdapter";
import Session from "../Session";
import ApiEndpointInterface from "../Interfaces/ApiEndpointInterface";
import PaginationOptions from "../Types/PaginationOptions";
import RequestResponsePutOptions from "../Types/RequestResponsePutOptions";

export default class CardCvc2 implements ApiEndpointInterface {
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
     * @param {number} requestResponseId
     * @returns {Promise<any>}
     */
    public async get(userId: number, cardId: number, cvc2Id: number) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create(
            "/generated-cvc2",
            "GET"
        );

        const response = await limiter.run(async () =>
            this.ApiAdapter.get(
                `/v1/user/${userId}/card/${cardId}/generated-cvc2/${cvc2Id}`
            )
        );

        return response.Response[0];
    }

    /**
     * @param {number} userId
     * @param {number} cardId
     * @param {any} options
     * @returns {Promise<any>}
     */
    public async list(userId: number, cardId: number, options: any = {}) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create(
            "/generated-cvc2",
            "LIST"
        );

        const response = await limiter.run(async () =>
            this.ApiAdapter.get(
                `/v1/user/${userId}/card/${cardId}/generated-cvc2`
            )
        );

        return response.Response;
    }

    /**
     * @param {number} userId
     * @param {number} cardId
     * @returns {Promise<void>}
     */
    public async post(userId: number, cardId: number, options: any = {}) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create(
            "/generated-cvc2",
            "POST"
        );

        const response = await limiter.run(async () =>
            this.ApiAdapter.put(
                `/v1/user/${userId}/card/${cardId}/generated-cvc2`,
                {},
                {},
                { isEncrypted: true }
            )
        );

        return response.Response[0];
    }
}
