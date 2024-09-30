"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.envs = void 0;
const dotenv_1 = require("dotenv");
const env_var_1 = __importDefault(require("env-var"));
(0, dotenv_1.config)({
    path: ".env",
});
const envs = () => {
    try {
        return {
            PORT: env_var_1.default.get("PORT").required().asPortNumber(),
            API_PATH: env_var_1.default.get("API_PATH").required().asString(),
            NODE_ENV: env_var_1.default.get("NODE_ENV").default("development").asString(),
            DB_HOST: env_var_1.default.get("NODE_ENV").asString() === "development"
                ? "localhost"
                : env_var_1.default.get("DB_HOST").required().asString(),
            DB_NAME: env_var_1.default.get("NODE_ENV").asString() === "development"
                ? "db_solotodo_ai"
                : env_var_1.default.get("DB_NAME").required().asString(),
            DB_PORT: env_var_1.default.get("NODE_ENV").asString() === "development"
                ? 3306
                : env_var_1.default.get("DB_PORT").required().asPortNumber(),
            DB_USER: env_var_1.default.get("NODE_ENV").asString() === "development"
                ? "root"
                : env_var_1.default.get("DB_USER").required().asString(),
            DB_PASSWORD: env_var_1.default.get("NODE_ENV").asString() === "development"
                ? "root"
                : env_var_1.default.get("DB_PASSWORD").required().asString(),
            ACCESS_KEY: env_var_1.default.get("ACCESS_KEY").required().asString(),
            REFRESH_KEY: env_var_1.default.get("REFRESH_KEY").required().asString(),
            GOOGLE_CLIENT_ID: env_var_1.default.get("GOOGLE_CLIENT_ID").asString(),
            GOOGLE_CLIENT_SECRET: env_var_1.default.get("GOOGLE_CLIENT_SECRET").asString(),
        };
    }
    catch (err) {
        throw new Error(err.message);
    }
};
exports.envs = envs;
