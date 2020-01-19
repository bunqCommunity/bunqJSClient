import ApiAdapter from "../ApiAdapter";
import Session from "../Session";
import ApiEndpointInterface from "../Interfaces/ApiEndpointInterface";
import PaginationOptions from "../Types/PaginationOptions";
import CounterpartyAlias from "../Types/CounterpartyAlias";
import {
    ShareInviteMonetaryAccountInquiryPostOptions,
    ShareInviteMonetaryAccountInquiryPostShareDetail,
    ShareInviteMonetaryAccountInquiryPostStatus
} from "../Types/ShareInviteMonetaryAccountInquiry";

export default class ShareInviteMonetaryAccountInquiry implements ApiEndpointInterface {
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
     * @param {number} shareInviteMonetaryAccountInquiryId
     * @param {PaginationOptions} options
     * @returns {Promise<void>}
     */
    public async get(
        userId: number,
        accountId: number,
        shareInviteMonetaryAccountInquiryId: number,
        options: PaginationOptions = {
            count: 200,
            newer_id: false,
            older_id: false
        }
    ): Promise<void> {
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/share-invite-monetary-account-inquiry", "GET");

        const response = await limiter.run(async axiosClient =>
            this.ApiAdapter.get(
                `/v1/user/${userId}/monetary-account/${accountId}/share-invite-monetary-account-inquiry/${shareInviteMonetaryAccountInquiryId}`,
                {},
                {},
                axiosClient
            )
        );

        return response.Response;
    }

    /**
     * @param {number} userId
     * @param {number} accountId
     * @param {PaginationOptions} options
     * @returns {Promise<void>}
     */
    public async list(
        userId: number,
        accountId: number,
        options: PaginationOptions = {
            count: 200,
            newer_id: false,
            older_id: false
        }
    ): Promise<void> {
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

        const limiter = this.ApiAdapter.RequestLimitFactory.create("/share-invite-monetary-account-inquiry", "LIST");

        const response = await limiter.run(async axiosClient =>
            this.ApiAdapter.get(
                `/v1/user/${userId}/monetary-account/${accountId}/share-invite-monetary-account-inquiry`,
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
     * @param {number} monetaryAccountId
     * @param {CounterpartyAlias} counterpartyAlias
     * @param {ShareInviteMonetaryAccountInquiryPostShareDetail} shareDetail
     * @param {ShareInviteMonetaryAccountInquiryPostStatus} status
     * @param {ShareInviteMonetaryAccountInquiryPostOptions} options
     * @returns {Promise<{}>}
     */
    public async post(
        userId: number,
        monetaryAccountId: number,
        counterpartyAlias: CounterpartyAlias,
        shareDetail: ShareInviteMonetaryAccountInquiryPostShareDetail,
        status: ShareInviteMonetaryAccountInquiryPostStatus = "PENDING",
        options: ShareInviteMonetaryAccountInquiryPostOptions = {
            share_type: "STANDARD"
        }
    ): Promise<any> {
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/share-invite-monetary-account-inquiry", "POST");

        const postData: any = {
            counter_user_alias: counterpartyAlias,
            share_detail: shareDetail,
            status: status
        };

        if (options.share_type) {
            postData.share_type = options.share_type;
        }
        if (options.start_date) {
            postData.start_date = options.start_date;
        }
        if (options.end_date) {
            postData.end_date = options.end_date;
        }

        const response = await limiter.run(async axiosClient =>
            this.ApiAdapter.post(
                `/v1/user/${userId}/monetary-account/${monetaryAccountId}/share-invite-monetary-account-inquiry`,
                postData,
                {},
                {},
                axiosClient
            )
        );

        return response.Response;
    }

    /**
     * @param {number} userId
     * @param {number} monetaryAccountId
     * @param {number} shareInviteMonetaryAccountInquiryId
     * @param {CounterpartyAlias} counterpartyAlias
     * @param {ShareInviteMonetaryAccountInquiryPostShareDetail} shareDetail
     * @param {ShareInviteMonetaryAccountInquiryPostStatus} status
     * @param {ShareInviteMonetaryAccountInquiryPostOptions} options
     * @returns {Promise<{}>}
     */
    public async put(
        userId: number,
        monetaryAccountId: number,
        shareInviteMonetaryAccountInquiryId: number,
        counterpartyAlias: CounterpartyAlias,
        shareDetail: ShareInviteMonetaryAccountInquiryPostShareDetail,
        status: ShareInviteMonetaryAccountInquiryPostStatus = "PENDING",
        options: ShareInviteMonetaryAccountInquiryPostOptions = {
            share_type: "STANDARD"
        }
    ): Promise<any> {
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/share-invite-monetary-account-inquiry", "PUT");

        const postData: any = {
            counter_user_alias: counterpartyAlias,
            share_detail: shareDetail,
            status: status
        };

        if (options.share_type) {
            postData.share_type = options.share_type;
        }
        if (options.start_date) {
            postData.start_date = options.start_date;
        }
        if (options.end_date) {
            postData.end_date = options.end_date;
        }

        const response = await limiter.run(async axiosClient =>
            this.ApiAdapter.put(
                `/v1/user/${userId}/monetary-account/${monetaryAccountId}/share-invite-monetary-account-inquiry/${shareInviteMonetaryAccountInquiryId}`,
                postData,
                {},
                {},
                axiosClient
            )
        );

        return response.Response;
    }

    /**
     * @param {number} userId
     * @param {number} monetaryAccountId
     * @param {number} shareInviteMonetaryAccountInquiryId
     * @param {ShareInviteMonetaryAccountInquiryPostStatus} status
     * @returns {Promise<{}>}
     */
    public async putStatus(
        userId: number,
        monetaryAccountId: number,
        shareInviteMonetaryAccountInquiryId: number,
        status: ShareInviteMonetaryAccountInquiryPostStatus
    ): Promise<any> {
        const limiter = this.ApiAdapter.RequestLimitFactory.create("/share-invite-monetary-account-inquiry", "PUT");

        const response = await limiter.run(async axiosClient =>
            this.ApiAdapter.put(
                `/v1/user/${userId}/monetary-account/${monetaryAccountId}/share-invite-monetary-account-inquiry/${shareInviteMonetaryAccountInquiryId}`,
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
