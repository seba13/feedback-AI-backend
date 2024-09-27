import { CoreDto } from "../../../common";
import { ErrorHandler, REGEX_EMAIL, ValidationType } from "../../../../core";
import { IGetUserByEmail } from "../interfaces/IGetUserByEmail";

export class GetUserByEmailDto implements CoreDto<GetUserByEmailDto> {
  public readonly email: string;
  private constructor({ email }: IGetUserByEmail) {
    this.email = email;

    this.validate(this);
  }

  public validate(dto: GetUserByEmailDto) {
    const errors: ValidationType[] = [];

    const { email } = dto;

    if (!email) {
      errors.push({ fields: ["email"], constraint: "email cannot be null or undefined." });
    }

    if (email && typeof email !== "string") {
      errors.push({
        fields: ["name"],
        constraint: `A value of type 'string' was expected, but '${typeof email}' was received.`,
      });
    }

    if (email && !REGEX_EMAIL.test(email)) {
      errors.push({
        fields: ["name"],
        constraint: `email is not a valid email`,
      });
    }

    if (errors.length > 0) {
      throw ErrorHandler.badRequest("Error validating get User by email", errors);
    }
  }

  public static create(object: Record<string, unknown>) {
    const { email } = object;

    return new GetUserByEmailDto({ email } as IGetUserByEmail);
  }
}
