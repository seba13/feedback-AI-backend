import { ErrorHandler } from "../../../core";

import { LoginUserDto, AuthEntity, AuthRepository } from "../";
import { BCryptAdapter } from "../../infrastructure/adapters/bcrypt.adapter";

// import { LoginUserDto } from "../dtos";
// import { AuthEntity } from "../entities";
// import { AuthRepository } from "../repositories";

export interface LoginUserUseCase {
  execute: (data: LoginUserDto) => Promise<AuthEntity>;
}

export class LoginUser implements LoginUserUseCase {
  constructor(private readonly repository: AuthRepository) {}

  async execute(data: LoginUserDto): Promise<AuthEntity> {
    const userEntity = await this.repository.getUserByEmail(data.email);

    if (!userEntity) throw ErrorHandler.badRequest("user with this email not found");

    if (!(await BCryptAdapter.compare(data.password, userEntity.password)))
      throw ErrorHandler.badRequest("password is wrong");

    const authEntity = AuthEntity.create(userEntity!);

    return authEntity;
  }
}
