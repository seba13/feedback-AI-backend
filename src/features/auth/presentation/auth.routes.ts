import { Request, Response, Router } from "express";

import { AuthController } from "./auth.controller";
import asyncHandler from "../../common/presentation/middlewares/async.handler";
import { AuthMiddleware } from "./middlewares/auth.middleware";

import { LoginUserUseCaseImpl, RegisterUserUseCaseImpl } from "../domain";
import { UserDatasourceImpl } from "../../user/infraestructure/datasources/mysql.datasource.impl";
import { AuthRepositoryImpl } from "../infrastructure/repositories/repository.impl";

export class AuthRoutes {
  static get routes(): Router {
    const router: Router = Router();

    const datasource = new UserDatasourceImpl();
    const repository = new AuthRepositoryImpl(datasource);

    const loginUserUsecaseImpl = new LoginUserUseCaseImpl(repository);
    const registerUserUseCaseImpl = new RegisterUserUseCaseImpl(repository);

    const authController = new AuthController(loginUserUsecaseImpl, registerUserUseCaseImpl);

    router.post("/login", asyncHandler(authController.login));
    router.post("/google", asyncHandler(authController.loginWithGoogle));
    router.get(
      "/access-token",
      asyncHandler(AuthMiddleware.validateToken),
      asyncHandler(authController.loginWithAccessToken),
    );

    router.post(
      "/register",
      asyncHandler(AuthMiddleware.validateToken),
      asyncHandler(AuthMiddleware.hasPrivileges),
      asyncHandler(authController.register.bind(authController)),
    );

    router.post("/logout", asyncHandler(authController.logout));

    router.get(
      "/refresh",
      asyncHandler(AuthMiddleware.validateRefreshToken),
      asyncHandler(authController.refresh),
    );

    // TODO: PRUEBA
    router.post(
      "/private",
      asyncHandler(AuthMiddleware.validateToken),
      asyncHandler(async (req: Request, res: Response) => {
        res.json({
          message: "privado",
        });
      }),
    );

    return router;
  }
}
