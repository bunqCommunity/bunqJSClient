import ApiAdapter from "../ApiAdapter";
import DeviceRegistration from "./DeviceRegistration";
import Installation from "./Installation";
import SessionServer from "./SessionServer";

export default (ApiAdapter: ApiAdapter) => {
    return {
        installation: new Installation(ApiAdapter),
        deviceRegistration: new DeviceRegistration(ApiAdapter),
        sessionServer: new SessionServer(ApiAdapter),
    }
}
