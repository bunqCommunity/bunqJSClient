"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// these headers are set by default
exports.DEFAULT_HEADERS = {
    "Cache-Control": "no-cache",
    "Content-Type": "application/json",
    "X-Bunq-Language": "en_US",
    "X-Bunq-Region": "nl_NL",
    "X-Bunq-Geolocation": "0 0 0 0 000"
};
class Request {
    constructor(url, method = "GET", data = {}, headers = {}, options = {}) {
        this._headers = {};
        this._options = {};
        this._isEncrypted = false;
        this._isSigned = true;
        this._isAuthenticated = false;
        this._url = url;
        this._method = method;
        this._data = data;
        this._headers = headers;
        this._options = options;
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
    get isEncrypted() {
        return this._isEncrypted;
    }
    get isSigned() {
        return this._isSigned;
    }
    get requestConfig() {
        this._requestConfig = Object.assign({ url: `${this._url}`, method: this._method, data: this._data, headers: this.createHeaders(this._headers), transformResponse: undefined }, this._options);
        return this._requestConfig;
    }
    setEncrypted(isEncrypted) {
        this._isEncrypted = isEncrypted;
    }
    setSigned(isSigned) {
        this._isSigned = isSigned;
    }
    setAuthenticated(token) {
        this._isAuthenticated = token;
    }
    getHeader(key) {
        if (!this._headers)
            return false;
        return this._headers[key];
    }
    setHeader(key, value) {
        if (!this._headers)
            this._headers = {};
        this._headers[key] = value;
    }
    /**
     * Generates a list of the required headers
     * @param {Header[]} headers
     */
    createHeaders(customHeaders = {}) {
        const date = new Date();
        const headers = Object.assign({}, exports.DEFAULT_HEADERS, { "X-Bunq-Client-Request-Id": "" + date.getTime() + date.getMilliseconds() + Math.random() }, customHeaders);
        if (this._isAuthenticated !== false) {
            headers["X-Bunq-Client-Authentication"] = this._isAuthenticated;
        }
        return headers;
    }
}
exports.default = Request;
