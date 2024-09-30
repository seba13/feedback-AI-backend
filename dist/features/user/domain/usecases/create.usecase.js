"use strict";
// import { RegisterUserDto } from "../dtos/";
// import { AuthEntity } from "../entities/";
// import { AuthRepository } from "../repositories/";
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
exports.RegisterUserUseCaseImpl = void 0;
const core_1 = require("../../../../core");
const adapters_1 = require("../../../auth/infrastructure/adapters");
const getUserByEmailDto_1 = require("../dtos/getUserByEmailDto");
class RegisterUserUseCaseImpl {
    constructor(repository) {
        this.repository = repository;
    }
    execute(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const dto = getUserByEmailDto_1.GetUserByEmailDto.create(Object.assign({}, data));
            const user = yield this.repository.getUserByEmail(dto);
            /**
             * TODO: cambiar a mensaje de error genérico
             */
            if (user)
                throw core_1.ErrorHandler.badRequest("User with this email is already registered");
            const userEntity = yield this.repository.createUser(Object.assign(Object.assign({}, data), { password: yield adapters_1.BCryptAdapter.hash(data.password) }));
            return userEntity;
        });
    }
}
exports.RegisterUserUseCaseImpl = RegisterUserUseCaseImpl;
