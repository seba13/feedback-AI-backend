import { CoreDto } from "../../../common";
import { ErrorHandler, ValidationType } from "../../../../core";
import { UUIDAdapter } from "../../../auth/infrastructure/adapters/uuid.adapter";
import { IDeleteUser } from "../interfaces/IDeleteUser";

export class DeleteUserDto implements CoreDto<DeleteUserDto> {
  public readonly idUser: string;
  public readonly active: boolean;

  private constructor({ idUser, active }: IDeleteUser) {
    this.idUser = idUser;
    this.active = active;

    this.validate(this);
  }

  public validate(dto: DeleteUserDto) {
    const errors: ValidationType[] = [];
    const { idUser, active } = dto;

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

    if (active === null || active === undefined) {
      errors.push({ fields: ["active"], constraint: "active cannot be null or undefined." });
    }

    if (active && typeof active !== "boolean") {
      errors.push({
        fields: ["active"],
        constraint: `A value of type 'boolean' was expected, but '${typeof active}' was received.`,
      });
    }

    if (errors.length > 0) {
      throw ErrorHandler.badRequest("Error validating get User by id", errors);
    }
  }

  public static create(object: Record<string, unknown>) {
    const { idUser, active } = object;

    const expectedProps = ["idUser", "active"];

    // Obtener las propiedades que se pasaron en el objeto
    const receivedProps = Object.keys(object);

    // Identificar las propiedades adicionales
    const extraProps = receivedProps.filter((prop) => !expectedProps.includes(prop));

    if (extraProps.length > 0) {
      throw ErrorHandler.badRequest(`Unexpected properties: ${extraProps.join(", ")}`);
    }

    return new DeleteUserDto({ idUser, active } as unknown as IDeleteUser);
  }
}
