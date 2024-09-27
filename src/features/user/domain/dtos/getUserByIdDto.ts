import { CoreDto } from "../../../common";
import { ErrorHandler, ValidationType } from "../../../../core";
import { IGetUserById } from "../interfaces";
import { UUIDAdapter } from "../../../auth/infrastructure/adapters/uuid.adapter";

export class GetUserByIdDto implements CoreDto<GetUserByIdDto> {
  public readonly idUser: string;
  private constructor({ idUser }: IGetUserById) {
    this.idUser = idUser;

    this.validate(this);
  }

  public validate(dto: GetUserByIdDto) {
    const errors: ValidationType[] = [];
    const { idUser } = dto;

    if (!idUser) {
      errors.push({ fields: ["idUser"], constraint: "id cannot be null or undefined." });
    }

    if (idUser && typeof idUser !== "string") {
      errors.push({
        fields: ["idUser"],
        constraint: `A value of type 'string' was expected, but '${typeof idUser}' was received.`,
      });
    }

    if (idUser && !UUIDAdapter.validate(idUser)) {
      errors.push({ fields: ["idUser"], constraint: "invalid uuid" });
    }

    if (errors.length > 0) {
      throw ErrorHandler.badRequest("Error validating get User by id", errors);
    }
  }

  public static create(object: Record<string, unknown>) {
    const { idUser } = object;

    return new GetUserByIdDto({ idUser } as unknown as IGetUserById);
  }
}
