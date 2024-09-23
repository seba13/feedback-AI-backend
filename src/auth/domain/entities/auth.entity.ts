import { UserEntity } from "../../../user";

export class AuthEntity {
  constructor(
    public readonly user: Omit<UserEntity, "password">,
    // public readonly token: string,
  ) {}

  static create(user: UserEntity): AuthEntity {
    // delete (user as { password?: string }).password;

    return new AuthEntity(user);
  }
}
