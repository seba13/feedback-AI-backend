import { UserEntity } from "../../../user";
import { GetUserByEmailDto } from "../../../user/domain/dtos/getUserByEmailDto";
import { LoginUserDto } from "../dtos";

export abstract class AuthDatasource {
  // abstract login(dto: LoginUserDto): Promise<UserEntity | null>;
  abstract register(dto: LoginUserDto): Promise<UserEntity>;
  abstract getUserByEmail(dto: GetUserByEmailDto): Promise<UserEntity | null>;
}
