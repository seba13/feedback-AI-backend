"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterUserDto = void 0;
const core_1 = require("../../../../core");
class RegisterUserDto {
    constructor({ email, password, name, lastName, rut, dv, idCompany, idCommune, role = "usuario", active = true, }) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.lastName = lastName;
        this.rut = rut;
        this.dv = dv;
        this.idCompany = idCompany;
        this.idCommune = idCommune;
        this.role = role;
        this.active = active;
        this.validate(this);
    }
    validate(dto) {
        const errors = [];
        const { email, password, name, lastName, rut, dv, idCompany, idCommune, role } = dto;
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
                constraint: "password length is greater than " + core_1.SIX_LENGTH,
            });
        }
        if (!name) {
            errors.push({ fields: ["name"], constraint: "name cannot be null or undefined." });
        }
        if (name && typeof name !== "string") {
            errors.push({
                fields: ["name"],
                constraint: `A value of type "string" was expected, but "${typeof name}" was received.`,
            });
        }
        if (!lastName) {
            errors.push({ fields: ["lastName"], constraint: "lastName cannot be null or undefined." });
        }
        if (lastName && typeof lastName !== "string") {
            errors.push({
                fields: ["lastName"],
                constraint: `A value of type "string" was expected, but "${typeof lastName}" was received.`,
            });
        }
        if (!rut) {
            errors.push({ fields: ["rut"], constraint: "rut cannot be null or undefined." });
        }
        if (rut && typeof lastName !== "string") {
            errors.push({
                fields: ["lastName"],
                constraint: `A value of type "string" was expected, but "${typeof rut}" was received.`,
            });
        }
        if (!dv) {
            errors.push({ fields: ["dv"], constraint: "dv cannot be null or undefined." });
        }
        if (dv && typeof lastName !== "string") {
            errors.push({
                fields: ["dv"],
                constraint: `A value of type "string" was expected, but "${typeof dv}" was received.`,
            });
        }
        if (!idCompany && role !== "administrador") {
            errors.push({ fields: ["idCompany"], constraint: "idCompany cannot be null or undefined." });
        }
        if (idCompany && (isNaN(idCompany) || typeof idCompany !== "number")) {
            errors.push({
                fields: ["idCompany"],
                constraint: `A value of type "number" was expected, but "${typeof idCompany}" was received.`,
            });
        }
        if (!idCommune) {
            errors.push({ fields: ["idCommune"], constraint: "idCommune cannot be null or undefined." });
        }
        if (idCommune && (isNaN(idCommune) || typeof idCommune !== "number")) {
            errors.push({
                fields: ["idComuna"],
                constraint: `A value of type "number" was expected, but "${typeof idCommune}" was received.`,
            });
        }
        if (role && typeof role !== "string") {
            errors.push({
                fields: ["role"],
                constraint: `A value of type "string" was expected, but "${typeof role}" was received.`,
            });
        }
        if (role && role !== "administrador" && role !== "usuario") {
            errors.push({
                fields: ["role"],
                constraint: `role "administrador" or "usuario" was expected, but "${role}" was receoved`,
            });
        }
        if (errors.length > 0)
            throw core_1.ErrorHandler.badRequest("Error validating user data [Register user]", errors);
    }
    // public static create(object: Record<string, unknown>) {
    static create(object) {
        // const { email, password, name, lastName, rut, dv, idEmpresa, idComuna } = object;
        return new RegisterUserDto(object);
    }
}
exports.RegisterUserDto = RegisterUserDto;
