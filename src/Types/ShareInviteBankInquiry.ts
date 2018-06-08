import Amount from "./Amount";

export type ShareInviteBankInquiryPostOptions = {
    share_type?: "STANDARD" | "MUTUAL";
    start_date?: Date;
    end_date?: Date;
};

export type ShareInviteBankInquiryPostShareDetail = {
    ShareDetailPayment?: ShareInviteBankInquiryPostShareDetailPayment;
    ShareDetailReadOnly?: ShareInviteBankInquiryPostShareDetailReadOnly;
    ShareDetailDraftPayment?: ShareInviteBankInquiryPostShareDetailDraftPayment;
};

export type ShareInviteBankInquiryPostShareDetailPayment = {
    make_payments?: boolean;
    make_draft_payments?: boolean;
    view_balance?: boolean;
    view_old_events?: boolean;
    view_new_events?: boolean;
    budget?: ShareInviteBankInquiryPostShareDetailPaymentBudget;
};

export type ShareInviteBankInquiryPostShareDetailPaymentBudget = {
    amount: Amount;
    frequency: "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY";
};

export type ShareInviteBankInquiryPostShareDetailReadOnly = {
    view_balance?: boolean;
    view_old_events?: boolean;
    view_new_events?: boolean;
};

export type ShareInviteBankInquiryPostShareDetailDraftPayment = {
    make_draft_payments?: boolean;
    view_balance?: boolean;
    view_old_events?: boolean;
    view_new_events?: boolean;
};

export type ShareInviteBankInquiryPostStatus =
    | "PENDING"
    | "REVOKED"
    | "ACCEPTED"
    | "CANCELLED"
    | "CANCELLATION_PENDING"
    | "CANCELLATION_ACCEPTED"
    | "CANCELLATION_REJECTED";
