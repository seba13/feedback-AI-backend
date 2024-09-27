import { ErrorHandler } from "../../../../core";
import { DeleteUserDto } from "../dtos/deleteUserDto";
import { UserRepository } from "../repositories/repository";

export interface DeleteUserUseCase {
  execute: (dto: DeleteUserDto) => Promise<boolean>;
}

export class DeleteUserUseCaseImpl implements DeleteUserUseCase {
  constructor(private readonly repository: UserRepository) {}

  execute = async (dto: DeleteUserDto): Promise<boolean> => {
    const result = await this.repository.deleteUser(dto);

    if (!result) throw ErrorHandler.badRequest("Bad request update user");

    return result;
  };
}
