import { LoginUserDto } from "../";
import { UserEntity } from "../../../user";

// import { LoginUserDto } from "../dtos/";
// import { AuthEntity } from "../entities/";

export abstract class AuthRepository {
  // abstract login(dto: LoginUserDto): Promise<UserEntity | null>;
  abstract register(dto: LoginUserDto): Promise<UserEntity>;
  abstract getUserByEmail(email: string): Promise<UserEntity | null>;
}
