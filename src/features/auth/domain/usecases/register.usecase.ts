import { ErrorHandler } from "../../../../core";
import { AuthRegisterEntity, AuthRepository, RegisterUserDto } from "..";

import { BCryptAdapter } from "../../infrastructure/adapters";
import { GetUserByEmailDto } from "../../../user/domain/dtos/getUserByEmailDto";

// import { RegisterUserDto } from "../dtos/";
// import { AuthEntity } from "../entities/";
// import { AuthRepository } from "../repositories/";

export interface RegisterUserUseCase {
  execute: (data: RegisterUserDto) => Promise<AuthRegisterEntity>;
}

export class RegisterUserUseCaseImpl implements RegisterUserUseCase {
  constructor(private readonly repository: AuthRepository) {}

  async execute(data: RegisterUserDto): Promise<AuthRegisterEntity> {
    const dto = GetUserByEmailDto.create({ ...data });
    const user = await this.repository.getUserByEmail(dto);

    /**
     * TODO: cambiar a mensaje de error genérico
     */

    // error in the registry. try it again
    if (user) throw ErrorHandler.badRequest("User with this email is already registered");

    const userEntity = await this.repository.createUser({
      ...data,
      password: await BCryptAdapter.hash(data.password),
    } as RegisterUserDto);

    return AuthRegisterEntity.create(userEntity!);
  }
}
