import { ErrorHandler, ValidationType } from "../../../../core";
import { UUIDAdapter } from "../../../auth/infrastructure/adapters/uuid.adapter";
import { CoreDto } from "../../../common";
import { IUpdateUser } from "../interfaces/IUpdateUser";

export class UpdateUserDto implements CoreDto<UpdateUserDto> {
  public readonly idUser: string; // ID del usuario
  public readonly name: string | undefined;
  public readonly lastName: string | undefined;
  public readonly password: string | undefined;
  public readonly rut: string | undefined;
  public readonly dv: string | undefined;
  public readonly idCompany: number | undefined;
  public readonly idCommune: number | undefined;
  public readonly active: boolean | undefined;
  public readonly role: string | undefined;
  public readonly currentUserRole: string;

  constructor({
    idUser,
    name,
    lastName,
    rut,
    dv,
    idCompany,
    idCommune,
    role,
    active,
    currentUserRole,
  }: IUpdateUser) {
    this.idUser = idUser;
    this.name = name;
    this.lastName = lastName;
    this.rut = rut;
    this.dv = dv;
    this.idCompany = idCompany;
    this.idCommune = idCommune;
    this.role = role;
    this.active = active;
    this.currentUserRole = currentUserRole;
    this.validate(this);
  }

  validate(dto: UpdateUserDto): void {
    const errors: ValidationType[] = [];

    const { idUser, name, lastName, rut, dv, idCompany, idCommune, role, currentUserRole } = dto;

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

    if (name && typeof name !== "string") {
      errors.push({
        fields: ["name"],
        constraint: `A value of type 'string' was expected, but '${typeof name}' was received.`,
      });
    }
    if (lastName && typeof lastName !== "string") {
      errors.push({
        fields: ["name"],
        constraint: `A value of type 'string' was expected, but '${typeof lastName}' was received.`,
      });
    }

    if (rut && typeof rut !== "string") {
      errors.push({
        fields: ["name"],
        constraint: `A value of type 'string' was expected, but '${typeof rut}' was received.`,
      });
    }

    if (dv && typeof dv !== "string") {
      errors.push({
        fields: ["name"],
        constraint: `A value of type 'string' was expected, but '${typeof rut}' was received.`,
      });
    }

    if (idCommune && (typeof idCommune !== "number" || isNaN(idCommune))) {
      errors.push({
        fields: ["idCommune"],
        constraint: `A value of type 'number' was expected, but '${typeof idCommune}' was received.`,
      });
    }
    if (idCompany && (typeof idCompany !== "number" || isNaN(idCompany))) {
      errors.push({
        fields: ["idCompany"],
        constraint: `A value of type 'number' was expected, but '${typeof idCompany}' was received.`,
      });
    }

    if (role && typeof role !== "string") {
      errors.push({
        fields: ["role"],
        constraint: `A value of type 'string' was expected, but "${typeof role}" was received.`,
      });
    }

    // comprobar si el rol intenta cambiarse siendo un rol de tipo user
    //se extrae de idUser token
    if (!currentUserRole) {
      errors.push({
        fields: ["currentUserRole"],
        constraint: "currentUserRole cannot be null or undefined.",
      });
    }

    if (role !== "usuario" && currentUserRole === "usuario") {
      errors.push({
        fields: ["rol"],
        constraint: "You do not have permission to update your own role.",
      });
    }

    if (errors.length > 0) throw ErrorHandler.badRequest("error validating update user", errors);
  }

  public static create(object: Record<string, unknown>) {
    return new UpdateUserDto(<IUpdateUser>object);
  }
}
