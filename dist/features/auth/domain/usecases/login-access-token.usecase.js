"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginWithAccessTokenuseCaseImpl = void 0;
const core_1 = require("../../../../core");
class LoginWithAccessTokenuseCaseImpl {
    constructor(repository) {
        this.repository = repository;
        this.execute = (dto) => __awaiter(this, void 0, void 0, function* () {
            const user = yield this.repository.getUserById(dto);
            if (!user)
                throw core_1.ErrorHandler.badRequest("user with this id not found");
            delete user.password;
            return user;
        });
    }
}
exports.LoginWithAccessTokenuseCaseImpl = LoginWithAccessTokenuseCaseImpl;
