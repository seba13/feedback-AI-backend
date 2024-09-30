import { PoolOptions } from "mysql2";
import { envs } from "../../core";

export const options: PoolOptions = {
  host: envs().DB_HOST,
  port: envs().DB_PORT,
  user: envs().DB_USER,
  password: envs().DB_PASSWORD,
  database: envs().DB_NAME,
  queueLimit: 0,
  connectionLimit: 10,
  maxIdle: 10,
  waitForConnections: true,
  charset: "utf8mb4",
};

console.log(options);
