import { Router } from "express";
import { UserDatasourceImpl } from "../infraestructure/datasources/mysql.datasource.impl";
import { UserRepositoryImpl } from "../infraestructure/repositories/repository";
import { DeleteUserUseCaseImpl } from "../domain/usecases/delete.usecase";
import { GetUserByIdUseCaseImpl } from "../domain/usecases/get-by-id.usecase";
import { UserController } from "./user.controller";
import { GetUserByEmailUseCaseImpl } from "../domain/usecases/get-by-email.usecase";
import { UpdateUserUseCaseImpl } from "../domain/usecases/update.usecase";
import asyncHandler from "../../common/presentation/middlewares/async.handler";
import { AuthMiddleware } from "../../auth/presentation/middlewares/auth.middleware";

export class UserRoutes {
  static get routes(): Router {
    const router: Router = Router();

    const userDatasource = new UserDatasourceImpl();
    const userRepository = new UserRepositoryImpl(userDatasource);

    const deleteUserUseCaseImpl = new DeleteUserUseCaseImpl(userRepository);
    const getUserByidUseCaseImpl = new GetUserByIdUseCaseImpl(userRepository);
    const getUserByEmailUseCaseImpl = new GetUserByEmailUseCaseImpl(userRepository);
    const updateUserUseCaseImpl = new UpdateUserUseCaseImpl(userRepository);

    const userController = new UserController(
      getUserByidUseCaseImpl,
      getUserByEmailUseCaseImpl,
      updateUserUseCaseImpl,
      deleteUserUseCaseImpl,
    );

    router.get("/user/id/:idUser", asyncHandler(userController.getUserById));
    router.get("/user/email/:email", asyncHandler(userController.getUserByEmail));
    router.post("/users");
    router.patch(
      "/user",
      asyncHandler(AuthMiddleware.validateToken),
      asyncHandler(AuthMiddleware.hasAuthorization),
      asyncHandler(userController.updateUser),
    );

    // TODO: COMPLETAR CONTROLADOR DELETE USER
    // UTILIZAR MIDDLEWARES DE AUTENTICACION Y AUTORIZACION DE TOKEN
    router.patch("/delete-user", asyncHandler(userController.deleteUser));

    router.post(
      "/user",
      asyncHandler(AuthMiddleware.validateToken),
      asyncHandler(AuthMiddleware.hasAuthorization),
      asyncHandler(userController.getUserByIdBody),
    );

    return router;
  }
}
