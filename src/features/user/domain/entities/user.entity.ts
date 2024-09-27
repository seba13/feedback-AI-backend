import { ErrorHandler } from "../../../../core";
import { IUser } from "../interfaces";

export class UserEntity {
  public readonly idUser: string; // ID del usuario
  public readonly name: string;
  public readonly lastName: string;
  public readonly email: string;
  public readonly password: string;
  public readonly rut: string;
  public readonly dv: string;
  public readonly idCompany: number;
  public readonly idCommune: number;
  public readonly role: string;
  public readonly active: boolean;

  constructor({
    idUser,
    name,
    lastName,
    email,
    password,
    rut,
    dv,
    idCompany,
    idCommune,
    role,
    active,
  }: IUser) {
    this.idUser = idUser;
    this.name = name;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.rut = rut;
    this.dv = dv;
    this.idCompany = idCompany;
    this.idCommune = idCommune;
    this.role = role;
    this.active = active;
  }

  static create(object: Record<string, unknown>): IUser {
    const { idUser, password, email, name, lastName, rut, dv, idCompany, idCommune, role, active } =
      object;

    if (!idUser)
      throw ErrorHandler.badRequest("This entity requires an id field.", [
        { fields: ["id"], constraint: "undefined value" },
      ]);

    if (!name || (name as string).length === 0)
      throw ErrorHandler.badRequest("This entity requires an name field.", [
        { fields: ["name"], constraint: "undefined value" },
      ]);

    if (!lastName || (lastName as string).length === 0)
      throw ErrorHandler.badRequest("This entity requires an lastName field.", [
        { fields: ["lastName"], constraint: "undefined value" },
      ]);

    if (!email || (email as string).length === 0)
      throw ErrorHandler.badRequest("This entity requires an email field.", [
        { fields: ["email"], constraint: "undefined value" },
      ]);

    if (!password || (password as string).length === 0)
      throw ErrorHandler.badRequest("This entity requires an password field.", [
        { fields: ["password"], constraint: "undefined value" },
      ]);

    if (!rut || (rut as string).length === 0)
      throw ErrorHandler.badRequest("This entity requires an rut field.", [
        { fields: ["rut"], constraint: "undefined value" },
      ]);

    if (!dv || (dv as string).length === 0)
      throw ErrorHandler.badRequest("This entity requires an dv field.", [
        { fields: ["dv"], constraint: "undefined value" },
      ]);

    if (!idCommune || isNaN(idCommune as number))
      throw ErrorHandler.badRequest("This entity requires an idCommune field.", [
        { fields: ["idCommune"], constraint: "undefined value" },
      ]);

    if (!role || (role as string).length === 0)
      throw ErrorHandler.badRequest("This entity requires an role field.", [
        { fields: ["role"], constraint: "undefined value" },
      ]);

    if (role !== "administrador" && (!idCompany || isNaN(idCompany as number)))
      throw ErrorHandler.badRequest("This entity requires an idCompany", [
        { fields: ["idCompany"], constraint: "undefined value" },
      ]);

    if (active === null || active === undefined) {
      throw ErrorHandler.badRequest("This entity requires an active field.", [
        { fields: ["active"], constraint: "undefined value" },
      ]);
    }

    return new UserEntity(<IUser>(object as unknown));
  }
}
