import { Server, ServerOptions } from "./core/config/server";
import { envs } from "./core/config/env";
import { AppRoutes } from "./routes";

const main = async () => {
  // TODO: CONEXION CON BASE DE DATOS

  const server = new Server(<ServerOptions>{ port: envs().PORT, routes: AppRoutes.routes });

  server.start();
};

(async () => {
  try {
    main();
  } catch (error) {
    console.log((error as Error).message);
  }
})();
