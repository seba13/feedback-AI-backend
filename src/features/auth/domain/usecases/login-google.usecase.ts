import { envs, ErrorHandler } from "../../../../core";
import { GetUserByEmailDto } from "../../../user/domain/dtos/getUserByEmailDto";
import { UserRepository } from "../../../user/domain/repositories/repository";
import { JwtAdapter } from "../../infrastructure/adapters";

import { GoogleAuthService } from "../../infrastructure/services/google-auth.service";
import { AuthLoginEntity } from "../entities";

export interface LoginWithGoogleUseCase {
  execute: (code: string) => Promise<AuthLoginEntity>;
}

export interface UserDataGoogle {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  email: string;
  email_verified: true;
}

export class LoginWithGoogleUseCaseImpl implements LoginWithGoogleUseCase {
  constructor(
    private readonly googeAuthService: GoogleAuthService,
    private repository: UserRepository,
  ) {}

  execute = async (code: string): Promise<AuthLoginEntity> => {
    const { email } = (await this.googeAuthService.getData(code)) as UserDataGoogle;

    if (!email) throw ErrorHandler.badRequest("invalid code request");

    const userEntity = await this.repository.getUserByEmail(GetUserByEmailDto.create({ email }));

    if (!userEntity) throw ErrorHandler.badRequest("invalid credentials");

    if (!userEntity.active) {
      throw ErrorHandler.forbidden("invalid credentials");
    }
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
  };
}
