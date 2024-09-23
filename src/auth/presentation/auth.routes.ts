import { Request, Response, Router } from "express";

import { AuthDatasourceImpl, users } from "../infrastructure/datasources/mysql.datasource.impl";
import { AuthRepositoryImpl } from "../infrastructure/repositories/repository.impl";
import { AuthController } from "./auth.controller";
import asyncHandler from "../../common/presentation/middlewares/async.handler";
import { AuthMiddleware } from "./middlewares/auth.middleware";
import { JwtAdapter } from "../infrastructure/adapters/jwt.adapter";
import { envs, ErrorHandler } from "../../core";

export class AuthRoutes {
  static get routes(): Router {
    const router: Router = Router();

    const datasource = new AuthDatasourceImpl();
    const repository = new AuthRepositoryImpl(datasource);

    const authController = new AuthController(repository);

    router.post("/login", asyncHandler(authController.login));

    router.post("/register", asyncHandler(authController.register.bind(authController)));

    router.post("/logout", asyncHandler(authController.logout));

    router.get("/refresh", asyncHandler(authController.refresh));

    // TODO: PASAR TODO LO RELACIONADO A USUARIO A LA CAPA USER
    // USER => REPOSITORY & DATASOURCE =>  GETUSERBYEMAIL

    // TODO: PRUEBA
    router.post(
      "/private",
      asyncHandler(AuthMiddleware.validateJwt),
      asyncHandler(async (req: Request, res: Response) => {
        res.json({
          message: "privado",
        });
      }),
    );

    // TODO: GETUSER TOKEN => PASARLO LUEGO A LA CAPA USUARIO

    router.get(
      "/user",
      asyncHandler(AuthMiddleware.validateJwt),
      asyncHandler(async (req: Request, res: Response) => {
        // SE ESTÁ REPITIENDO EL PROCESO DE DECODIFICAR EL JWT, EL MIDDLEWARE PUEDE PASAR EL IdUser a req

        const token = req.headers.authorization!.split(" ")[1];

        const { idUser } = (await JwtAdapter.ValidateToken(token, envs().ACCESS_KEY)) as {
          idUser: string;
        };

        if (!idUser) throw ErrorHandler.unauthorized("Invalid token");

        const user = users.find((user) => user.idUser === idUser);

        if (!user) throw ErrorHandler.notFound("user not found");

        return res.json({
          ok: true,
          ...user,
        });
      }),
    );

    return router;
  }
}
