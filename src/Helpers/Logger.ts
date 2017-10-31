import loglevel from "loglevel";

// set logging level based on env
loglevel.setLevel(process.env.NODE_ENV === "development" ? "trace" : "warn");

// export the logger
export default loglevel;
