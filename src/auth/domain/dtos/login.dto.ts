import { CoreDto } from "../../../common";
import {
  ErrorHandler,
  REGEX_EMAIL,
  SIX_LENGTH,
  TWUELVE_LENGTH,
  ValidationType,
} from "../../../core";

export interface ILoginUserDto {
  email: string;
  password: string;
}

export class LoginUserDto implements CoreDto<LoginUserDto> {
  public readonly email: string;
  public readonly password: string;

  private constructor(object: ILoginUserDto) {
    this.email = object.email;
    this.password = object.password;
    this.validate(this);
  }

  validate(dto: LoginUserDto): void {
    const errors: ValidationType[] = [];

    const { email, password } = dto;

    if (!email || !REGEX_EMAIL.test(email)) {
      errors.push({ fields: ["email"], constraint: "Email is not valid" });
    }

    if (email && typeof email !== "string") {
      errors.push({ fields: ["email"], constraint: "expected type string" });
    }

    if (!password) {
      errors.push({ fields: ["password"], constraint: "password is not valid" });
    }
    if (password && password.length < SIX_LENGTH) {
      errors.push({
        fields: ["password"],
        constraint: "password length is lower than " + SIX_LENGTH,
      });
    }
    if (password && password.length > TWUELVE_LENGTH) {
      errors.push({
        fields: ["password"],
        constraint: "password length is greater than " + TWUELVE_LENGTH,
      });
    }

    if (password && typeof password !== "string") {
      errors.push({ fields: ["password"], constraint: "expected type string" });
    }

    if (errors.length > 0)
      throw ErrorHandler.badRequest("Error validating user data [Login user]", errors);
  }

  // Record<string, unknown> => {[key:name]: unknow}
  // public static create(object: Record<string, unknown>): LoginUserDto {
  public static create(object: ILoginUserDto): LoginUserDto {
    // const { email, password } = object;

    // return new LoginUserDto(email as string, password as string);
    return new LoginUserDto(object);
  }
}
