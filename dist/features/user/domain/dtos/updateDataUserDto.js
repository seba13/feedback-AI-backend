"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserDto = void 0;
const core_1 = require("../../../../core");
const uuid_adapter_1 = require("../../../auth/infrastructure/adapters/uuid.adapter");
class UpdateUserDto {
    constructor({ idUser, name, lastName, rut, dv, idCompany, idCommune, role, active, currentUserRole, }) {
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
    validate(dto) {
        const errors = [];
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
        if (idUser && !uuid_adapter_1.UUIDAdapter.validate(idUser)) {
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
        if (errors.length > 0)
            throw core_1.ErrorHandler.badRequest("error validating update user", errors);
    }
    static create(object) {
        return new UpdateUserDto(object);
    }
}
exports.UpdateUserDto = UpdateUserDto;
