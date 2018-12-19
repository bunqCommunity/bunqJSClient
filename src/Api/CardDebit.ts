import ApiAdapter from "../ApiAdapter";
import Session from "../Session";
import ApiEndpointInterface from "../Interfaces/ApiEndpointInterface";
import PinCodeAssignmentCollection from "../Types/PinCodeAssignmentCollection";
import CounterpartyAlias from "../Types/CounterpartyAlias";
import CardType from "../Types/CardType";

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
     * @param {string} name
     * @param {string} description
     * @param {CounterpartyAlias} alias
     * @param {CardType} cardType
     * @param {PinCodeAssignmentCollection} assignments
     * @param options
     * @returns {Promise<any>}
     */
    public async post(userId: number, name: string, description: string, alias: CounterpartyAlias, cardType: CardType, assignments: PinCodeAssignmentCollection, options: any = {}) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/card-debit", "POST");

        const response = await limiter.run(async () => this.ApiAdapter.post(`/v1/user/${userId}/card-debit`), {
            second_line: description,
            name_on_card: name,
            alias: alias,
            type: cardType,
            pin_code_assignment: assignments,
            monetary_account_id_fallback: 0
        });

        return response.Response;
    }
}