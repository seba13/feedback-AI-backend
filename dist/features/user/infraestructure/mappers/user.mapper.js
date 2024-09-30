"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMapper = void 0;
class UserMapper {
    static toUserSQL(object) {
        const { email, idCompany, role, active } = object;
        return Object.assign(Object.assign(Object.assign(Object.assign({}, (email && { correo: email })), (idCompany && { id_empresa: idCompany })), (role && { rol: role })), (active !== null && active !== undefined && { activo: active }));
    }
    static toDetailUserSql(object) {
        const { name, lastName, rut, dv, idCommune } = object;
        return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, (name && { nombre: name })), (lastName && { apellido: lastName })), (rut && { rut })), (dv && { dv })), (idCommune && { id_comuna: idCommune }));
    }
}
exports.UserMapper = UserMapper;
