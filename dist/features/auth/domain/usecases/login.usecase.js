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
exports.LoginUserUseCaseImpl = void 0;
const core_1 = require("../../../../core");
const adapters_1 = require("../../infrastructure/adapters");
const __1 = require("..");
const getUserByEmailDto_1 = require("../../../user/domain/dtos/getUserByEmailDto");
class LoginUserUseCaseImpl {
    constructor(repository) {
        this.repository = repository;
    }
    execute(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const dto = getUserByEmailDto_1.GetUserByEmailDto.create(Object.assign({}, data));
            const userEntity = yield this.repository.getUserByEmail(dto);
            if (!userEntity)
                throw core_1.ErrorHandler.badRequest("user with this email not found");
            if (!userEntity.active) {
                throw core_1.ErrorHandler.forbidden("invalid credentials");
            }
            if (!(yield adapters_1.BCryptAdapter.compare(data.password, userEntity.password)))
                throw core_1.ErrorHandler.badRequest("password is wrong");
            const refreshToken = yield adapters_1.JwtAdapter.generateToken({ idUser: userEntity.idUser }, (0, core_1.envs)().REFRESH_KEY, "1d");
            const token = yield adapters_1.JwtAdapter.generateToken({ idUser: userEntity.idUser }, (0, core_1.envs)().ACCESS_KEY, "10m");
            //
            const authEntity = __1.AuthLoginEntity.create(userEntity, token, refreshToken);
            return authEntity;
        });
    }
}
exports.LoginUserUseCaseImpl = LoginUserUseCaseImpl;
