import ApiAdapter from "../ApiAdapter";
import Session from "../Session";
import ApiEndpointInterface from "../Interfaces/ApiEndpointInterface";
import PaginationOptions from "../Types/PaginationOptions";

interface EventFilterOptions extends PaginationOptions {
    monetary_account_id?: number | false;
    display_user_event?: 1 | 0;
    status?: "AWAITING_REPLY" | "FINALIZED" | false;
}

export default class Event implements ApiEndpointInterface {
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
     * @param {number} eventId
     * @param options
     * @returns {Promise<void>}
     */
    public async get(userId: number, eventId: number, options: any = {}) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/event");

        const response = await limiter.run(async () => this.ApiAdapter.get(`/v1/user/${userId}/event/${eventId}`));

        return response.Response[0];
    }

    /**
     * @param {number} userId
     * @param {PaginationOptions} options
     * @returns {Promise<void>}
     */
    public async list(
        userId: number,
        options: EventFilterOptions = {
            count: 200,
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
        if (options.monetary_account_id !== false && options.monetary_account_id !== undefined) {
            params.monetary_account_id = options.monetary_account_id;
        }
        if (options.status !== false && options.status !== undefined) {
            params.status = options.status;
        }
        if (options.display_user_event !== undefined) {
            params.display_user_event = options.display_user_event;
        }

        const limiter = this.ApiAdapter.RequestLimitFactory.create("/event", "LIST");

        const response = await limiter.run(async () =>
            this.ApiAdapter.get(
                `/v1/user/${userId}/event`,
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
}
