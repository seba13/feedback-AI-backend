import { CoreDto } from "../../../common";
import {
  ErrorHandler,
  REGEX_EMAIL,
  SIX_LENGTH,
  TWUELVE_LENGTH,
  ValidationType,
} from "../../../core";

export interface IRegisterUserDTO {
  email: string;
  password: string;
  name: string;
  lastName: string;
  rut: string;
  dv: string;
  idEmpresa: string;
  idComuna: string;
  rol: string;
}

export class RegisterUserDto implements CoreDto<RegisterUserDto> {
  public readonly email: string;
  public readonly password: string;
  public readonly name: string;
  public readonly lastName: string;
  public readonly rut: string;
  public readonly dv: string;
  public readonly idEmpresa: string;
  public readonly idComuna: string;
  public readonly rol: string;

  private constructor({
    email,
    password,
    name,
    lastName,
    rut,
    dv,
    idEmpresa,
    idComuna,
    rol = "[USER ROL]",
  }: IRegisterUserDTO) {
    this.email = email;
    this.password = password;
    this.name = name;
    this.lastName = lastName;
    this.rut = rut;
    this.dv = dv;
    this.idEmpresa = idEmpresa;
    this.idComuna = idComuna;
    this.rol = rol;

    this.validate(this);
  }

  validate(dto: RegisterUserDto): void {
    const errors: ValidationType[] = [];

    const { email, password, name, lastName, rut, dv, idEmpresa, idComuna } = dto;

    if (!email || !REGEX_EMAIL.test(email)) {
      errors.push({ fields: ["email"], constraint: "email is not valid" });
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
        constraint: "password length is greater than " + SIX_LENGTH,
      });
    }

    if (!name) {
      errors.push({ fields: ["name"], constraint: "name is not valid" });
    }

    if (!lastName) {
      errors.push({ fields: ["lastName"], constraint: "lastName is not valid" });
    }

    if (!rut) {
      errors.push({ fields: ["rut"], constraint: "rut is not valid" });
    }

    if (!dv) {
      errors.push({ fields: ["dv"], constraint: "dv is not valid" });
    }

    if (!idEmpresa) {
      errors.push({ fields: ["idEmpresa"], constraint: "idEmpresa is not valid" });
    }

    if (!idComuna) {
      errors.push({ fields: ["idComuna"], constraint: "idComuna is not valid" });
    }

    if (errors.length > 0)
      throw ErrorHandler.badRequest("Error validating user data [Register user]", errors);
  }

  // public static create(object: Record<string, unknown>) {
  public static create(object: IRegisterUserDTO) {
    // const { email, password, name, lastName, rut, dv, idEmpresa, idComuna } = object;

    return new RegisterUserDto(object);
  }
}
