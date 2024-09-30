"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRegisterEntity = void 0;
class AuthRegisterEntity {
    constructor(user) {
        this.user = user;
    }
    static create(user) {
        delete user.password;
        return new AuthRegisterEntity(user);
    }
}
exports.AuthRegisterEntity = AuthRegisterEntity;
