import ApiAdapter from "../ApiAdapter";
import AttachementContent from "./AttachementContent";
import BunqMeTabs from "./BunqMeTabs";
import DeviceRegistration from "./DeviceRegistration";
import DraftPayment from "./DraftPayment";
import Installation from "./Installation";
import MasterCardAction from "./MasterCardAction";
import MonetaryAccount from "./MonetaryAccount";
import Payment from "./Payment";
import RequestInquiry from "./RequestInquiry";
import RequestResponse from "./RequestResponse";
import SessionServer from "./SessionServer";

export default (ApiAdapter: ApiAdapter) => {
    return {
        attachmentContent: new AttachementContent(ApiAdapter),
        bunqMeTabs: new BunqMeTabs(ApiAdapter),
        deviceRegistration: new DeviceRegistration(ApiAdapter),
        draftPayment: new DraftPayment(ApiAdapter),
        installation: new Installation(ApiAdapter),
        masterCardAction: new MasterCardAction(ApiAdapter),
        monetaryAccount: new MonetaryAccount(ApiAdapter),
        payment: new Payment(ApiAdapter),
        requestInquiry: new RequestInquiry(ApiAdapter),
        requestResponse: new RequestResponse(ApiAdapter),
        sessionServer: new SessionServer(ApiAdapter),
    }
}
