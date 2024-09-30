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
exports.AuthController = void 0;
const dtos_1 = require("../domain/dtos");
const register_dto_1 = require("../domain/dtos/register.dto");
const jwt_adapter_1 = require("../infrastructure/adapters/jwt.adapter");
const core_1 = require("../../../core");
const mysql_datasource_impl_1 = require("../../user/infraestructure/datasources/mysql.datasource.impl");
const getUserByIdDto_1 = require("../../user/domain/dtos/getUserByIdDto");
const repository_1 = require("../../user/infraestructure/repositories/repository");
const get_by_id_usecase_1 = require("../../user/domain/usecases/get-by-id.usecase");
const google_auth_service_1 = require("../infrastructure/services/google-auth.service");
const login_google_usecase_1 = require("../domain/usecases/login-google.usecase");
class AuthController {
    constructor(loginUserUsecaseImpl, registerUserUsecaseImpl) {
        this.loginUserUsecaseImpl = loginUserUsecaseImpl;
        this.registerUserUsecaseImpl = registerUserUsecaseImpl;
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const userDataBody = req.body;
            const dto = dtos_1.LoginUserDto.create(userDataBody);
            const { user, refreshToken, token } = yield this.loginUserUsecaseImpl.execute(dto);
            res.cookie("refresh_token", refreshToken, {
                maxAge: 1000 * 60 * 60 * 24,
                // path: "/",
                httpOnly: true,
                secure: (0, core_1.envs)().NODE_ENV !== "development",
                sameSite: "strict",
            });
            return res.json(Object.assign(Object.assign({ ok: true }, user), { token, refreshToken }));
        });
        this.loginWithAccessToken = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { idUserToken } = req;
            const dto = getUserByIdDto_1.GetUserByIdDto.create({ idUser: idUserToken });
            const userDatasource = new mysql_datasource_impl_1.UserDatasourceImpl();
            const userRepository = new repository_1.UserRepositoryImpl(userDatasource);
            try {
                const user = yield new get_by_id_usecase_1.GetUserByIdUseCaseImpl(userRepository).execute(dto);
                return res.json(Object.assign({ ok: true }, user));
            }
            catch (error) {
                res.clearCookie("refresh_token");
                throw error;
            }
        });
        this.register = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const userDataBody = req.body;
            const registerDto = register_dto_1.RegisterUserDto.create(userDataBody);
            const { user } = yield this.registerUserUsecaseImpl.execute(registerDto);
            return res.json(Object.assign({ ok: true }, user));
        });
        this.logout = (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log("logout");
            // res.cookie("refresh_token", {});
            res.clearCookie("refresh_token");
            return res.sendStatus(core_1.HttpCode.NO_CONTENT);
        });
        this.refresh = (req, res) => __awaiter(this, void 0, void 0, function* () {
            // const refreshToken = req.cookies["refresh_token"];
            // if (!refreshToken) throw ErrorHandler.unauthorized("Refresh token is missing or invalid");
            // const { idUser } = (await JwtAdapter.ValidateToken(refreshToken, envs().REFRESH_KEY)) as {
            //   idUser: string;
            // };
            const { idUserToken } = req;
            if (!idUserToken) {
                // res.cookie("refresh_token", {});
                res.clearCookie("refresh_token");
                throw core_1.ErrorHandler.unauthorized("Invalid token");
            }
            const token = yield jwt_adapter_1.JwtAdapter.generateToken({ idUser: idUserToken }, (0, core_1.envs)().ACCESS_KEY, "5m");
            res.json({
                ok: true,
                token,
            });
        });
        this.loginWithGoogle = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { code } = req.body;
            const googleAuthService = new google_auth_service_1.GoogleAuthService();
            const UserDatasource = new mysql_datasource_impl_1.UserDatasourceImpl();
            const userRepositoryImpl = new repository_1.UserRepositoryImpl(UserDatasource);
            const { user, refreshToken, token } = yield new login_google_usecase_1.LoginWithGoogleUseCaseImpl(googleAuthService, userRepositoryImpl).execute(code);
            res.cookie("refresh_token", refreshToken, {
                maxAge: 1000 * 60 * 60 * 24,
                // path: "/",
                httpOnly: true,
                secure: true,
                sameSite: "none",
            });
            return res.json(Object.assign(Object.assign({ ok: true }, user), { token, refreshToken }));
        });
    }
}
exports.AuthController = AuthController;
