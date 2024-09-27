import { NextFunction, Request, Response } from "express";
import { ErrorHandler, envs } from "../../../../core";
import { UserDatasourceImpl } from "../../../user/infraestructure/datasources/mysql.datasource.impl";
import { UserRepositoryImpl } from "../../../user/infraestructure/repositories/repository";
import { GetUserByIdDto } from "../../../user/domain/dtos/getUserByIdDto";
import { GetUserByIdUseCaseImpl } from "../../../user/domain/usecases/get-by-id.usecase";
import { ValidateTokenUseCaseImpl } from "../../domain/usecases/validate-token.usecase";
import { TokenDto } from "../../domain/dtos/token.dto";

export class AuthMiddleware {
  // constructor()

  static validateToken = async (req: Request, res: Response, next: NextFunction) => {
    // const accessToken = req.cookies["access_token"];

    const accessToken = req.headers.authorization && req.headers.authorization.split(" ")[1];

    // if (!accessToken) {
    //   throw ErrorHandler.unauthorized("Unauthorized");
    // }

    const validateTokenUseCaseImpl = new ValidateTokenUseCaseImpl();
    const payload = await validateTokenUseCaseImpl.execute(
      TokenDto.create({ token: accessToken }),
      envs().ACCESS_KEY,
    );

    if (!payload) {
      throw ErrorHandler.unauthorized("Invalid token");
    }

    const { idUser } = payload;

    if (!idUser) throw ErrorHandler.unauthorized("Unauthorized");

    (req as Request & { idUserToken: string }).idUserToken = idUser;

    next();
  };

  static validateRefreshToken = async (req: Request, res: Response, next: NextFunction) => {
    // const accessToken = req.cookies["access_token"];

    const refreshToken = req.cookies["refresh_token"];

    // if (!refreshToken) throw ErrorHandler.unauthorized("Refresh token is missing");

    const validateTokenUseCaseImpl = new ValidateTokenUseCaseImpl();

    const payload = await validateTokenUseCaseImpl.execute(
      TokenDto.create({ token: refreshToken }),
      envs().REFRESH_KEY,
    );

    if (!payload) {
      res.clearCookie("refresh_token");
      throw ErrorHandler.unauthorized("Invalid token");
    }

    if (!payload.idUser) {
      throw ErrorHandler.unauthorized("Invalid token");
    }

    const { idUser } = payload;

    (req as Request & { idUserToken: string }).idUserToken = idUser;

    next();
  };

  static hasAuthorization = async (req: Request, res: Response, next: NextFunction) => {
    const { idUserToken } = req as Request & { idUserToken: string };

    const { idUser } = req.body;

    const dto = GetUserByIdDto.create({ idUser: idUserToken });

    const userDatasource = new UserDatasourceImpl();
    const userRepository = new UserRepositoryImpl(userDatasource);

    const user = await new GetUserByIdUseCaseImpl(userRepository).execute(dto);

    if (user!.idUser !== idUser && user!.role !== "administrador")
      throw ErrorHandler.forbidden("You do not have permission to access the resource");

    req.body.currentUserRole = user!.role;

    next();
  };

  static hasPrivileges = async (req: Request, res: Response, next: NextFunction) => {
    const { idUserToken } = req as Request & { idUserToken: string };

    const dto = GetUserByIdDto.create({ idUser: idUserToken });

    const userDatasource = new UserDatasourceImpl();
    const userRepository = new UserRepositoryImpl(userDatasource);

    const user = await new GetUserByIdUseCaseImpl(userRepository).execute(dto);

    if (user!.role !== "administrador")
      throw ErrorHandler.forbidden("You do not have permission to access the resource");

    next();
  };
}
