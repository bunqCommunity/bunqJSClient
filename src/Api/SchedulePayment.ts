import ApiAdapter from "../ApiAdapter";
import Session from "../Session";
import ApiEndpointInterface from "../Interfaces/ApiEndpointInterface";
import PaymentRequestObject from "../Types/PaymentRequestObject";
import Schedule from "../Types/Schedule";

export default class SchedulePayment implements ApiEndpointInterface {
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
     * @param {PaymentRequestObject} paymentRequestObject
     * @param {Schedule} schedule
     * @param options
     * @returns {Promise<void>}
     */
    public async post(
        userId: number,
        monetaryAccountId: number,
        paymentRequestObject: PaymentRequestObject,
        schedule: Schedule,
        options: any = {}
    ) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create(
            "/schedule-payment",
            "POST"
        );

        const requestObject = {
            payment: paymentRequestObject,
            schedule: schedule
        };

        const response = await limiter.run(async () =>
            this.ApiAdapter.post(
                `/v1/user/${userId}/monetary-account/${monetaryAccountId}/schedule-payment`,
                requestObject
            )
        );

        return response.Response;
    }
}
