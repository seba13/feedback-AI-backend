"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = void 0;
const constants_1 = require("../constants");
class ErrorHandler extends Error {
    constructor(args) {
        const { message, name = "Internal aplication error", statusCode = constants_1.HttpCode.INTERNAL_SERVER_ERROR, validationErrors, } = args;
        super(message);
        // this.name = name ?? "Aplication Error";
        this.name = name;
        this.statusCode = statusCode;
        this.validationErrors = validationErrors;
        Error.captureStackTrace(this);
    }
    static badRequest(message, validationErrors) {
        return new ErrorHandler({
            name: "BadRequestError",
            message,
            statusCode: constants_1.HttpCode.BAD_REQUEST,
            validationErrors,
        });
    }
    static forbidden(message, validationErrors) {
        return new ErrorHandler({
            name: "ForbiddenError",
            message,
            statusCode: constants_1.HttpCode.FORBIDDEN,
            validationErrors,
        });
    }
    static unauthorized(message, validationErrors) {
        return new ErrorHandler({
            name: "UnauthorizedError",
            message,
            statusCode: constants_1.HttpCode.UNAUTHORIZED,
            validationErrors,
        });
    }
    static notFound(message, validationErrors) {
        return new ErrorHandler({
            name: "NotFoundError",
            message,
            statusCode: constants_1.HttpCode.NOT_FOUND,
            validationErrors,
        });
    }
    static internalError(message, validationErrors) {
        return new ErrorHandler({
            name: "InternalServerError",
            message,
            statusCode: constants_1.HttpCode.INTERNAL_SERVER_ERROR,
            validationErrors,
        });
    }
}
exports.ErrorHandler = ErrorHandler;
