"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthLoginEntity = void 0;
class AuthLoginEntity {
    constructor(user, token, refreshToken) {
        this.user = user;
        this.token = token;
        this.refreshToken = refreshToken;
    }
    static create(user, token, refreshToken) {
        delete user.password;
        return new AuthLoginEntity(user, token, refreshToken);
    }
}
exports.AuthLoginEntity = AuthLoginEntity;
