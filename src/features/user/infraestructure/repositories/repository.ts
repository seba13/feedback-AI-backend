import { RegisterUserDto } from "../../../auth/domain";
import { UserEntity } from "../..";
import { UserDatasource } from "../../domain/datasources/datasource";
import { GetUserByEmailDto } from "../../domain/dtos/getUserByEmailDto";
import { GetUserByIdDto } from "../../domain/dtos/getUserByIdDto";
import { UserRepository } from "../../domain/repositories/repository";
import { CoreDto } from "../../../common";
import { UpdateUserDto } from "../../domain/dtos/updateDataUserDto";
import { DeleteUserDto } from "../../domain/dtos/deleteUserDto";

export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly datasource: UserDatasource) {}

  public async getUserByEmail(dto: GetUserByEmailDto): Promise<UserEntity | null> {
    return await this.datasource.getUserByEmail(dto);
  }
  public async createUser(dto: RegisterUserDto): Promise<UserEntity | null> {
    return await this.datasource.createUser(dto);
  }

  public async getUserById(dto: GetUserByIdDto): Promise<UserEntity | null> {
    return await this.datasource.getUserById(dto);
  }

  public async updateUser(dto: CoreDto<UpdateUserDto>): Promise<boolean> {
    return await this.datasource.updateUser(dto);
  }

  public async deleteUser(dto: DeleteUserDto): Promise<boolean> {
    return await this.datasource.deleteUser(dto);
  }
}
