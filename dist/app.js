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
const server_1 = require("./core/config/server");
const env_1 = require("./core/config/env");
const routes_1 = require("./routes");
const mysql_connection_1 = require("./data/mysql/mysql-connection");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    // TODO: CONEXION CON BASE DE DATOS ✅
    yield (0, mysql_connection_1.startConnection)();
    const server = new server_1.Server({ port: (0, env_1.envs)().PORT, routes: routes_1.AppRoutes.routes });
    server.start();
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield main();
    }
    catch (error) {
        console.log(error.message);
    }
}))();
