import LimitType from "./LimitType";

export type Limit = {
    daily_limit: string;
    currency: string;
    type: LimitType;
};

export default Limit;
