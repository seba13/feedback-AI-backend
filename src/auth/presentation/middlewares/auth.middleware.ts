import { NextFunction, Request, Response } from "express";
import { ErrorHandler, envs } from "../../../core";
import { JwtAdapter } from "../../infrastructure/adapters/jwt.adapter";

export class AuthMiddleware {
  static validateJwt = async (req: Request, res: Response, next: NextFunction) => {
    // const accessToken = req.cookies["access_token"];

    const accessToken = req.headers.authorization && req.headers.authorization.split(" ")[1];

    if (!accessToken) {
      throw ErrorHandler.unauthorized("Unauthorized");
    }

    const isValid = await JwtAdapter.ValidateToken(accessToken, envs().ACCESS_KEY);

    if (!isValid) {
      throw ErrorHandler.unauthorized("Invalid token");
    }

    next();
  };
}
