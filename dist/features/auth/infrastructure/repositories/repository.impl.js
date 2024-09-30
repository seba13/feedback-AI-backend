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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRepositoryImpl = void 0;
// import { AuthDatasource } from "../../domain/datasources/";
// import { LoginUserDto } from "../../domain/dtos";
// import { AuthEntity } from "../../domain/entities/";
// import { AuthRepository } from "../../domain/repositories/";
class AuthRepositoryImpl {
    constructor(datasource) {
        this.datasource = datasource;
    }
    getUserByEmail(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.datasource.getUserByEmail(dto);
        });
    }
    createUser(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.datasource.createUser(dto);
        });
    }
}
exports.AuthRepositoryImpl = AuthRepositoryImpl;
