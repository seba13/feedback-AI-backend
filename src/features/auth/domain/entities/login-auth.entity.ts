import { UserEntity } from "../../../user";

export class AuthLoginEntity {
  constructor(
    public readonly user: Omit<UserEntity, "password">,
    public readonly token: string,
    public readonly refreshToken: string,
    // public readonly token: string,
  ) {}

  static create(user: UserEntity, token: string, refreshToken: string): AuthLoginEntity {
    delete (user as { password?: string }).password;

    return new AuthLoginEntity(user, token, refreshToken);
  }
}
