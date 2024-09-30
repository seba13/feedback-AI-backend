"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenDto = void 0;
const core_1 = require("../../../../core");
class TokenDto {
    constructor({ token }) {
        this.token = token;
        this.validate(this);
    }
    validate(dto) {
        const errors = [];
        if (!dto.token || typeof dto.token !== "string") {
            errors.push({ fields: ["token"], constraint: "token is missing" });
        }
        if (errors.length > 0) {
            throw core_1.ErrorHandler.badRequest("Error validating token [Access Token]", errors);
        }
    }
    static create(object) {
        const { token } = object;
        return new TokenDto({ token });
    }
}
exports.TokenDto = TokenDto;
