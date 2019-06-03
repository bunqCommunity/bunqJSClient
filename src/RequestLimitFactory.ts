import axios, { AxiosInstance } from "axios";

import LoggerInterface from "./Interfaces/LoggerInterface";
import RequestLimiter, { IRequestLimiterCallback } from "./RequestLimiter";

export type RequestLimitConfig = {
    run: (callable: IRequestLimiterCallback) => Promise<any>;
    limiter: RequestLimiter;
    method: string;
    limiterKey: string;
    endpoint: string;
};
export type RequestLimitConfigCollection = Record<string, RequestLimitConfig>;

export type RequestLimitProxyType = false | any;
export type RequestLimitProxyTypes = RequestLimitProxyType[];

export default class RequestLimitFactory {
    private limiters: RequestLimitConfigCollection = {};
    private logger: LoggerInterface;
    private enabledProxies: RequestLimitProxyTypes = [];
    private axiosClients: AxiosInstance[] = [];

    /**
     * Counts up to use proxies equally
     */
    private proxyCounter: number = 0;

    /**
     * @param loggerInterface
     * @param enabledProxies
     */
    constructor(loggerInterface: LoggerInterface, enabledProxies: RequestLimitProxyTypes = [false]) {
        this.logger = loggerInterface;
        this.setEnabledProxies(enabledProxies);
    }

    /**
     * @param enabledProxies
     */
    setEnabledProxies(enabledProxies: RequestLimitProxyTypes = [false]) {
        this.enabledProxies = enabledProxies;
        this.axiosClients = [];

        this.logger.debug(`Loaded ${enabledProxies.length} proxies`);

        // go through each proxy config
        this.enabledProxies.forEach((enabledProxy: RequestLimitProxyType) => {
            if (enabledProxy === false) {
                // standard axios client
                this.axiosClients.push(axios.create({}));
            } else {
                // get the library only when required for this type
                const SocksProxyAgent = this.getSocksProxyAgent();

                // create the socks proxy client
                const httpsAgent = new SocksProxyAgent(enabledProxy);

                // create axios client using the socks proxy client to handle the requests
                this.axiosClients.push(axios.create({ httpsAgent }));
            }
        });
    }

    /**
     * @param {string} endpoint
     * @param {string} method
     * @param {boolean} noProxy
     * @returns {RequestLimitConfig}
     */
    public create(endpoint: string, method: string = "GET", noProxy: boolean = false): RequestLimitConfig {
        // default to proxy "0" which is our standard IP
        let limiterKey: string = `${endpoint}:${method}:0`;
        let axiosClient: any = axios;

        if (noProxy === false) {
            const randomIndex = this.getProxyIndex();
            limiterKey = `${endpoint}:${method}:${randomIndex}`;

            // set axiosClient for the selected index
            axiosClient = this.axiosClients[randomIndex];
        }

        if (this.limiters[limiterKey]) {
            return this.limiters[limiterKey];
        }

        let rateLimit = 3;
        switch (method) {
            case "PUT":
                rateLimit = 2;
                break;
            case "POST":
            case "DELETE":
                rateLimit = 5;
                break;
            case "GET":
            case "LIST":
                rateLimit = 3;
                break;
            default:
                throw new Error("Invalid method given");
        }

        const limiter = new RequestLimiter(rateLimit, 3350, axiosClient);
        const limiterConfig: RequestLimitConfig = {
            limiterKey,
            limiter,
            // wrap run in the object so it is reverse-compatible
            run: limiter.run,
            method,
            endpoint
        };
        this.limiters[limiterKey] = limiterConfig;

        return this.limiters[limiterKey];
    }

    /**
     * @param {string} limiterKey
     * @returns {any}
     */
    public getLimiter(limiterKey: string): RequestLimitConfig | false {
        if (this.limiters[limiterKey]) {
            return this.limiters[limiterKey];
        }
        return false;
    }

    /**
     * @param {string} limiterKey
     * @returns {boolean}
     */
    public removeLimiter(limiterKey: string): boolean {
        if (this.limiters[limiterKey]) {
            delete this.limiters[limiterKey];
            return true;
        }
        return false;
    }

    public getAllLimiters() {
        return this.limiters;
    }

    public clearLimiters(): void {
        this.limiters = {};
    }

    /**
     * Returns a random index for the available proxies
     */
    private getProxyIndex(): number {
        const currentIndex = this.proxyCounter % this.enabledProxies.length;
        this.proxyCounter += 1;

        return currentIndex;
    }

    /**
     * Requires the socks-proxy-agent library or returns existing loaded value
     */
    private getSocksProxyAgent() {
        return require("socks-proxy-agent");
    }
}
