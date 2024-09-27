import { LoginUserDto } from "..";
import { CoreDto } from "../../../common";
import { UserEntity } from "../../../user";
import { GetUserByEmailDto } from "../../../user/domain/dtos/getUserByEmailDto";

// import { LoginUserDto } from "../dtos/";
// import { AuthEntity } from "../entities/";

export abstract class AuthRepository {
  // abstract login(dto: LoginUserDto): Promise<UserEntity | null>;
  abstract createUser(dto: CoreDto<LoginUserDto>): Promise<UserEntity | null>;
  abstract getUserByEmail(dto: CoreDto<GetUserByEmailDto>): Promise<UserEntity | null>;
}
