import ApiAdapter from "../ApiAdapter";
import AttachementContent from "./AttachementContent";
import BunqMeTabs from "./BunqMeTabs";
import DeviceRegistration from "./DeviceRegistration";
import Installation from "./Installation";
import MasterCardAction from "./MasterCardAction";
import MonetaryAccount from "./MonetaryAccount";
import Payments from "./Payments";
import RequestInquiry from "./RequestInquiry";
import RequestResponse from "./RequestResponse";
import SessionServer from "./SessionServer";

export default (ApiAdapter: ApiAdapter) => {
    return {
        attachmentContent: new AttachementContent(ApiAdapter),
        bunqMeTabs: new BunqMeTabs(ApiAdapter),
        deviceRegistration: new DeviceRegistration(ApiAdapter),
        installation: new Installation(ApiAdapter),
        masterCardAction: new MasterCardAction(ApiAdapter),
        monetaryAccount: new MonetaryAccount(ApiAdapter),
        payment: new Payments(ApiAdapter),
        requestInquiry: new RequestInquiry(ApiAdapter),
        requestResponse: new RequestResponse(ApiAdapter),
        sessionServer: new SessionServer(ApiAdapter),
    }
}
