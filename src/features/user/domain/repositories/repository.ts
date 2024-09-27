import { RegisterUserDto } from "../../../auth/domain";
import { DeleteUserDto } from "../dtos/deleteUserDto";
import { GetUserByEmailDto } from "../dtos/getUserByEmailDto";
import { GetUserByIdDto } from "../dtos/getUserByIdDto";
import { UpdateUserDto } from "../dtos/updateDataUserDto";
import { UserEntity } from "../entities";

export abstract class UserRepository {
  // abstract login(dto: LoginUserDto): Promise<UserEntity | null>;
  abstract createUser(dto: RegisterUserDto): Promise<UserEntity | null>;
  abstract getUserByEmail(email: GetUserByEmailDto): Promise<UserEntity | null>;
  abstract getUserById(idUser: GetUserByIdDto): Promise<UserEntity | null>;

  abstract updateUser(dto: UpdateUserDto): Promise<boolean>;
  abstract deleteUser(dto: DeleteUserDto): Promise<boolean>;
}

// src\user\domain\usecases\create.usecase.ts
// src\user\domain\usecases\delete.usecase.ts
// src\user\domain\usecases\get-all.usecase.ts
// src\user\domain\usecases\get-by-email.usecase.ts
// src\user\domain\usecases\get-by-id.usecase.ts
// src\user\domain\usecases\update.usecase.ts
