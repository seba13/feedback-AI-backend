import { ErrorHandler } from "../../../../core";
import { GetUserByIdDto } from "../dtos/getUserByIdDto";
import { UserEntity } from "../entities";
import { UserRepository } from "../repositories/repository";

export interface GetUserByIdUseCase {
  execute: (dto: GetUserByIdDto) => Promise<Omit<UserEntity, "password"> | null>;
}

export class GetUserByIdUseCaseImpl implements GetUserByIdUseCase {
  constructor(private readonly repository: UserRepository) {}

  execute = async (dto: GetUserByIdDto): Promise<Omit<UserEntity, "password"> | null> => {
    const user = await this.repository.getUserById(dto);

    if (!user) throw ErrorHandler.notFound("user with this id not found");

    delete (user as { password?: string }).password;

    return user;
  };
}
