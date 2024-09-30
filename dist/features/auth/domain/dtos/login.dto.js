"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUserDto = void 0;
const core_1 = require("../../../../core");
class LoginUserDto {
    constructor(object) {
        this.email = object.email;
        this.password = object.password;
        this.validate(this);
    }
    validate(dto) {
        const errors = [];
        const { email, password } = dto;
        if (!email) {
            errors.push({ fields: ["email"], constraint: "email cannot be null or undefined." });
        }
        if (email && typeof password !== "string") {
            errors.push({
                fields: ["email"],
                constraint: `A value of type "string" was expected, but "${typeof email}" was received.`,
            });
        }
        if (email && !core_1.REGEX_EMAIL.test(email)) {
            errors.push({ fields: ["email"], constraint: "email invalid." });
        }
        if (!password) {
            errors.push({ fields: ["password"], constraint: "password cannot be null or undefined." });
        }
        if (password && typeof password !== "string") {
            errors.push({
                fields: ["password"],
                constraint: `A value of type "string" was expected, but "${typeof password}" was received.`,
            });
        }
        if (password && password.length < core_1.SIX_LENGTH) {
            errors.push({
                fields: ["password"],
                constraint: "password length is lower than " + core_1.SIX_LENGTH,
            });
        }
        if (password && password.length > core_1.TWUELVE_LENGTH) {
            errors.push({
                fields: ["password"],
                constraint: "password length is greater than " + core_1.TWUELVE_LENGTH,
            });
        }
        if (password && typeof password !== "string") {
            errors.push({ fields: ["password"], constraint: "expected type string" });
        }
        if (errors.length > 0)
            throw core_1.ErrorHandler.badRequest("Error validating user data [Login user]", errors);
    }
    // Record<string, unknown> => {[key:name]: unknow}
    // public static create(object: Record<string, unknown>): LoginUserDto {
    static create(object) {
        // const { email, password } = object;
        // return new LoginUserDto(email as string, password as string);
        return new LoginUserDto(object);
    }
}
exports.LoginUserDto = LoginUserDto;
