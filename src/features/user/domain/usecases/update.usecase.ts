import { ErrorHandler } from "../../../../core";
import { GetUserByIdDto } from "../dtos/getUserByIdDto";
import { UpdateUserDto } from "../dtos/updateDataUserDto";
import { UserRepository } from "../repositories/repository";

export interface UpdateUserUseCase {
  execute: (dto: UpdateUserDto) => Promise<boolean>;
}

export class UpdateUserUseCaseImpl implements UpdateUserUseCase {
  constructor(private readonly repository: UserRepository) {}

  execute = async (dto: UpdateUserDto): Promise<boolean> => {
    const user = await this.repository.getUserById(GetUserByIdDto.create({ idUser: dto.idUser }));

    if (!user) throw ErrorHandler.notFound("user with this id not found");

    const result = await this.repository.updateUser(dto);

    if (!result) throw ErrorHandler.internalError("Error on update user");

    return result;
  };
}
