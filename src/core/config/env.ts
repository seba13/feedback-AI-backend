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
      ACCESS_KEY: env.get("ACCESS_KEY").required().asString(),
      REFRESH_KEY: env.get("REFRESH_KEY").required().asString(),
    };
  } catch (err) {
    throw new Error((err as Error).message);
  }
};
