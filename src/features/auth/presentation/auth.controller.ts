import { type Request, type Response } from "express";

import { ILoginUserDto, LoginUserDto } from "../domain/dtos";
import { LoginUserUseCase } from "../domain/usecases/login.usecase";
import { RegisterUserUseCase } from "../domain/usecases/register.usecase";
import { IRegisterUserDTO, RegisterUserDto } from "../domain/dtos/register.dto";
import { JwtAdapter } from "../infrastructure/adapters/jwt.adapter";

import { envs, ErrorHandler, HttpCode } from "../../../core";
import { UserDatasourceImpl } from "../../user/infraestructure/datasources/mysql.datasource.impl";
import { GetUserByIdDto } from "../../user/domain/dtos/getUserByIdDto";
import { UserRepositoryImpl } from "../../user/infraestructure/repositories/repository";
import { GetUserByIdUseCaseImpl } from "../../user/domain/usecases/get-by-id.usecase";
import { GoogleAuthService } from "../infrastructure/services/google-auth.service";
import { LoginWithGoogleUseCaseImpl } from "../domain/usecases/login-google.usecase";

export class AuthController {
  constructor(
    private readonly loginUserUsecaseImpl: LoginUserUseCase,
    private readonly registerUserUsecaseImpl: RegisterUserUseCase,
  ) {}

  login = async (req: Request, res: Response) => {
    const userDataBody: ILoginUserDto = req.body;

    const dto = LoginUserDto.create(userDataBody);

    const { user, refreshToken, token } = await this.loginUserUsecaseImpl.execute(dto);

    res.cookie("refresh_token", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24,
      // path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    return res.json({ ok: true, ...user, token, refreshToken });
  };

  loginWithAccessToken = async (req: Request, res: Response) => {
    const { idUserToken } = req as Request & { idUserToken?: string };

    const dto = GetUserByIdDto.create({ idUser: idUserToken });

    const userDatasource = new UserDatasourceImpl();
    const userRepository = new UserRepositoryImpl(userDatasource);

    try {
      const user = await new GetUserByIdUseCaseImpl(userRepository).execute(dto);

      return res.json({
        ok: true,
        ...user,
      });
    } catch (error) {
      res.clearCookie("refresh_token");
      throw error;
    }
  };

  register = async (req: Request, res: Response) => {
    const userDataBody: IRegisterUserDTO = req.body;

    const registerDto = RegisterUserDto.create(userDataBody);

    const { user } = await this.registerUserUsecaseImpl.execute(registerDto);

    return res.json({ ok: true, ...user });
  };

  logout = async (req: Request, res: Response) => {
    console.log("logout");

    // res.cookie("refresh_token", {});
    res.clearCookie("refresh_token");

    return res.sendStatus(HttpCode.NO_CONTENT);
  };

  refresh = async (req: Request, res: Response) => {
    // const refreshToken = req.cookies["refresh_token"];

    // if (!refreshToken) throw ErrorHandler.unauthorized("Refresh token is missing or invalid");

    // const { idUser } = (await JwtAdapter.ValidateToken(refreshToken, envs().REFRESH_KEY)) as {
    //   idUser: string;
    // };

    const { idUserToken } = req as Request & { idUserToken: string };

    if (!idUserToken) {
      // res.cookie("refresh_token", {});
      res.clearCookie("refresh_token");
      throw ErrorHandler.unauthorized("Invalid token");
    }

    const token = await JwtAdapter.generateToken({ idUser: idUserToken }, envs().ACCESS_KEY, "5m");

    res.json({
      ok: true,
      token,
    });
  };

  loginWithGoogle = async (req: Request, res: Response) => {
    const { code } = req.body;

    const googleAuthService = new GoogleAuthService();

    const UserDatasource = new UserDatasourceImpl();
    const userRepositoryImpl = new UserRepositoryImpl(UserDatasource);

    const { user, refreshToken, token } = await new LoginWithGoogleUseCaseImpl(
      googleAuthService,
      userRepositoryImpl,
    ).execute(code);

    res.cookie("refresh_token", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24,
      // path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    return res.json({ ok: true, ...user, token, refreshToken });
  };
}
