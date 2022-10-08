export class BaseError extends Error {
    protected statusCode: number;

    constructor(statusCode: number, message: string) {
        super(message);

        Object.setPrototypeOf(this, new.target.prototype);
        this.statusCode = statusCode;
        this.name = 'CustomError';
        Error.captureStackTrace(this);
    }
}