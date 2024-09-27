// import { RegisterUserDto } from "../dtos/";
// import { AuthEntity } from "../entities/";
// import { AuthRepository } from "../repositories/";

import { ErrorHandler } from "../../../../core";
import { RegisterUserDto } from "../../../auth/domain";
import { BCryptAdapter } from "../../../auth/infrastructure/adapters";
import { GetUserByEmailDto } from "../dtos/getUserByEmailDto";
import { UserEntity } from "../entities";
import { UserRepository } from "../repositories/repository";

export interface RegisterUserUseCase {
  execute: (data: RegisterUserDto) => Promise<UserEntity | null>;
}

export class RegisterUserUseCaseImpl implements RegisterUserUseCase {
  constructor(private readonly repository: UserRepository) {}

  async execute(data: RegisterUserDto): Promise<UserEntity | null> {
    const dto = GetUserByEmailDto.create({ ...data });
    const user = await this.repository.getUserByEmail(dto);

    /**
     * TODO: cambiar a mensaje de error genérico
     */
    if (user) throw ErrorHandler.badRequest("User with this email is already registered");

    const userEntity = await this.repository.createUser({
      ...data,
      password: await BCryptAdapter.hash(data.password),
    } as RegisterUserDto);

    return userEntity;
  }
}
