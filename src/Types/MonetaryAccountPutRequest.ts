import Amount from "./Amount";
import NotificationFilter from "./NotificationFilter";

export type MonetaryAccountPutRequest = {
    description?: string;
    daily_limit?: Amount;
    avatar_uuid?: string;
    status?: "ACTIVE" | "CANCELLED" | "PENDING_REOPEN";
    sub_status?: "REDEMPTION_VOLUNTARY";
    reason?: "OTHER";
    reason_description?: string;
    notification_filters?: NotificationFilter[];
    setting?: {
        color?: string;
        default_avatar_status?: "AVATAR_DEFAULT";
        restriction_chat?: "ALLOW_INCOMING" | "BLOCK_INCOMING";
    };
};

export default MonetaryAccountPutRequest;
