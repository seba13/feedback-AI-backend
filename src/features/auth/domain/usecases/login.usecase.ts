import { envs, ErrorHandler } from "../../../../core";
import { BCryptAdapter, JwtAdapter } from "../../infrastructure/adapters";

import { LoginUserDto, AuthLoginEntity, AuthRepository } from "..";
import { GetUserByEmailDto } from "../../../user/domain/dtos/getUserByEmailDto";

// import { LoginUserDto } from "../dtos";
// import { AuthEntity } from "../entities";
// import { AuthRepository } from "../repositories";

export interface LoginUserUseCase {
  execute: (data: LoginUserDto) => Promise<AuthLoginEntity>;
}

export class LoginUserUseCaseImpl implements LoginUserUseCase {
  constructor(private readonly repository: AuthRepository) {}

  async execute(data: LoginUserDto): Promise<AuthLoginEntity> {
    const dto = GetUserByEmailDto.create({ ...data });

    const userEntity = await this.repository.getUserByEmail(dto);

    if (!userEntity) throw ErrorHandler.badRequest("user with this email not found");

    if (!userEntity.active) {
      throw ErrorHandler.forbidden("invalid credentials");
    }

    if (!(await BCryptAdapter.compare(data.password, userEntity.password)))
      throw ErrorHandler.badRequest("password is wrong");

    const refreshToken = await JwtAdapter.generateToken(
      { idUser: userEntity.idUser },
      envs().REFRESH_KEY,
      "1d",
    );
    const token = await JwtAdapter.generateToken(
      { idUser: userEntity.idUser },
      envs().ACCESS_KEY,
      "10m",
    );
    //

    const authEntity = AuthLoginEntity.create(userEntity!, token, refreshToken);

    return authEntity;
  }
}
