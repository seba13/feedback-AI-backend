import { config } from "dotenv";
import env from "env-var";

config({
  path: ".env",
});

export const envs = () => {
  try {
    return {
      PORT: env.get("PORT").required().asPortNumber(),
      API_PATH: env.get("API_PATH").required().asString(),
      NODE_ENV: env.get("NODE_ENV").default("development").asString(),
      DB_HOST:
        env.get("NODE_ENV").asString() === "development"
          ? "localhost"
          : env.get("DB_HOST").required().asString(),
      DB_NAME:
        env.get("NODE_ENV").asString() === "development"
          ? "db_solotodo_ai"
          : env.get("DB_NAME").required().asString(),
      DB_PORT:
        env.get("NODE_ENV").asString() === "development"
          ? 3306
          : env.get("DB_PORT").required().asPortNumber(),
      DB_USER:
        env.get("NODE_ENV").asString() === "development"
          ? "root"
          : env.get("DB_USER").required().asString(),
      DB_PASSWORD:
        env.get("NODE_ENV").asString() === "development"
          ? "root"
          : env.get("DB_PASSWORD").required().asString(),
      ACCESS_KEY: env.get("ACCESS_KEY").required().asString(),
      REFRESH_KEY: env.get("REFRESH_KEY").required().asString(),

      GOOGLE_CLIENT_ID: env.get("GOOGLE_CLIENT_ID").asString(),
      GOOGLE_CLIENT_SECRET: env.get("GOOGLE_CLIENT_SECRET").asString(),
    };
  } catch (err) {
    throw new Error((err as Error).message);
  }
};
