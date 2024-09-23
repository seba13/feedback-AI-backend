import { UserEntity } from "../../../user";
import { AuthDatasource, RegisterUserDto } from "../../domain";

// import { PersonalDataEntity } from "../../../user/domain/entities/";
// import { AuthDatasource } from "../../domain/datasources";
// import { LoginUserDto, RegisterUserDto } from "../../domain/dtos/";
// import { AuthEntity } from "../../domain/entities/";

import { v4 } from "uuid";
export const users: UserEntity[] = [
  {
    idUser: v4(),
    password: "123456",
    name: "jhon",
    lastName: "doe",
    email: "hola@hola.com",
    rut: "12345789",
    dv: "k",
    idEmpresa: "1234",
    idComuna: "12345",
  },
];

export class AuthDatasourceImpl implements AuthDatasource {
  // async login(dto: LoginUserDto): Promise<UserEntity> {
  //   const { email } = dto;

  //   const data = users.find((user) => user.email === email);

  //   if (!data) return {} as UserEntity;

  //   const user = UserEntity.create({ ...data });

  //   return await user;
  // }

  async getUserByEmail(email: string): Promise<UserEntity | null> {
    const user = users.find((user) => user.email === email);

    if (!user) return null;

    return UserEntity.create({ ...user });
  }

  async register(dto: RegisterUserDto): Promise<UserEntity> {
    const user: UserEntity = { idUser: v4(), ...dto };

    users.push(user);

    return UserEntity.create({ ...user });
  }
}
