import { IUser } from "../../domain";

export interface MysqlUser {
  [key: string]: string | number | boolean | undefined;
  id_usuario?: string;
  correo?: string;
  contrasena?: string;
  id_empresa?: number;
  rol?: string;
  activo?: boolean;
}

export interface MySQLDetailUser {
  [key: string]: string | number | boolean | undefined;
  nombre?: string;
  apellido?: string;
  rut?: string;
  dv?: string;
  id_comuna?: number;
  id_usuario?: string;
}

export class UserMapper {
  public static toUserSQL(object: Partial<IUser>): MysqlUser {
    const { email, idCompany, role, active } = object;
    return {
      ...(email && { correo: email }),
      ...(idCompany && { id_empresa: idCompany }),
      ...(role && { rol: role }),
      ...(active !== null && active !== undefined && { activo: active }),
    };
  }

  public static toDetailUserSql(object: Partial<IUser>): MySQLDetailUser {
    const { name, lastName, rut, dv, idCommune } = object;

    return {
      ...(name && { nombre: name }),
      ...(lastName && { apellido: lastName }),
      ...(rut && { rut }),
      ...(dv && { dv }),
      ...(idCommune && { id_comuna: idCommune }),
    };
  }
}
