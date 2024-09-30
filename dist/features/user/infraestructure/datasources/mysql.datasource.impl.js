"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDatasourceImpl = exports.users = void 0;
const __1 = require("../..");
const mysql_connection_1 = require("../../../../data/mysql/mysql-connection");
const core_1 = require("../../../../core");
const uuid_adapter_1 = require("../../../auth/infrastructure/adapters/uuid.adapter");
const user_mapper_1 = require("../mappers/user.mapper");
exports.users = [
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
class UserDatasourceImpl {
    getUserByEmail(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [row] = yield mysql_connection_1.promise.query(`select 
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
        from usuario as u join detalle_usuario as d on u.id_usuario = d.id_usuario where u.correo = ?`, [dto.email]);
                const user = row[0];
                if (!user || Object.keys(user).length === 0)
                    return null;
                return __1.UserEntity.create(Object.assign({}, user));
            }
            catch (error) {
                throw core_1.ErrorHandler.internalError(error.message);
            }
        });
    }
    getUserById(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [row] = yield mysql_connection_1.promise.query(`select 
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
        from usuario as u join detalle_usuario as d on u.id_usuario = d.id_usuario where u.id_usuario = ?`, [dto.idUser]);
                const user = row[0];
                if (!user || Object.keys(user).length === 0)
                    return null;
                return __1.UserEntity.create(Object.assign({}, user));
            }
            catch (error) {
                throw core_1.ErrorHandler.internalError(error.message);
            }
        });
    }
    createUser(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield mysql_connection_1.promise.getConnection();
            try {
                yield conn.beginTransaction();
                const idUser = uuid_adapter_1.UUIDAdapter.generate();
                const userValues = [[idUser, dto.email, dto.password, dto.idCompany, dto.role, dto.active]];
                // const sql = SqlString.format(
                //   `INSERT INTO usuario(id_usuario, correo, contrasena, id_empresa, rol, activo) VALUES ?`,
                //   userValues,
                // );
                const [result] = yield conn.query(`INSERT INTO usuario(id_usuario, correo, contrasena, id_empresa, rol, activo) VALUES ?`, [userValues]);
                // const [result] = await conn.query<ResultSetHeader>(sql);
                if (result.affectedRows === 0) {
                    throw new Error("Error al crear nuevo usuario");
                }
                const [resultDetailUser] = yield conn.query(`insert into detalle_usuario(nombre, apellido, rut, dv, id_comuna, id_usuario) values ?`, [[[dto.name, dto.lastName, dto.rut, dto.dv, dto.idCommune, idUser]]]);
                if (resultDetailUser.affectedRows === 0) {
                    throw new Error("Error al crear detalle usuario");
                }
                yield conn.commit();
                const user = Object.assign({ idUser }, dto);
                return __1.UserEntity.create(Object.assign({}, user));
            }
            catch (error) {
                yield conn.rollback();
                throw core_1.ErrorHandler.internalError(error.message);
            }
            finally {
                conn.release();
            }
            // const user: UserEntity = { idUser: v4(), ...dto };
            // users.push(user);
            // return UserEntity.create({ ...user });
        });
    }
    updateUser(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield mysql_connection_1.promise.getConnection();
            try {
                yield conn.beginTransaction();
                const userMapper = user_mapper_1.UserMapper.toUserSQL(dto);
                const detailUserMapper = user_mapper_1.UserMapper.toDetailUserSql(dto);
                // await promise.query<ResultSetHeader>(
                //   `update usuario set id_empresa=? rol=? activo=? where id_usuario=?`,
                //   [dto.idCompany, dto.role, dto.active, dto.idUser],
                // );
                yield mysql_connection_1.promise.query(`update usuario set ? where id_usuario=?`, [
                    userMapper,
                    dto.idUser,
                ]);
                yield mysql_connection_1.promise.query(`update detalle_usuario 
        join usuario on detalle_usuario.id_usuario=usuario.id_usuario 
        set ? 
        where usuario.id_usuario=?`, [detailUserMapper, dto.idUser]);
                return true;
            }
            catch (error) {
                yield conn.rollback();
                throw core_1.ErrorHandler.internalError(error.message);
            }
            finally {
                conn.release();
            }
        });
    }
    deleteUser(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield mysql_connection_1.promise.getConnection();
            try {
                yield conn.beginTransaction();
                const userMapper = user_mapper_1.UserMapper.toUserSQL(dto);
                yield mysql_connection_1.promise.query(`update usuario set ? where id_usuario=?`, [
                    userMapper,
                    dto.idUser,
                ]);
                return true;
            }
            catch (error) {
                yield conn.rollback();
                throw core_1.ErrorHandler.internalError(error.message);
            }
            finally {
                conn.release();
            }
        });
    }
}
exports.UserDatasourceImpl = UserDatasourceImpl;
