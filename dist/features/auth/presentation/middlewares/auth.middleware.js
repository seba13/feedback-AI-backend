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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const core_1 = require("../../../../core");
const mysql_datasource_impl_1 = require("../../../user/infraestructure/datasources/mysql.datasource.impl");
const repository_1 = require("../../../user/infraestructure/repositories/repository");
const getUserByIdDto_1 = require("../../../user/domain/dtos/getUserByIdDto");
const get_by_id_usecase_1 = require("../../../user/domain/usecases/get-by-id.usecase");
const validate_token_usecase_1 = require("../../domain/usecases/validate-token.usecase");
const token_dto_1 = require("../../domain/dtos/token.dto");
class AuthMiddleware {
}
exports.AuthMiddleware = AuthMiddleware;
_a = AuthMiddleware;
// constructor()
AuthMiddleware.validateToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // const accessToken = req.cookies["access_token"];
    const accessToken = req.headers.authorization && req.headers.authorization.split(" ")[1];
    // if (!accessToken) {
    //   throw ErrorHandler.unauthorized("Unauthorized");
    // }
    const validateTokenUseCaseImpl = new validate_token_usecase_1.ValidateTokenUseCaseImpl();
    const payload = yield validateTokenUseCaseImpl.execute(token_dto_1.TokenDto.create({ token: accessToken }), (0, core_1.envs)().ACCESS_KEY);
    if (!payload) {
        throw core_1.ErrorHandler.unauthorized("Invalid token");
    }
    const { idUser } = payload;
    if (!idUser)
        throw core_1.ErrorHandler.unauthorized("Unauthorized");
    req.idUserToken = idUser;
    next();
});
AuthMiddleware.validateRefreshToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // const accessToken = req.cookies["access_token"];
    const refreshToken = req.cookies["refresh_token"];
    // if (!refreshToken) throw ErrorHandler.unauthorized("Refresh token is missing");
    const validateTokenUseCaseImpl = new validate_token_usecase_1.ValidateTokenUseCaseImpl();
    const payload = yield validateTokenUseCaseImpl.execute(token_dto_1.TokenDto.create({ token: refreshToken }), (0, core_1.envs)().REFRESH_KEY);
    if (!payload) {
        res.clearCookie("refresh_token");
        throw core_1.ErrorHandler.unauthorized("Invalid token");
    }
    if (!payload.idUser) {
        throw core_1.ErrorHandler.unauthorized("Invalid token");
    }
    const { idUser } = payload;
    req.idUserToken = idUser;
    next();
});
AuthMiddleware.hasAuthorization = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { idUserToken } = req;
    const { idUser } = req.body;
    const dto = getUserByIdDto_1.GetUserByIdDto.create({ idUser: idUserToken });
    const userDatasource = new mysql_datasource_impl_1.UserDatasourceImpl();
    const userRepository = new repository_1.UserRepositoryImpl(userDatasource);
    const user = yield new get_by_id_usecase_1.GetUserByIdUseCaseImpl(userRepository).execute(dto);
    if (user.idUser !== idUser && user.role !== "administrador")
        throw core_1.ErrorHandler.forbidden("You do not have permission to access the resource");
    req.body.currentUserRole = user.role;
    next();
});
AuthMiddleware.hasPrivileges = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { idUserToken } = req;
    const dto = getUserByIdDto_1.GetUserByIdDto.create({ idUser: idUserToken });
    const userDatasource = new mysql_datasource_impl_1.UserDatasourceImpl();
    const userRepository = new repository_1.UserRepositoryImpl(userDatasource);
    const user = yield new get_by_id_usecase_1.GetUserByIdUseCaseImpl(userRepository).execute(dto);
    if (user.role !== "administrador")
        throw core_1.ErrorHandler.forbidden("You do not have permission to access the resource");
    next();
});
