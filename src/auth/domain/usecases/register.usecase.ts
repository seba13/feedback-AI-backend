import { ErrorHandler } from "../../../core/";
import { RegisterUserDto, AuthEntity, AuthRepository } from "../";
import { BCryptAdapter } from "../../infrastructure/adapters/bcrypt.adapter";

// import { RegisterUserDto } from "../dtos/";
// import { AuthEntity } from "../entities/";
// import { AuthRepository } from "../repositories/";

export interface RegisterUseCase {
  execute: (data: RegisterUserDto) => Promise<AuthEntity>;
}

export class RegisterUser implements RegisterUseCase {
  constructor(private readonly repository: AuthRepository) {}

  async execute(data: RegisterUserDto): Promise<AuthEntity> {
    const user = await this.repository.getUserByEmail(data.email);

    /**
     * TODO: cambiar a mensaje de error genérico
     */
    if (user) throw ErrorHandler.badRequest("User with this email is already registered");

    const userEntity = await this.repository.register({
      ...data,
      password: await BCryptAdapter.hash(data.password),
    } as RegisterUserDto);

    return AuthEntity.create(userEntity!);
  }
}
