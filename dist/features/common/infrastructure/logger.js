"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const winston_1 = __importDefault(require("winston"));
const logger = winston_1.default.createLogger({
    level: "info",
    format: winston_1.default.format.combine(winston_1.default.format.timestamp({
        format: () => (0, moment_timezone_1.default)().tz("America/Santiago").format(),
    }), winston_1.default.format.printf(({ timestamp, level, message, stack, errors }) => {
        return `${timestamp} [${level.toUpperCase()}]: ${message} ${errors ? "\n" + JSON.stringify(errors) : ""}  ${stack ? "\n" + stack : ""}`;
    })),
    transports: [
        // new winston.transports.Console(), // Logueo en la consola
        new winston_1.default.transports.File({ filename: "logs/error.log", level: "error" }), // Logueo de errores en archivo
        new winston_1.default.transports.File({ filename: "logs/app.log" }), // Logueo general
    ],
});
exports.default = logger;
