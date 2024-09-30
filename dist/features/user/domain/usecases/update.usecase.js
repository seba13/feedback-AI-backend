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
exports.UpdateUserUseCaseImpl = void 0;
const core_1 = require("../../../../core");
const getUserByIdDto_1 = require("../dtos/getUserByIdDto");
class UpdateUserUseCaseImpl {
    constructor(repository) {
        this.repository = repository;
        this.execute = (dto) => __awaiter(this, void 0, void 0, function* () {
            const user = yield this.repository.getUserById(getUserByIdDto_1.GetUserByIdDto.create({ idUser: dto.idUser }));
            if (!user)
                throw core_1.ErrorHandler.notFound("user with this id not found");
            const result = yield this.repository.updateUser(dto);
            if (!result)
                throw core_1.ErrorHandler.internalError("Error on update user");
            return result;
        });
    }
}
exports.UpdateUserUseCaseImpl = UpdateUserUseCaseImpl;
