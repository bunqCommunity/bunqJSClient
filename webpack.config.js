const path = require("path");
const webpack = require("webpack");
const plugins = require("./Webpack/plugins");
const rules = require("./Webpack/rules");

// src and build dirs
const BUILD_DIR = path.resolve(__dirname, "dist");
const OUTPUT_DIR = "./";

const PRODUCTION = process.env.NODE_ENV === "production";
const DEVELOPMENT = !PRODUCTION;

let config = {
    entry: {
        BunqJSClient: "./src/BunqJSClient"
    },
    output: {
        library: "BunqJSClient",
        libraryTarget: "umd",
        umdNamedDefine: true,
        path: BUILD_DIR,
        filename: OUTPUT_DIR + "[name].min.js",
        publicPath: "/dist/",
        chunkFilename: OUTPUT_DIR + "[name].[chunkhash].bundle.js"
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".jsx", ".json"],
        modules: ["node_modules", path.resolve(__dirname, "./src")]
    },
    devtool: DEVELOPMENT ? "source-map" : false,
    plugins: plugins({ BUILD_DIR, OUTPUT_DIR, PRODUCTION, DEVELOPMENT }),
    module: {
        rules: rules
    }
};

module.exports = config;
