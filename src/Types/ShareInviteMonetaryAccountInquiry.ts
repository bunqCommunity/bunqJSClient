import Amount from "./Amount";

/**
 * @deprecated
 */
export type ShareInviteMonetaryAccountInquiryPostOptions = {
    share_type?: "STANDARD" | "MUTUAL";
    start_date?: Date;
    end_date?: Date;
};

/**
 * @deprecated
 */
export type ShareInviteMonetaryAccountInquiryPostShareDetail = {
    ShareDetailPayment?: ShareInviteMonetaryAccountInquiryPostShareDetailPayment;
    ShareDetailReadOnly?: ShareInviteMonetaryAccountInquiryPostShareDetailReadOnly;
    ShareDetailDraftPayment?: ShareInviteMonetaryAccountInquiryPostShareDetailDraftPayment;
};

/**
 * @deprecated
 */
export type ShareInviteMonetaryAccountInquiryPostShareDetailPayment = {
    make_payments?: boolean;
    make_draft_payments?: boolean;
    view_balance?: boolean;
    view_old_events?: boolean;
    view_new_events?: boolean;
    budget?: ShareInviteMonetaryAccountInquiryPostShareDetailPaymentBudget;
};

/**
 * @deprecated
 */
export type ShareInviteMonetaryAccountInquiryPostShareDetailPaymentBudget = {
    amount: Amount;
    frequency: "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY";
};

/**
 * @deprecated
 */
export type ShareInviteMonetaryAccountInquiryPostShareDetailReadOnly = {
    view_balance?: boolean;
    view_old_events?: boolean;
    view_new_events?: boolean;
};

/**
 * @deprecated
 */
export type ShareInviteMonetaryAccountInquiryPostShareDetailDraftPayment = {
    make_draft_payments?: boolean;
    view_balance?: boolean;
    view_old_events?: boolean;
    view_new_events?: boolean;
};

/**
 * @deprecated Use ApiTypes.ShareInviteMonetaryAccountInquiryStatus instead.
 */
export type ShareInviteMonetaryAccountInquiryPostStatus =
    | "PENDING"
    | "REVOKED"
    | "ACCEPTED"
    | "CANCELLED"
    | "CANCELLATION_PENDING"
    | "CANCELLATION_ACCEPTED"
    | "CANCELLATION_REJECTED";
