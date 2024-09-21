import { UserEntity } from "../../../user";
import { LoginUserDto } from "../dtos/";

export abstract class AuthDatasource {
  // abstract login(dto: LoginUserDto): Promise<UserEntity | null>;
  abstract register(dto: LoginUserDto): Promise<UserEntity>;
  abstract getUserByEmail(email: string): Promise<UserEntity | null>;
}
