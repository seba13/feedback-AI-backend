"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteUserDto = void 0;
const core_1 = require("../../../../core");
const uuid_adapter_1 = require("../../../auth/infrastructure/adapters/uuid.adapter");
class DeleteUserDto {
    constructor({ idUser, active }) {
        this.idUser = idUser;
        this.active = active;
        this.validate(this);
    }
    validate(dto) {
        const errors = [];
        const { idUser, active } = dto;
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
        if (active === null || active === undefined) {
            errors.push({ fields: ["active"], constraint: "active cannot be null or undefined." });
        }
        if (active && typeof active !== "boolean") {
            errors.push({
                fields: ["active"],
                constraint: `A value of type 'boolean' was expected, but '${typeof active}' was received.`,
            });
        }
        if (errors.length > 0) {
            throw core_1.ErrorHandler.badRequest("Error validating get User by id", errors);
        }
    }
    static create(object) {
        const { idUser, active } = object;
        const expectedProps = ["idUser", "active"];
        // Obtener las propiedades que se pasaron en el objeto
        const receivedProps = Object.keys(object);
        // Identificar las propiedades adicionales
        const extraProps = receivedProps.filter((prop) => !expectedProps.includes(prop));
        if (extraProps.length > 0) {
            throw core_1.ErrorHandler.badRequest(`Unexpected properties: ${extraProps.join(", ")}`);
        }
        return new DeleteUserDto({ idUser, active });
    }
}
exports.DeleteUserDto = DeleteUserDto;
