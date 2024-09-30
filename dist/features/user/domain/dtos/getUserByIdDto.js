"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserByIdDto = void 0;
const core_1 = require("../../../../core");
const uuid_adapter_1 = require("../../../auth/infrastructure/adapters/uuid.adapter");
class GetUserByIdDto {
    constructor({ idUser }) {
        this.idUser = idUser;
        this.validate(this);
    }
    validate(dto) {
        const errors = [];
        const { idUser } = dto;
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
        if (errors.length > 0) {
            throw core_1.ErrorHandler.badRequest("Error validating get User by id", errors);
        }
    }
    static create(object) {
        const { idUser } = object;
        return new GetUserByIdDto({ idUser });
    }
}
exports.GetUserByIdDto = GetUserByIdDto;
