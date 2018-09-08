type NoteEventType =
    | "bunqme-fundraiser-result"
    | "draft-payment"
    | "ideal-merchant-transaction"
    | "mastercard-action"
    | "payment-batch"
    | "payment"
    | "request-inquiry-batch"
    | "request-inquiry"
    | "request-response"
    | "schedule"
    | "sofort-merchant-transaction"
    | "switch-service-payment"
    | "whitelist";

export default NoteEventType;
