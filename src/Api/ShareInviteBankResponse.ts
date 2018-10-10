import ApiAdapter from "../ApiAdapter";
import Session from "../Session";
import ApiEndpointInterface from "../Interfaces/ApiEndpointInterface";
import PaginationOptions from "../Types/PaginationOptions";
import {
    ShareInviteBankInquiryPostOptions,
    ShareInviteBankInquiryPostShareDetail,
    ShareInviteBankInquiryPostStatus
} from "../Types/ShareInviteBankInquiry";
import CounterpartyAlias from "../Types/CounterpartyAlias";
import { ShareInviteBankResponsePutStatus } from "../Types/ShareInviteBankResponse";

export default class ShareInviteBankResponse implements ApiEndpointInterface {
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
     * @param {number} accountId
     * @param {PaginationOptions} options
     * @returns {Promise<void>}
     */
    public async get(
        userId: number,
        shareInviteBankResponseId: number,
        options: PaginationOptions = {
            count: 200,
            newer_id: false,
            older_id: false
        }
    ) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/share-invite-bank-response", "GET");

        const response = await limiter.run(async () =>
            this.ApiAdapter.get(`/v1/user/${userId}/share-invite-bank-response/${shareInviteBankResponseId}`)
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

        const response = await limiter.run(async () =>
            this.ApiAdapter.get(
                `/v1/user/${userId}/share-invite-bank-response`,
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
     * @param {CounterpartyAlias} counterpartyAlias
     * @param {ShareInviteBankInquiryPostShareDetail} shareDetail
     * @param {ShareInviteBankInquiryPostStatus} status
     * @param {ShareInviteBankInquiryPostOptions} options
     * @returns {Promise<any>}
     */
    public async put(userId: number, shareInviteBankResponseId: number, status: ShareInviteBankResponsePutStatus) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/share-invite-bank-response", "PUT");

        const response = await limiter.run(async () =>
            this.ApiAdapter.put(`/v1/user/${userId}/share-invite-bank-response/${shareInviteBankResponseId}`, {
                status: status
            })
        );

        return response.Response;
    }
}
