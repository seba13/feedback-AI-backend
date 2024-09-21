import { Router } from "express";
import { AuthDatasourceImpl } from "../infrastructure/datasources/mysql.datasource.impl";
import { AuthRepositoryImpl } from "../infrastructure/repositories/repository.impl";
import { AuthController } from "./auth.controller";
import asyncHandler from "../../common/presentation/middlewares/async.handler";

export class AuthRoutes {
  static get routes(): Router {
    const router: Router = Router();

    const datasource = new AuthDatasourceImpl();
    const repository = new AuthRepositoryImpl(datasource);

    const authController = new AuthController(repository);

    router.post("/login", asyncHandler(authController.login));

    router.post("/register", asyncHandler(authController.register.bind(authController)));

    return router;
  }
}
