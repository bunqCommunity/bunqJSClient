"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ApiAdapter_1 = require("../ApiAdapter");
// these headers are set by default
exports.DEFAULT_HEADERS = {
    "Cache-Control": "no-cache",
    "Content-Type": "application/json",
    "X-Bunq-Geolocation": "0 0 0 0 000",
    "X-Bunq-Language": "en_US",
    "X-Bunq-Region": "nl_NL"
};
class Request {
    constructor(url, method = "GET", data = {}, headers = {}, options = {}) {
        this._headers = {};
        this._options = {};
        // private _isEncrypted: boolean = false;
        this._isSigned = false;
        this._isAuthenticated = false;
        this._url = url;
        this._method = method;
        this._data = data;
        Object.keys(exports.DEFAULT_HEADERS).forEach(headerKey => this.setHeader(headerKey, exports.DEFAULT_HEADERS[headerKey]));
        this._headers = this.getHeaders(headers);
        this._options = options;
        // set a random request id and the default headers
        this.setHeader("X-Bunq-Client-Request-Id", new Date().getTime() + Math.random() + "");
    }
    get url() {
        return this._url;
    }
    get method() {
        return this._method;
    }
    get data() {
        return this._data;
    }
    get headers() {
        return this._headers;
    }
    get isSigned() {
        return this._isSigned;
    }
    get isAuthenticated() {
        return this._isAuthenticated;
    }
    get requestConfig() {
        this._requestConfig = Object.assign({ url: this.url, method: this.method, data: this.data, headers: this.getHeaders(), transformResponse: undefined }, this._options);
        return this._requestConfig;
    }
    setSigned(signature) {
        this._isSigned = signature;
        if (!this._isSigned) {
            this.removeHeader(ApiAdapter_1.BUNQ_REQUEST_SIGNATURE_HEADER_KEY);
        }
        else {
            this.setHeader(ApiAdapter_1.BUNQ_REQUEST_SIGNATURE_HEADER_KEY, signature);
        }
    }
    setAuthenticated(token) {
        this._isAuthenticated = token;
        if (!this._isAuthenticated) {
            this.removeHeader(ApiAdapter_1.BUNQ_REQUEST_AUTHENTICATION_HEADER_KEY);
        }
        else {
            this.setHeader(ApiAdapter_1.BUNQ_REQUEST_AUTHENTICATION_HEADER_KEY, token);
        }
    }
    setUrl(url) {
        this._url = url;
    }
    getHeader(key) {
        return this._headers[key];
    }
    removeHeader(key) {
        delete this._headers[key];
    }
    setHeader(key, value) {
        this._headers[key] = value;
    }
    /**
     * Generates a list of the required headers
     * @param {Header[]} customHeaders
     */
    getHeaders(customHeaders = {}) {
        const headers = Object.assign({}, this._headers, customHeaders);
        return headers;
    }
}
exports.default = Request;
