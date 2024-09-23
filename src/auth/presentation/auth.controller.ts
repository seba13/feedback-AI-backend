import { type Request, type Response } from "express";

import { AuthRepository } from "../domain/repositories/repository";
import { ILoginUserDto, LoginUserDto } from "../domain/dtos";
import { LoginUser } from "../domain/usecases/login.usecase";
import { RegisterUser } from "../domain/usecases/register.usecase";
import { IRegisterUserDTO, RegisterUserDto } from "../domain/dtos/register.dto";
import { JwtAdapter } from "../infrastructure/adapters/jwt.adapter";

import { envs, ErrorHandler, HttpCode } from "../../core";

export class AuthController {
  constructor(private readonly repository: AuthRepository) {}

  login = async (req: Request, res: Response) => {
    const userDataBody: ILoginUserDto = req.body;

    const dto = LoginUserDto.create(userDataBody);

    const { user } = await new LoginUser(this.repository).execute(dto);

    // TODO: PASARLO A OTRO MODULO
    const refreshToken = await JwtAdapter.generateToken(
      { idUser: user.idUser },
      envs().REFRESH_KEY,
      "10s",
    );
    const token = await JwtAdapter.generateToken({ idUser: user.idUser }, envs().ACCESS_KEY, "1d");
    //
    res.cookie("refresh_token", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24,
      // path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    return res.json({ ok: true, ...user, token, refreshToken });
  };

  register = async (req: Request, res: Response) => {
    const userDataBody: IRegisterUserDTO = req.body;

    const registerDto = RegisterUserDto.create(userDataBody);

    const { user } = await new RegisterUser(this.repository).execute(registerDto);

    return res.json({ ok: true, ...user });
  };

  logout = async (req: Request, res: Response) => {
    console.log("logout");

    // res.cookie("refresh_token", {});
    res.clearCookie("refresh_token");

    return res.sendStatus(HttpCode.NO_CONTENT);
  };

  refresh = async (req: Request, res: Response) => {
    const refreshToken = req.cookies["refresh_token"];

    if (!refreshToken) throw ErrorHandler.unauthorized("Refresh token is missing or invalid");

    const { idUser } = (await JwtAdapter.ValidateToken(refreshToken, envs().REFRESH_KEY)) as {
      idUser: string;
    };

    if (!idUser) {
      // res.cookie("refresh_token", {});
      res.clearCookie("refresh_token");
      throw ErrorHandler.unauthorized("Invalid token");
    }

    const token = await JwtAdapter.generateToken({ idUser }, envs().ACCESS_KEY, "5m");

    res.json({
      ok: true,
      token,
    });
  };
}
