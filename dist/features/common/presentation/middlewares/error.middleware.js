"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const error_handler_1 = require("../../../../core/errors/error.handler");
const constants_1 = require("../../../../core/constants");
const logger_1 = __importDefault(require("../../infrastructure/logger"));
const errorMiddleware = (error, req, res, next) => {
    if (error instanceof error_handler_1.ErrorHandler) {
        const { message, name, 
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        stack, statusCode = constants_1.HttpCode.INTERNAL_SERVER_ERROR, validationErrors, } = error;
        res.status(statusCode);
        res.json({
            ok: false,
            name,
            errorMessage: message,
            errorCode: statusCode,
            // stack,
            errors: validationErrors,
        });
        logger_1.default.error("Error manejado por ErrorHandler", {
            message: message,
            stack: error.stack,
            errors: validationErrors,
        });
    }
    else {
        const name = "Internal Server Error";
        const message = "An internal server error occurred";
        const statusCode = constants_1.HttpCode.INTERNAL_SERVER_ERROR;
        res.status(statusCode);
        res.json({ name, message });
        logger_1.default.error("Error manejado por ErrorHandler", {
            message: message,
            stack: error.stack,
        });
    }
    next();
};
exports.errorMiddleware = errorMiddleware;
