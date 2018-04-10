type NotificationFilter = {
    notification_delivery_method: "URL" | "PUSH";
    notification_target: string | null;
    category:
        | "BILLING"
        | "CARD_TRANSACTION_FAILED"
        | "CARD_TRANSACTION_SUCCESSFUL"
        | "CHAT"
        | "DRAFT_PAYMENT"
        | "IDEAL"
        | "SOFORT"
        | "MONETARY_ACCOUNT_PROFILE"
        | "MUTATION"
        | "PAYMENT"
        | "PROMOTION"
        | "REQUEST"
        | "SCHEDULE_RESULT"
        | "SCHEDULE_STATUS"
        | "SHARE"
        | "SUPPORT"
        | "TAB_RESULT"
        | "USER_APPROVAL";
};

export default NotificationFilter;
