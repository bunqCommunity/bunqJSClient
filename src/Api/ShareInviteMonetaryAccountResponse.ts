import ApiAdapter from "../ApiAdapter";
import Session from "../Session";
import ApiEndpointInterface from "../Interfaces/ApiEndpointInterface";
import PaginationOptions from "../Types/PaginationOptions";
import { ShareInviteMonetaryAccountInquiryPostStatus } from "../Types/ShareInviteMonetaryAccountInquiry";
import { ShareInviteMonetaryAccountResponsePutStatus } from "../Types/ShareInviteMonetaryAccountResponse";

export default class ShareInviteMonetaryAccountResponse implements ApiEndpointInterface {
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
     * @param {number} shareInviteMonetaryAccountResponseId
     * @param {PaginationOptions} options
     * @returns {Promise<void>}
     */
    public async get(
        userId: number,
        shareInviteMonetaryAccountResponseId: number,
        options: PaginationOptions = {
            count: 200,
            newer_id: false,
            older_id: false
        }
    ): Promise<void> {
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/share-invite-bank-response", "GET");

        const response = await limiter.run(async axiosClient =>
            this.ApiAdapter.get(
                `/v1/user/${userId}/share-invite-bank-response/${shareInviteMonetaryAccountResponseId}`,
                {},
                {},
                axiosClient
            )
        );

        return response.Response;
    }

    /**
     * @param {number} userId
     * @param {PaginationOptions} options
     * @returns {Promise<void>}
     */
    public async list(
        userId: number,
        options: PaginationOptions = {
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

        const limiter = this.ApiAdapter.RequestLimitFactory.create("/share-invite-bank-response", "LIST");

        const response = await limiter.run(async axiosClient =>
            this.ApiAdapter.get(
                `/v1/user/${userId}/share-invite-bank-response`,
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
     * @param {number} shareInviteMonetaryAccountResponseId
     * @param {ShareInviteMonetaryAccountInquiryPostStatus} status
     * @returns {Promise<{}>}
     */
    public async put(
        userId: number,
        shareInviteMonetaryAccountResponseId: number,
        status: ShareInviteMonetaryAccountResponsePutStatus
    ): Promise<any> {
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/share-invite-bank-response", "PUT");

        const response = await limiter.run(async axiosClient =>
            this.ApiAdapter.put(
                `/v1/user/${userId}/share-invite-bank-response/${shareInviteMonetaryAccountResponseId}`,
                {
                    status: status
                },
                {},
                {},
                axiosClient
            )
        );

        return response.Response;
    }
}
