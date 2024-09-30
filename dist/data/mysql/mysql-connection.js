"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.promise = exports.startConnection = exports.pool = void 0;
const mysql2_1 = __importDefault(require("mysql2"));
const core_1 = require("../../core");
const keys_1 = require("./keys");
exports.pool = mysql2_1.default.createPool(keys_1.options);
const startConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        exports.pool.getConnection((error, connection) => {
            if (error)
                reject(core_1.ErrorHandler.internalError("error al conectar base de datos"));
            console.log(`\x1b[35m
        \n****************************************\n      MySQL connection started\n****************************************\x1b[35m`);
            connection.release();
            resolve(true);
        });
    });
});
exports.startConnection = startConnection;
exports.promise = exports.pool.promise();
