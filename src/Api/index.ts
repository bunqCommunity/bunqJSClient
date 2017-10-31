import ApiAdapter from "../ApiAdapter";
import AttachementContent from "./AttachementContent";
import DeviceRegistration from "./DeviceRegistration";
import Installation from "./Installation";
import MonetaryAccount from "./MonetaryAccount";
import Payments from "./Payments";
import SessionServer from "./SessionServer";
import RequestInquiry from "./RequestInquiry";

export default (ApiAdapter: ApiAdapter) => {
    return {
        attachmentContent: new AttachementContent(ApiAdapter),
        deviceRegistration: new DeviceRegistration(ApiAdapter),
        installation: new Installation(ApiAdapter),
        monetaryAccount: new MonetaryAccount(ApiAdapter),
        payment: new Payments(ApiAdapter),
        requestInquiry: new RequestInquiry(ApiAdapter),
        sessionServer: new SessionServer(ApiAdapter),
    }
}
