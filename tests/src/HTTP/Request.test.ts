import * as moxios from "moxios";
import Request from "../../../src/HTTP/Request";

describe("Request", () => {
    beforeEach(function() {
        moxios.install();
    });

    afterEach(function() {
        moxios.uninstall();
    });

    describe("#construct()", () => {
        it("should create a new instance", () => {
            const request = new Request(
                "/user",
                "GET",
                {},
                {
                    "Content-Type": "Memes"
                },
                {
                    random: 1
                }
            );
            expect(request).toBeInstanceOf(Request);
        });

        it("should create a new instance - with default values", () => {
            const request = new Request("/user");
            expect(request).toBeInstanceOf(Request);
        });
    });

    describe("#setSigned()", () => {
        it("should set and unset signature", () => {
            const request = new Request("/test");
            expect(request.isSigned).toBeFalsy();

            const signatureString = "SOME_RANDOM_TOKEN";
            request.setSigned(signatureString);
            expect(request.isSigned).toBe(signatureString);

            request.setSigned(false);
            expect(request.isSigned).toBeFalsy();
        });
    });

    describe("#setAuthenticated()", () => {
        it("should set and unset auth token", () => {
            const request = new Request("/test");
            expect(request.isAuthenticated).toBeFalsy();

            const authenticationToken = "SOME_RANDOM_TOKEN";
            request.setAuthenticated(authenticationToken);
            expect(request.isAuthenticated).toBe(authenticationToken);

            request.setAuthenticated(false);
            expect(request.isAuthenticated).toBeFalsy();
        });
    });

    describe("#setUrl()", () => {
        it("should set url", () => {
            const request = new Request("/test");
            expect(request.url).toBe("/test");
            request.setUrl("/different-url");
            expect(request.url).toBe("/different-url");
        });
    });

    describe("#getHeader()", () => {
        it("get content-type header", () => {
            const request = new Request(
                "/user",
                "GET",
                {},
                {
                    "Content-Type": "Memes"
                }
            );
            expect(request.getHeader("Content-Type")).toBe("Memes");
        });
    });

    describe("getters", () => {
        it("->url", () => {
            const request = new Request("/test");
            expect(request.url).toBe("/test");
        });

        it("->method", () => {
            const request = new Request("/test", "POST");
            expect(request.method).toBe("POST");
        });

        it("->data", () => {
            const data = { key: "value" };
            const request = new Request("/test", "GET", data);
            expect(JSON.stringify(data)).toBe(JSON.stringify(request.data));
        });

        it("->headers", () => {
            const request = new Request(
                "/test",
                "GET",
                {},
                {
                    "Content-Type": "Memes"
                }
            );
            expect(request.headers).toHaveProperty("Content-Type");
            expect(request.headers["Content-Type"]).toBe("Memes");
        });

        it("->isSigned", () => {
            const request = new Request("/test");
            expect(request.isSigned).toBe(false);
        });

        it("->isAuthenticated", () => {
            const request = new Request("/test");
            expect(request.isAuthenticated).toBe(false);
        });

        it("->requestConfig", () => {
            const request = new Request("/test");
            expect(request.requestConfig).toHaveProperty("url");
            expect(request.requestConfig).toHaveProperty("method");
            expect(request.requestConfig).toHaveProperty("data");
            expect(request.requestConfig).toHaveProperty("headers");
            expect(request.requestConfig).toHaveProperty("transformResponse");
        });
    });
});
