import { ErrorHandler } from "../../../../core";
import { GetUserByEmailDto } from "../dtos/getUserByEmailDto";
import { UserEntity } from "../entities";
import { UserRepository } from "../repositories/repository";

export interface GetUserByEmailUseCase {
  execute: (dto: GetUserByEmailDto) => Promise<Omit<UserEntity, "password"> | null>;
}

export class GetUserByEmailUseCaseImpl implements GetUserByEmailUseCase {
  constructor(private readonly repository: UserRepository) {}

  execute = async (dto: GetUserByEmailDto): Promise<Omit<UserEntity, "password"> | null> => {
    const user = await this.repository.getUserByEmail(dto);

    if (!user) throw ErrorHandler.notFound("user with this email not found");

    delete (user as { password?: string }).password;

    return user;
  };
}
