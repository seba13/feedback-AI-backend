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
exports.UserController = void 0;
const getUserByIdDto_1 = require("../domain/dtos/getUserByIdDto");
const getUserByEmailDto_1 = require("../domain/dtos/getUserByEmailDto");
const updateDataUserDto_1 = require("../domain/dtos/updateDataUserDto");
const deleteUserDto_1 = require("../domain/dtos/deleteUserDto");
class UserController {
    constructor(getUserByIdUseCaseImpl, getUserByEmailUseCaseImpl, updateUserUseCaseImpl, deleteUserUseCaseImpl) {
        this.getUserByIdUseCaseImpl = getUserByIdUseCaseImpl;
        this.getUserByEmailUseCaseImpl = getUserByEmailUseCaseImpl;
        this.updateUserUseCaseImpl = updateUserUseCaseImpl;
        this.deleteUserUseCaseImpl = deleteUserUseCaseImpl;
        this.getUserById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const dto = req.params;
            const user = yield this.getUserByIdUseCaseImpl.execute(getUserByIdDto_1.GetUserByIdDto.create(dto));
            return res.json(Object.assign({ ok: true }, user));
        });
        this.getUserByEmail = (req, res) => __awaiter(this, void 0, void 0, function* () {
            // const dto: IGetUserByEmail = req.body;
            const dto = req.params;
            const user = yield this.getUserByEmailUseCaseImpl.execute(getUserByEmailDto_1.GetUserByEmailDto.create(dto));
            return res.json(Object.assign({ ok: true }, user));
        });
        this.updateUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const dto = req.body;
            const result = yield this.updateUserUseCaseImpl.execute(updateDataUserDto_1.UpdateUserDto.create(dto));
            return res.json({
                ok: true,
                result,
            });
        });
        this.deleteUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const dto = req.body;
            const result = yield this.deleteUserUseCaseImpl.execute(deleteUserDto_1.DeleteUserDto.create(dto));
            return res.json({
                ok: true,
                result,
            });
        });
        this.getUserByIdBody = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const dto = req.body;
            const user = yield this.getUserByIdUseCaseImpl.execute(getUserByIdDto_1.GetUserByIdDto.create(dto));
            return res.json(Object.assign({ ok: true }, user));
        });
    }
}
exports.UserController = UserController;
