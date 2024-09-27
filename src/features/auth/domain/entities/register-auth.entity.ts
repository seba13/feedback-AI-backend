import { UserEntity } from "../../../user";

export class AuthRegisterEntity {
  constructor(
    public readonly user: Omit<UserEntity, "password">,
    // public readonly token: string,
  ) {}

  static create(user: UserEntity): AuthRegisterEntity {
    delete (user as { password?: string }).password;

    return new AuthRegisterEntity(user);
  }
}
