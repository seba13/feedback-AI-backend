"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = require("express");
const mysql_datasource_impl_1 = require("../infraestructure/datasources/mysql.datasource.impl");
const repository_1 = require("../infraestructure/repositories/repository");
const delete_usecase_1 = require("../domain/usecases/delete.usecase");
const get_by_id_usecase_1 = require("../domain/usecases/get-by-id.usecase");
const user_controller_1 = require("./user.controller");
const get_by_email_usecase_1 = require("../domain/usecases/get-by-email.usecase");
const update_usecase_1 = require("../domain/usecases/update.usecase");
const async_handler_1 = __importDefault(require("../../common/presentation/middlewares/async.handler"));
const auth_middleware_1 = require("../../auth/presentation/middlewares/auth.middleware");
class UserRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const userDatasource = new mysql_datasource_impl_1.UserDatasourceImpl();
        const userRepository = new repository_1.UserRepositoryImpl(userDatasource);
        const deleteUserUseCaseImpl = new delete_usecase_1.DeleteUserUseCaseImpl(userRepository);
        const getUserByidUseCaseImpl = new get_by_id_usecase_1.GetUserByIdUseCaseImpl(userRepository);
        const getUserByEmailUseCaseImpl = new get_by_email_usecase_1.GetUserByEmailUseCaseImpl(userRepository);
        const updateUserUseCaseImpl = new update_usecase_1.UpdateUserUseCaseImpl(userRepository);
        const userController = new user_controller_1.UserController(getUserByidUseCaseImpl, getUserByEmailUseCaseImpl, updateUserUseCaseImpl, deleteUserUseCaseImpl);
        router.get("/user/id/:idUser", (0, async_handler_1.default)(userController.getUserById));
        router.get("/user/email/:email", (0, async_handler_1.default)(userController.getUserByEmail));
        router.post("/users");
        router.patch("/user", (0, async_handler_1.default)(auth_middleware_1.AuthMiddleware.validateToken), (0, async_handler_1.default)(auth_middleware_1.AuthMiddleware.hasAuthorization), (0, async_handler_1.default)(userController.updateUser));
        // TODO: COMPLETAR CONTROLADOR DELETE USER
        // UTILIZAR MIDDLEWARES DE AUTENTICACION Y AUTORIZACION DE TOKEN
        router.patch("/delete-user", (0, async_handler_1.default)(auth_middleware_1.AuthMiddleware.validateToken), (0, async_handler_1.default)(auth_middleware_1.AuthMiddleware.hasPrivileges), (0, async_handler_1.default)(userController.deleteUser));
        router.post("/user", (0, async_handler_1.default)(auth_middleware_1.AuthMiddleware.validateToken), (0, async_handler_1.default)(auth_middleware_1.AuthMiddleware.hasAuthorization), (0, async_handler_1.default)(userController.getUserByIdBody));
        return router;
    }
}
exports.UserRoutes = UserRoutes;
