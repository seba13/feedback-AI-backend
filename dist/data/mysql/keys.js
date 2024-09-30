"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = void 0;
const core_1 = require("../../core");
exports.options = {
    host: (0, core_1.envs)().DB_HOST,
    port: (0, core_1.envs)().DB_PORT,
    user: (0, core_1.envs)().DB_USER,
    password: (0, core_1.envs)().DB_PASSWORD,
    database: (0, core_1.envs)().DB_NAME,
    queueLimit: 0,
    connectionLimit: 10,
    maxIdle: 10,
    waitForConnections: true,
};
