"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEntity = void 0;
const core_1 = require("../../../../core");
class UserEntity {
    constructor({ idUser, name, lastName, email, password, rut, dv, idCompany, idCommune, role, active, }) {
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
    static create(object) {
        const { idUser, password, email, name, lastName, rut, dv, idCompany, idCommune, role, active } = object;
        if (!idUser)
            throw core_1.ErrorHandler.badRequest("This entity requires an id field.", [
                { fields: ["id"], constraint: "undefined value" },
            ]);
        if (!name || name.length === 0)
            throw core_1.ErrorHandler.badRequest("This entity requires an name field.", [
                { fields: ["name"], constraint: "undefined value" },
            ]);
        if (!lastName || lastName.length === 0)
            throw core_1.ErrorHandler.badRequest("This entity requires an lastName field.", [
                { fields: ["lastName"], constraint: "undefined value" },
            ]);
        if (!email || email.length === 0)
            throw core_1.ErrorHandler.badRequest("This entity requires an email field.", [
                { fields: ["email"], constraint: "undefined value" },
            ]);
        if (!password || password.length === 0)
            throw core_1.ErrorHandler.badRequest("This entity requires an password field.", [
                { fields: ["password"], constraint: "undefined value" },
            ]);
        if (!rut || rut.length === 0)
            throw core_1.ErrorHandler.badRequest("This entity requires an rut field.", [
                { fields: ["rut"], constraint: "undefined value" },
            ]);
        if (!dv || dv.length === 0)
            throw core_1.ErrorHandler.badRequest("This entity requires an dv field.", [
                { fields: ["dv"], constraint: "undefined value" },
            ]);
        if (!idCommune || isNaN(idCommune))
            throw core_1.ErrorHandler.badRequest("This entity requires an idCommune field.", [
                { fields: ["idCommune"], constraint: "undefined value" },
            ]);
        if (!role || role.length === 0)
            throw core_1.ErrorHandler.badRequest("This entity requires an role field.", [
                { fields: ["role"], constraint: "undefined value" },
            ]);
        if (role !== "administrador" && (!idCompany || isNaN(idCompany)))
            throw core_1.ErrorHandler.badRequest("This entity requires an idCompany", [
                { fields: ["idCompany"], constraint: "undefined value" },
            ]);
        if (active === null || active === undefined) {
            throw core_1.ErrorHandler.badRequest("This entity requires an active field.", [
                { fields: ["active"], constraint: "undefined value" },
            ]);
        }
        return new UserEntity(object);
    }
}
exports.UserEntity = UserEntity;
