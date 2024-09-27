import { CoreDto } from "../../../common";
import { IToken } from "../../../common/domain/interfaces/IToken";
import { ErrorHandler, ValidationType } from "../../../../core";

export class TokenDto implements CoreDto<TokenDto> {
  public readonly token: string;
  private constructor({ token }: IToken) {
    this.token = token;

    this.validate(this);
  }

  public validate(dto: TokenDto) {
    const errors: ValidationType[] = [];

    if (!dto.token || typeof dto.token !== "string") {
      errors.push({ fields: ["token"], constraint: "token is missing" });
    }
    if (errors.length > 0) {
      throw ErrorHandler.badRequest("Error validating token [Access Token]", errors);
    }
  }

  public static create(object: Record<string, unknown>) {
    const { token } = object;

    return new TokenDto({ token } as IToken);
  }
}
