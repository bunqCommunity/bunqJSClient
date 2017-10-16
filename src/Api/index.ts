import ApiAdapter from "../ApiAdapter";
import AttachementContent from "./AttachementContent";
import DeviceRegistration from "./DeviceRegistration";
import Installation from "./Installation";
import SessionServer from "./SessionServer";

export default (ApiAdapter: ApiAdapter) => {
    return {
        attachmentContent: new AttachementContent(ApiAdapter),
        installation: new Installation(ApiAdapter),
        deviceRegistration: new DeviceRegistration(ApiAdapter),
        sessionServer: new SessionServer(ApiAdapter),
    }
}
