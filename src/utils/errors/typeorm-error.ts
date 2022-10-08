import { EntityNotFoundError, QueryFailedError } from "typeorm";
import { BaseError } from './base-error';
import { HttpStatus } from '../enums/http-status';

export class TypeOrmError extends BaseError {

    constructor(error: unknown) {
        switch((error as any).constructor) {
            case QueryFailedError: {
                super(HttpStatus.UNPROCESSABLE_ENTITY, (error as QueryFailedError).message);
                break;
            }

            case EntityNotFoundError: {
                super(HttpStatus.NOT_FOUND, (error as EntityNotFoundError).message);
                break;
            }

            default: {
                super(HttpStatus.INTERNAL_SERVER_ERROR, 'Ha ocurrido un error inesperado');
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