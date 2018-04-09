import ApiAdapter from "../ApiAdapter";
import Session from "../Session";
import ApiEndpointInterface from "../Interfaces/ApiEndpointInterface";
import Schedule from "../Types/Schedule";
import PaymentRequestObjectCollection from "../Types/PaymentRequestObjectCollection";

export default class SchedulePaymentBatch implements ApiEndpointInterface {
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
    public async delete(
        userId: number,
        monetaryAccountId: number,
        paymentId: number,
        options: any = {}
    ) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create(
            "/schedule-payment-batch",
            "DELETE"
        );

        const response = await limiter.run(async () =>
            this.ApiAdapter.delete(
                `/v1/user/${userId}/monetary-account/${monetaryAccountId}/schedule-payment-batch/${paymentId}`
            )
        );

        return response.Response;
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
        paymentRequestObjectCollection: PaymentRequestObjectCollection,
        schedule: Schedule,
        options: any = {}
    ) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create(
            "/schedule-payment-batch",
            "POST"
        );

        const response = await limiter.run(async () =>
            this.ApiAdapter.post(
                `/v1/user/${userId}/monetary-account/${monetaryAccountId}/schedule-payment-batch`,
                {
                    payments: paymentRequestObjectCollection,
                    schedule: schedule
                }
            )
        );

        return response.Response;
    }
}
