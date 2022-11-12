"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOrmError = void 0;
const typeorm_1 = require("typeorm");
const base_error_1 = require("./base-error");
const http_status_1 = require("../enums/http-status");
class TypeOrmError extends base_error_1.BaseError {
    constructor(error) {
        switch (error.constructor) {
            case typeorm_1.QueryFailedError: {
                super(http_status_1.HttpStatus.UNPROCESSABLE_ENTITY, error.message);
                break;
            }
            case typeorm_1.EntityNotFoundError: {
                super(http_status_1.HttpStatus.NOT_FOUND, error.message);
                break;
            }
            default: {
                super(http_status_1.HttpStatus.INTERNAL_SERVER_ERROR, 'Ha ocurrido un error inesperado');
                break;
            }
        }
    }
    get getStatusCode() {
        return this.statusCode;
    }
    get getMessage() {
        return this.message;
    }
}
exports.TypeOrmError = TypeOrmError;
//# sourceMappingURL=typeorm-error.js.map