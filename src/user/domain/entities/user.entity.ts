import { ErrorHandler } from "../../../core";
import { IUser } from "../interfaces";

export class UserEntity {
  public readonly idUser: string; // ID del usuario
  public readonly name: string;
  public readonly lastName: string;
  public readonly email: string;
  public readonly password: string;
  public readonly rut: string;
  public readonly dv: string;
  public readonly idEmpresa: string;
  public readonly idComuna: string;

  constructor({ idUser, name, lastName, email, password, rut, dv, idEmpresa, idComuna }: IUser) {
    this.idUser = idUser;
    this.name = name;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.rut = rut;
    this.dv = dv;
    this.idEmpresa = idEmpresa;
    this.idComuna = idComuna;
  }

  static create(object: Record<string, unknown>): IUser {
    const { idUser, password, email, name, lastName, rut, dv, idEmpresa, idComuna } = object;

    if (!idUser)
      throw ErrorHandler.badRequest("This entity requires an id", [
        { fields: ["id"], constraint: "undefined value" },
      ]);

    if (!name || (name as string).length === 0)
      throw ErrorHandler.badRequest("This entity requires an name", [
        { fields: ["name"], constraint: "undefined value" },
      ]);

    if (!lastName || (lastName as string).length === 0)
      throw ErrorHandler.badRequest("This entity requires an lastName", [
        { fields: ["lastName"], constraint: "undefined value" },
      ]);

    if (!email || (email as string).length === 0)
      throw ErrorHandler.badRequest("This entity requires an email", [
        { fields: ["email"], constraint: "undefined value" },
      ]);

    if (!password || (password as string).length === 0)
      throw ErrorHandler.badRequest("This entity requires an password", [
        { fields: ["password"], constraint: "undefined value" },
      ]);

    if (!rut || (rut as string).length === 0)
      throw ErrorHandler.badRequest("This entity requires an rut", [
        { fields: ["rut"], constraint: "undefined value" },
      ]);

    if (!dv || (dv as string).length === 0)
      throw ErrorHandler.badRequest("This entity requires an dv", [
        { fields: ["dv"], constraint: "undefined value" },
      ]);

    if (!idComuna || (idComuna as string).length === 0)
      throw ErrorHandler.badRequest("This entity requires an idComuna", [
        { fields: ["idComuna"], constraint: "undefined value" },
      ]);

    if (!idEmpresa || (idEmpresa as string).length === 0)
      throw ErrorHandler.badRequest("This entity requires an idEmpresa", [
        { fields: ["idEmpresa"], constraint: "undefined value" },
      ]);

    return new UserEntity(<IUser>(object as unknown));
  }
}
