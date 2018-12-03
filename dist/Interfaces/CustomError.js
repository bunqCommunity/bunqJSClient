"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomError extends Error {
    constructor(error, response = false, errorCode = false) {
        super(error);
        this.response = false;
        this.errorCode = false;
        this.name = "CustomError";
        this.response = response;
        this.errorCode = errorCode;
    }
}
exports.default = CustomError;
