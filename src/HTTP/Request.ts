import { AxiosRequestConfig } from "axios";
import { Method } from "../Types/Method";
import Headers from "../Types/Headers";
import { BUNQ_REQUEST_AUTHENTICATION_HEADER_KEY, BUNQ_REQUEST_SIGNATURE_HEADER_KEY } from "../ApiAdapter";

// these headers are set by default
export const DEFAULT_HEADERS: Headers = {
    "Cache-Control": "no-cache",
    "Content-Type": "application/json",
    "X-Bunq-Geolocation": "0 0 0 0 000",
    "X-Bunq-Language": "en_US",
    "X-Bunq-Region": "nl_NL"
};

export default class Request {
    private _url: string;
    private _method: Method;
    private _data: any;
    private _headers: Headers = {};
    private _options: any = {};

    // private _isEncrypted: boolean = false;
    private _isSigned: false | string = false;
    private _isAuthenticated: false | string = false;

    private _requestConfig: AxiosRequestConfig;

    constructor(url: string, method: Method = "GET", data: any = {}, headers: any = {}, options: any = {}) {
        this._url = url;
        this._method = method;
        this._data = data;

        Object.keys(DEFAULT_HEADERS).forEach(headerKey => this.setHeader(headerKey, DEFAULT_HEADERS[headerKey]));
        this._headers = this.getHeaders(headers);
        this._options = options;

        // set a random request id and the default headers
        this.setHeader("X-Bunq-Client-Request-Id", new Date().getTime() + Math.random() + "");
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
    get isSigned(): string | false {
        return this._isSigned;
    }
    get isAuthenticated(): string | false {
        return this._isAuthenticated;
    }

    get requestConfig(): AxiosRequestConfig {
        this._requestConfig = {
            url: this.url,
            method: this.method,
            data: this.data,
            headers: this.getHeaders(),
            transformResponse: undefined,
            ...this._options
        };

        return this._requestConfig;
    }

    public setSigned(signature: string | false): void {
        this._isSigned = signature;
        if (!this._isSigned) {
            this.removeHeader(BUNQ_REQUEST_SIGNATURE_HEADER_KEY);
        } else {
            this.setHeader(BUNQ_REQUEST_SIGNATURE_HEADER_KEY, signature);
        }
    }
    public setAuthenticated(token: string | false): void {
        this._isAuthenticated = token;
        if (!this._isAuthenticated) {
            this.removeHeader(BUNQ_REQUEST_AUTHENTICATION_HEADER_KEY);
        } else {
            this.setHeader(BUNQ_REQUEST_AUTHENTICATION_HEADER_KEY, token);
        }
    }

    public setUrl(url: string): void {
        this._url = url;
    }

    public setData(data: any): void {
        this._data = data;
    }

    public getHeader(key: string): string | false {
        return this._headers[key];
    }
    public removeHeader(key: string): void {
        delete this._headers[key];
    }
    public setHeader(key: string, value: any): void {
        this._headers[key] = value;
    }
    public removeOption(key: string): void {
        delete this._options[key];
    }
    public setOption(key: string, value: any): void {
        this._options[key] = value;
    }

    /**
     * Generates a list of the required headers
     * @param {Header[]} customHeaders
     */
    private getHeaders(customHeaders: Headers = {}) {
        const headers: Headers = {
            ...this._headers,
            ...customHeaders
        };

        return headers;
    }
}
