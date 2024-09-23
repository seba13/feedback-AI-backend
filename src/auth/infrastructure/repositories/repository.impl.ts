import { UserEntity } from "../../../user";
import { AuthDatasource, LoginUserDto, AuthRepository } from "../../domain/";

// import { AuthDatasource } from "../../domain/datasources/";
// import { LoginUserDto } from "../../domain/dtos";
// import { AuthEntity } from "../../domain/entities/";
// import { AuthRepository } from "../../domain/repositories/";

export class AuthRepositoryImpl implements AuthRepository {
  constructor(private readonly datasource: AuthDatasource) {}

  // public async login(dto: LoginUserDto): Promise<UserEntity | null> {
  //   return await this.datasource.login(dto);
  // }

  /***
   *  TODO:     A CONSIDERAR
   *  INYECTAR DATASOURCE DE LA CAPA USER
   *
   *  O UTILIZAR REPOSITORIO DE USER (GETUSERBYEMAIL, REGISTER)
   *
   */
  public async getUserByEmail(email: string): Promise<UserEntity | null> {
    return await this.datasource.getUserByEmail(email);
  }
  public async register(dto: LoginUserDto): Promise<UserEntity> {
    return await this.datasource.register(dto);
  }
}
