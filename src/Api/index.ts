import ApiAdapter from "../ApiAdapter";
import AttachementContent from "./AttachementContent";
import BunqMeTabs from "./BunqMeTabs";
import Card from "./Card";
import DeviceRegistration from "./DeviceRegistration";
import DraftPayment from "./DraftPayment";
import Installation from "./Installation";
import MasterCardAction from "./MasterCardAction";
import MonetaryAccount from "./MonetaryAccount";
import Payment from "./Payment";
import PaymentBatch from "./PaymentBatch";
import RequestInquiry from "./RequestInquiry";
import RequestInquiryBatch from "./RequestInquiryBatch";
import RequestResponse from "./RequestResponse";
import SessionServer from "./SessionServer";
import User from "./User";

export default (ApiAdapter: ApiAdapter) => {
    return {
        attachmentContent: new AttachementContent(ApiAdapter),
        bunqMeTabs: new BunqMeTabs(ApiAdapter),
        card: new Card(ApiAdapter),
        deviceRegistration: new DeviceRegistration(ApiAdapter),
        draftPayment: new DraftPayment(ApiAdapter),
        installation: new Installation(ApiAdapter),
        masterCardAction: new MasterCardAction(ApiAdapter),
        monetaryAccount: new MonetaryAccount(ApiAdapter),
        payment: new Payment(ApiAdapter),
        paymentBatch: new PaymentBatch(ApiAdapter),
        requestInquiry: new RequestInquiry(ApiAdapter),
        requestInquiryBatch: new RequestInquiryBatch(ApiAdapter),
        requestResponse: new RequestResponse(ApiAdapter),
        sessionServer: new SessionServer(ApiAdapter),
        user: new User(ApiAdapter)
    };
};
