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
exports.LoginWithGoogleUseCaseImpl = void 0;
const core_1 = require("../../../../core");
const getUserByEmailDto_1 = require("../../../user/domain/dtos/getUserByEmailDto");
const adapters_1 = require("../../infrastructure/adapters");
const entities_1 = require("../entities");
class LoginWithGoogleUseCaseImpl {
    constructor(googeAuthService, repository) {
        this.googeAuthService = googeAuthService;
        this.repository = repository;
        this.execute = (code) => __awaiter(this, void 0, void 0, function* () {
            const { email } = (yield this.googeAuthService.getData(code));
            if (!email)
                throw core_1.ErrorHandler.badRequest("invalid code request");
            const userEntity = yield this.repository.getUserByEmail(getUserByEmailDto_1.GetUserByEmailDto.create({ email }));
            if (!userEntity)
                throw core_1.ErrorHandler.badRequest("invalid credentials");
            if (!userEntity.active) {
                throw core_1.ErrorHandler.forbidden("invalid credentials");
            }
            const refreshToken = yield adapters_1.JwtAdapter.generateToken({ idUser: userEntity.idUser }, (0, core_1.envs)().REFRESH_KEY, "1d");
            const token = yield adapters_1.JwtAdapter.generateToken({ idUser: userEntity.idUser }, (0, core_1.envs)().ACCESS_KEY, "10m");
            //
            const authEntity = entities_1.AuthLoginEntity.create(userEntity, token, refreshToken);
            return authEntity;
        });
    }
}
exports.LoginWithGoogleUseCaseImpl = LoginWithGoogleUseCaseImpl;
