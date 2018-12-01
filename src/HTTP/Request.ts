import ApiAdapterOptions from "../Types/ApiAdapterOptions";
import { Method } from "../Types/Method";
import Headers from "../Types/Headers";
import { AxiosRequestConfig } from "axios";

// these headers are set by default
export const DEFAULT_HEADERS: Headers = {
    "Cache-Control": "no-cache",
    "Content-Type": "application/json",
    "X-Bunq-Language": "en_US",
    "X-Bunq-Region": "nl_NL",
    "X-Bunq-Geolocation": "0 0 0 0 000"
};

export default class Request {
    private _url: string;
    private _method: Method;
    private _data: any;
    private _headers: Headers = {};
    private _options: any = {};

    private _isEncrypted: boolean = false;
    private _isSigned: boolean = true;
    private _isAuthenticated: false | string = false;

    private _requestConfig: AxiosRequestConfig;

    constructor(url: string, method: Method = "GET", data: any = {}, headers: any = {}, options: any = {}) {
        this._url = url;
        this._method = method;
        this._data = data;
        this._headers = headers;
        this._options = options;
    }

    get url(): string {
        return this._url;
    }
    get method(): Method {
        return this._method;
    }
    get data(): any {
        return this._data;
    }
    get headers(): Headers {
        return this._headers;
    }
    get isEncrypted(): boolean {
        return this._isEncrypted;
    }
    get isSigned(): boolean {
        return this._isSigned;
    }
    get requestConfig(): AxiosRequestConfig {
        this._requestConfig = {
            url: `${this._url}`,
            method: this._method,
            data: this._data,
            headers: this.createHeaders(this._headers),
            transformResponse: undefined,
            ...this._options
        };

        return this._requestConfig;
    }

    public setEncrypted(isEncrypted: boolean): void {
        this._isEncrypted = isEncrypted;
    }
    public setSigned(isSigned: boolean): void {
        this._isSigned = isSigned;
    }
    public setAuthenticated(token: string): void {
        this._isAuthenticated = token;
    }

    public getHeader(key: string): string | false {
        if (!this._headers) return false;

        return this._headers[key];
    }
    public setHeader(key: string, value: string): void {
        if (!this._headers) this._headers = {};

        this._headers[key] = value;
    }

    /**
     * Generates a list of the required headers
     * @param {Header[]} headers
     */
    private createHeaders(customHeaders: Headers = {}) {
        const date: Date = new Date();
        const headers: Headers = {
            ...DEFAULT_HEADERS,
            "X-Bunq-Client-Request-Id": "" + date.getTime() + date.getMilliseconds() + Math.random(),
            ...customHeaders
        };

        if(this._isAuthenticated !== false){
            headers["X-Bunq-Client-Authentication"] = this._isAuthenticated;
        }

        return headers;
    }
}
