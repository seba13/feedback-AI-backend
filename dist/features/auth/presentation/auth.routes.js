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
exports.AuthRoutes = void 0;
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const async_handler_1 = __importDefault(require("../../common/presentation/middlewares/async.handler"));
const auth_middleware_1 = require("./middlewares/auth.middleware");
const domain_1 = require("../domain");
const mysql_datasource_impl_1 = require("../../user/infraestructure/datasources/mysql.datasource.impl");
const repository_impl_1 = require("../infrastructure/repositories/repository.impl");
class AuthRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const datasource = new mysql_datasource_impl_1.UserDatasourceImpl();
        const repository = new repository_impl_1.AuthRepositoryImpl(datasource);
        const loginUserUsecaseImpl = new domain_1.LoginUserUseCaseImpl(repository);
        const registerUserUseCaseImpl = new domain_1.RegisterUserUseCaseImpl(repository);
        const authController = new auth_controller_1.AuthController(loginUserUsecaseImpl, registerUserUseCaseImpl);
        router.post("/login", (0, async_handler_1.default)(authController.login));
        router.post("/google", (0, async_handler_1.default)(authController.loginWithGoogle));
        router.get("/access-token", (0, async_handler_1.default)(auth_middleware_1.AuthMiddleware.validateToken), (0, async_handler_1.default)(authController.loginWithAccessToken));
        router.post("/register", (0, async_handler_1.default)(auth_middleware_1.AuthMiddleware.validateToken), (0, async_handler_1.default)(auth_middleware_1.AuthMiddleware.hasPrivileges), (0, async_handler_1.default)(authController.register.bind(authController)));
        router.post("/logout", (0, async_handler_1.default)(authController.logout));
        router.get("/refresh", (0, async_handler_1.default)(auth_middleware_1.AuthMiddleware.validateRefreshToken), (0, async_handler_1.default)(authController.refresh));
        // TODO: PRUEBA
        router.post("/private", (0, async_handler_1.default)(auth_middleware_1.AuthMiddleware.validateToken), (0, async_handler_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            res.json({
                message: "privado",
            });
        })));
        return router;
    }
}
exports.AuthRoutes = AuthRoutes;
