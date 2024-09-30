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
exports.JwtAdapter = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const core_1 = require("../../../../core");
class JwtAdapter {
    static generateToken(payload_1, privateKey_1) {
        return __awaiter(this, arguments, void 0, function* (payload, privateKey, expiresIn = "20s") {
            return new Promise((resolve, reject) => {
                jsonwebtoken_1.default.sign(payload, privateKey, { expiresIn }, (error, token) => {
                    if (error) {
                        reject(core_1.ErrorHandler.internalError("Error generating token"));
                    }
                    resolve(token);
                });
            });
        });
    }
    static ValidateToken(token, privateKey) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                jsonwebtoken_1.default.verify(token, privateKey, (error, payload) => {
                    if (error) {
                        resolve(undefined);
                    }
                    else {
                        resolve(payload);
                    }
                });
            });
        });
    }
}
exports.JwtAdapter = JwtAdapter;
