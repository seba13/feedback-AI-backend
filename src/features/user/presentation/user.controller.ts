import { Request, Response } from "express";
import { IGetUserById } from "../domain";
import { GetUserByIdUseCase } from "../domain/usecases/get-by-id.usecase";
import { GetUserByIdDto } from "../domain/dtos/getUserByIdDto";
import { GetUserByEmailUseCase } from "../domain/usecases/get-by-email.usecase";
import { IGetUserByEmail } from "../domain/interfaces/IGetUserByEmail";
import { GetUserByEmailDto } from "../domain/dtos/getUserByEmailDto";
import { IUpdateUser } from "../domain/interfaces/IUpdateUser";
import { UpdateUserUseCase } from "../domain/usecases/update.usecase";
import { UpdateUserDto } from "../domain/dtos/updateDataUserDto";
import { DeleteUserUseCase } from "../domain/usecases/delete.usecase";
import { DeleteUserDto } from "../domain/dtos/deleteUserDto";
import { IDeleteUser } from "../domain/interfaces/IDeleteUser";

export class UserController {
  constructor(
    private readonly getUserByIdUseCaseImpl: GetUserByIdUseCase,
    private readonly getUserByEmailUseCaseImpl: GetUserByEmailUseCase,
    private readonly updateUserUseCaseImpl: UpdateUserUseCase,
    private readonly deleteUserUseCaseImpl: DeleteUserUseCase,
  ) {}

  getUserById = async (req: Request, res: Response) => {
    const dto = req.params as IGetUserById;

    const user = await this.getUserByIdUseCaseImpl.execute(GetUserByIdDto.create(dto));

    return res.json({
      ok: true,
      ...user,
    });
  };

  getUserByEmail = async (req: Request, res: Response) => {
    // const dto: IGetUserByEmail = req.body;
    const dto = req.params as IGetUserByEmail;

    const user = await this.getUserByEmailUseCaseImpl.execute(GetUserByEmailDto.create(dto));

    return res.json({
      ok: true,
      ...user,
    });
  };

  updateUser = async (req: Request, res: Response) => {
    const dto: IUpdateUser = req.body;

    const result = await this.updateUserUseCaseImpl.execute(UpdateUserDto.create(dto));

    return res.json({
      ok: true,
      result,
    });
  };

  deleteUser = async (req: Request, res: Response) => {
    const dto: IDeleteUser = req.body;

    const result = await this.deleteUserUseCaseImpl.execute(DeleteUserDto.create(dto));

    return res.json({
      ok: true,
      result,
    });
  };

  getUserByIdBody = async (req: Request, res: Response) => {
    const dto: IGetUserById = req.body;

    const user = await this.getUserByIdUseCaseImpl.execute(GetUserByIdDto.create(dto));

    return res.json({
      ok: true,
      ...user,
    });
  };
}
