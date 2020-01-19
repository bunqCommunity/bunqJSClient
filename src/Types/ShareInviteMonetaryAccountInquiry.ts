import Amount from "./Amount";

export type ShareInviteMonetaryAccountInquiryPostOptions = {
    share_type?: "STANDARD" | "MUTUAL";
    start_date?: Date;
    end_date?: Date;
};

export type ShareInviteMonetaryAccountInquiryPostShareDetail = {
    ShareDetailPayment?: ShareInviteMonetaryAccountInquiryPostShareDetailPayment;
    ShareDetailReadOnly?: ShareInviteMonetaryAccountInquiryPostShareDetailReadOnly;
    ShareDetailDraftPayment?: ShareInviteMonetaryAccountInquiryPostShareDetailDraftPayment;
};

export type ShareInviteMonetaryAccountInquiryPostShareDetailPayment = {
    make_payments?: boolean;
    make_draft_payments?: boolean;
    view_balance?: boolean;
    view_old_events?: boolean;
    view_new_events?: boolean;
    budget?: ShareInviteMonetaryAccountInquiryPostShareDetailPaymentBudget;
};

export type ShareInviteMonetaryAccountInquiryPostShareDetailPaymentBudget = {
    amount: Amount;
    frequency: "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY";
};

export type ShareInviteMonetaryAccountInquiryPostShareDetailReadOnly = {
    view_balance?: boolean;
    view_old_events?: boolean;
    view_new_events?: boolean;
};

export type ShareInviteMonetaryAccountInquiryPostShareDetailDraftPayment = {
    make_draft_payments?: boolean;
    view_balance?: boolean;
    view_old_events?: boolean;
    view_new_events?: boolean;
};

export type ShareInviteMonetaryAccountInquiryPostStatus =
    | "PENDING"
    | "REVOKED"
    | "ACCEPTED"
    | "CANCELLED"
    | "CANCELLATION_PENDING"
    | "CANCELLATION_ACCEPTED"
    | "CANCELLATION_REJECTED";
