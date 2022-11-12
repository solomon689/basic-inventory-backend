"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseError = void 0;
class BaseError extends Error {
    constructor(statusCode, message) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.statusCode = statusCode;
        this.name = 'CustomError';
        Error.captureStackTrace(this);
    }
}
exports.BaseError = BaseError;
//# sourceMappingURL=base-error.js.map