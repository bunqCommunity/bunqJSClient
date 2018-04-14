process.env.NODE_ENV = "development";

import Logger from "../../../src/Helpers/Logger";

describe("Logger", () => {
    it("should log", () => {
        Logger.warn("warn");
        Logger.log("log");
        Logger.error("error");
        Logger.trace("trace");
        Logger.debug("debug");
    });
});
