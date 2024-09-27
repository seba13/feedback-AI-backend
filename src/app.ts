import { Server, ServerOptions } from "./core/config/server";
import { envs } from "./core/config/env";
import { AppRoutes } from "./routes";
import { startConnection } from "./data/mysql/mysql-connection";
import { ErrorHandler } from "./core";

const main = async () => {
  // TODO: CONEXION CON BASE DE DATOS ✅

  await startConnection();

  const server = new Server(<ServerOptions>{ port: envs().PORT, routes: AppRoutes.routes });

  server.start();
};

(async () => {
  try {
    await main();
  } catch (error) {
    console.log((error as ErrorHandler).message);
  }
})();
