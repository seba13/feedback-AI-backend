import { RegisterUserDto } from "../../../auth/domain";
import { IUser, UserEntity } from "../..";

import { UserDatasource } from "../../domain/datasources/datasource";
import { GetUserByEmailDto } from "../../domain/dtos/getUserByEmailDto";
import { GetUserByIdDto } from "../../domain/dtos/getUserByIdDto";

import { promise } from "../../../../data/mysql/mysql-connection";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { ErrorHandler } from "../../../../core";
import { UUIDAdapter } from "../../../auth/infrastructure/adapters/uuid.adapter";
import { UpdateUserDto } from "../../domain/dtos/updateDataUserDto";
import { DeleteUserDto } from "../../domain/dtos/deleteUserDto";
import { UserMapper } from "../mappers/user.mapper";

export const users: UserEntity[] = [
  {
    idUser: "86490deb-3de0-45a6-a399-754c5716e0cd",
    email: "hola@hola.com",
    password: "$2b$10$2TKs49OlyN/tiEG.CXAUEOP.CrLfRc3aPQ2xf39uQCwrvb6KIQjjW",
    name: "jhon",
    lastName: "doe",
    rut: "123456789",
    dv: "k",
    idCompany: 1,
    idCommune: 2,
    role: "administrador",
    active: true,
  },
];

export class UserDatasourceImpl implements UserDatasource {
  async getUserByEmail(dto: GetUserByEmailDto): Promise<UserEntity | null> {
    try {
      const [row] = await promise.query<RowDataPacket[]>(
        `select 
        u.id_usuario 
        as idUser, 
        d.nombre as name, 
        d.apellido as lastName, 
        u.correo as email, 
        u.contrasena as password, 
        d.rut as rut, 
        d.dv as dv, 
        u.id_empresa as idCompany, 
        d.id_comuna as idCommune, 
        u.activo as active,
        u.rol as role 
        from usuario as u join detalle_usuario as d on u.id_usuario = d.id_usuario where u.correo = ?`,
        [dto.email],
      );

      const user = row[0];

      if (!user || Object.keys(user).length === 0) return null;

      return UserEntity.create({ ...user });
    } catch (error) {
      throw ErrorHandler.internalError((error as Error).message);
    }
  }

  async getUserById(dto: GetUserByIdDto): Promise<UserEntity | null> {
    try {
      const [row] = await promise.query<RowDataPacket[]>(
        `select 
        u.id_usuario 
        as idUser, 
        d.nombre as name, 
        d.apellido as lastName, 
        u.correo as email, 
        u.contrasena as password, 
        d.rut as rut, 
        d.dv as dv, 
        u.id_empresa as idCompany, 
        d.id_comuna as idCommune, 
        u.activo as active,
        u.rol as role 
        from usuario as u join detalle_usuario as d on u.id_usuario = d.id_usuario where u.id_usuario = ?`,
        [dto.idUser],
      );

      const user = row[0];

      if (!user || Object.keys(user).length === 0) return null;

      return UserEntity.create({ ...user });
    } catch (error) {
      throw ErrorHandler.internalError((error as Error).message);
    }
  }

  async createUser(dto: RegisterUserDto): Promise<UserEntity | null> {
    const conn = await promise.getConnection();
    try {
      await conn.beginTransaction();

      const idUser = UUIDAdapter.generate();

      const userValues = [[idUser, dto.email, dto.password, dto.idCompany, dto.role, dto.active]];

      // const sql = SqlString.format(
      //   `INSERT INTO usuario(id_usuario, correo, contrasena, id_empresa, rol, activo) VALUES ?`,
      //   userValues,
      // );

      const [result] = await conn.query<ResultSetHeader>(
        `INSERT INTO usuario(id_usuario, correo, contrasena, id_empresa, rol, activo) VALUES ?`,
        [userValues],
      );
      // const [result] = await conn.query<ResultSetHeader>(sql);

      if (result.affectedRows === 0) {
        throw new Error("Error al crear nuevo usuario");
      }

      const [resultDetailUser] = await conn.query<ResultSetHeader>(
        `insert into detalle_usuario(nombre, apellido, rut, dv, id_comuna, id_usuario) values ?`,
        [[[dto.name, dto.lastName, dto.rut, dto.dv, dto.idCommune, idUser]]],
      );

      if (resultDetailUser.affectedRows === 0) {
        throw new Error("Error al crear detalle usuario");
      }

      await conn.commit();

      const user: UserEntity = { idUser, ...dto };
      return UserEntity.create({ ...user });
    } catch (error) {
      await conn.rollback();
      throw ErrorHandler.internalError((error as Error).message);
    } finally {
      conn.release();
    }

    // const user: UserEntity = { idUser: v4(), ...dto };
    // users.push(user);
    // return UserEntity.create({ ...user });
  }

  async updateUser(dto: UpdateUserDto): Promise<boolean> {
    const conn = await promise.getConnection();
    try {
      await conn.beginTransaction();

      const userMapper = UserMapper.toUserSQL(dto as unknown as IUser);
      const detailUserMapper = UserMapper.toDetailUserSql(dto as unknown as IUser);

      // await promise.query<ResultSetHeader>(
      //   `update usuario set id_empresa=? rol=? activo=? where id_usuario=?`,
      //   [dto.idCompany, dto.role, dto.active, dto.idUser],
      // );

      await promise.query<ResultSetHeader>(`update usuario set ? where id_usuario=?`, [
        userMapper,
        dto.idUser,
      ]);

      await promise.query<ResultSetHeader>(
        `update detalle_usuario 
        join usuario on detalle_usuario.id_usuario=usuario.id_usuario 
        set ? 
        where usuario.id_usuario=?`,
        [detailUserMapper, dto.idUser],
      );

      return true;
    } catch (error) {
      await conn.rollback();
      throw ErrorHandler.internalError((error as Error).message);
    } finally {
      conn.release();
    }
  }

  async deleteUser(dto: DeleteUserDto): Promise<boolean> {
    const conn = await promise.getConnection();
    try {
      await conn.beginTransaction();

      const userMapper = UserMapper.toUserSQL(dto as unknown as IUser);

      await promise.query<ResultSetHeader>(`update usuario set ? where id_usuario=?`, [
        userMapper,
        dto.idUser,
      ]);

      return true;
    } catch (error) {
      await conn.rollback();
      throw ErrorHandler.internalError((error as Error).message);
    } finally {
      conn.release();
    }
  }
}
