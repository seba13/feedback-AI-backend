import { type Request, type Response } from "express";

import { AuthRepository } from "../domain/repositories/repository";
import { ILoginUserDto, LoginUserDto } from "../domain/dtos";
import { LoginUser } from "../domain/usecases/login.usecase";
import { RegisterUser } from "../domain/usecases/register.usecase";
import { IRegisterUserDTO, RegisterUserDto } from "../domain/dtos/register.dto";

export class AuthController {
  constructor(private readonly repository: AuthRepository) {}

  login = async (req: Request, res: Response) => {
    const userDataBody: ILoginUserDto = req.body;

    const dto = LoginUserDto.create(userDataBody);

    const result = await new LoginUser(this.repository).execute(dto);

    return res.json({ data: result });
  };

  register = async (req: Request, res: Response) => {
    const userDataBody: IRegisterUserDTO = req.body;

    const registerDto = RegisterUserDto.create(userDataBody);

    const result = await new RegisterUser(this.repository).execute(registerDto);

    return res.json({ data: result });
  };
}
