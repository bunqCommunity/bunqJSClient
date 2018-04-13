type RequestInquiryPostOptions = {
    status: "REVOKED" | false;
    minimum_age?: number | false;
    allow_bunqme?: boolean;
    redirect_url?: string | false;
    merchant_reference?: string | false;
    require_address?: boolean;
};

export default RequestInquiryPostOptions;