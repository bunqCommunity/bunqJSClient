declare const process: any;
declare const require: any;
const loglevel: any = require("loglevel");

// set logging level based on env
loglevel.setLevel(process.env.NODE_ENV === "development" ? "trace" : "warn");

// export the logger
export default loglevel;
