"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserByEmailDto = void 0;
const core_1 = require("../../../../core");
class GetUserByEmailDto {
    constructor({ email }) {
        this.email = email;
        this.validate(this);
    }
    validate(dto) {
        const errors = [];
        const { email } = dto;
        if (!email) {
            errors.push({ fields: ["email"], constraint: "email cannot be null or undefined." });
        }
        if (email && typeof email !== "string") {
            errors.push({
                fields: ["name"],
                constraint: `A value of type 'string' was expected, but '${typeof email}' was received.`,
            });
        }
        if (email && !core_1.REGEX_EMAIL.test(email)) {
            errors.push({
                fields: ["name"],
                constraint: `email is not a valid email`,
            });
        }
        if (errors.length > 0) {
            throw core_1.ErrorHandler.badRequest("Error validating get User by email", errors);
        }
    }
    static create(object) {
        const { email } = object;
        return new GetUserByEmailDto({ email });
    }
}
exports.GetUserByEmailDto = GetUserByEmailDto;
