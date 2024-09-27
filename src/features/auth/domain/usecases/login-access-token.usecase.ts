import { ErrorHandler } from "../../../../core";
import { UserEntity } from "../../../user";
import { GetUserByIdDto } from "../../../user/domain/dtos/getUserByIdDto";
import { UserRepository } from "../../../user/domain/repositories/repository";

export interface LoginWithAccessTokenuseCase {
  execute: (dto: GetUserByIdDto) => Promise<Omit<UserEntity, "password"> | null>;
}

export class LoginWithAccessTokenuseCaseImpl implements LoginWithAccessTokenuseCase {
  constructor(private readonly repository: UserRepository) {}

  execute = async (dto: GetUserByIdDto): Promise<Omit<UserEntity, "password"> | null> => {
    const user = await this.repository.getUserById(dto);

    if (!user) throw ErrorHandler.badRequest("user with this id not found");

    delete (user as { password?: string }).password;

    return user;
  };
}
