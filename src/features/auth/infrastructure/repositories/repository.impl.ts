import { UserEntity } from "../../../user";
import { UserDatasource } from "../../../user/domain/datasources/datasource";
import { GetUserByEmailDto } from "../../../user/domain/dtos/getUserByEmailDto";
import { AuthRepository, RegisterUserDto } from "../../domain";

// import { AuthDatasource } from "../../domain/datasources/";
// import { LoginUserDto } from "../../domain/dtos";
// import { AuthEntity } from "../../domain/entities/";
// import { AuthRepository } from "../../domain/repositories/";

export class AuthRepositoryImpl implements AuthRepository {
  constructor(private readonly datasource: UserDatasource) {}

  public async getUserByEmail(dto: GetUserByEmailDto): Promise<UserEntity | null> {
    return await this.datasource.getUserByEmail(dto);
  }
  public async createUser(dto: RegisterUserDto): Promise<UserEntity | null> {
    return await this.datasource.createUser(dto);
  }
}
