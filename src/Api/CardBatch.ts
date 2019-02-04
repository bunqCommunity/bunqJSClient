import ApiAdapter from "../ApiAdapter";
import Session from "../Session";
import ApiEndpointInterface from "../Interfaces/ApiEndpointInterface";

export default class CardBatch implements ApiEndpointInterface {
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
     * @param {cards[]} cards
     * @param options
     * @returns {Promise<any>}
     */
    public async post(userId: number, cards: any[], options: any = {}) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/card-batch", "POST");

        const response = await limiter.run(async () =>
            this.ApiAdapter.post(
                `/v1/user/${userId}/card-batch`,
                {
                    cards: cards
                },
                {},
                { isEncrypted: true }
            )
        );

        return response.Response;
    }
}
