import { RegisterUserDto } from "../../../auth/domain";
import { CoreDto } from "../../../common";
import { DeleteUserDto } from "../dtos/deleteUserDto";
import { GetUserByEmailDto } from "../dtos/getUserByEmailDto";
import { GetUserByIdDto } from "../dtos/getUserByIdDto";
import { UpdateUserDto } from "../dtos/updateDataUserDto";
import { UserEntity } from "../entities";

export abstract class UserDatasource {
  // abstract login(dto: LoginUserDto): Promise<UserEntity | null>;
  abstract createUser(dto: CoreDto<RegisterUserDto>): Promise<UserEntity | null>;
  abstract getUserById(dto: CoreDto<GetUserByIdDto>): Promise<UserEntity | null>;
  abstract getUserByEmail(email: CoreDto<GetUserByEmailDto>): Promise<UserEntity | null>;

  abstract updateUser(dto: CoreDto<UpdateUserDto>): Promise<boolean>;
  abstract deleteUser(dto: CoreDto<DeleteUserDto>): Promise<boolean>;
  // abstract deleteUser(dto: CoreDto<RegisterUserDto>): Promise<UserEntity | null>;

  // abstract create personalData(dto: CoreDto<RegisterUserDto>: Promise<>)
}
