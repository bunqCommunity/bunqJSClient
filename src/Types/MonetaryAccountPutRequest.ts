import Amount from "./Amount";
import NotificationFilter from "./NotificationFilter";

export interface MonetaryAccountPutRequest {
    description?: string;
    daily_limit?: Amount;
    avatar_uuid?: string;
    reason_description?: string;
    notification_filters?: NotificationFilter[];
    status?: "ACTIVE" | "CANCELLED" | "PENDING_REOPEN";
    sub_status?: "REDEMPTION_VOLUNTARY";
    reason?: "OTHER";
    savings_goal?: Amount;
    setting?: {
        color?: string;
        default_avatar_status?: "AVATAR_DEFAULT";
        restriction_chat?: "ALLOW_INCOMING" | "BLOCK_INCOMING";
    };
}

export default MonetaryAccountPutRequest;
