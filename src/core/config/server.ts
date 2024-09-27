import express, { type Router, type Request, type Response } from "express";
import compression from "compression";
import { HttpCode } from "../constants";
import { errorMiddleware } from "../../features/common/presentation/middlewares";

import cors from "cors";

import cookieParser from "cookie-parser";

import figlet from "figlet";

export interface ServerOptions {
  port?: number;
  routes: Router;
  apiPath: string;
}

export class Server {
  public readonly app: express.Application = express();
  private readonly port: number;
  private readonly routes: Router;
  private readonly apiPath: string;

  constructor(options: ServerOptions) {
    const { port = 3000, routes, apiPath } = options;

    this.port = port;
    this.routes = routes;
    this.apiPath = apiPath;
  }

  async start(): Promise<void> {
    // middlewares
    this.app.use(
      cors({
        origin: "http://localhost:5173",
        credentials: true,
      }),
    );
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    this.app.use(compression({ threshold: 1024 })); // Evita comprimir respuestas menores de 1KB

    this.app.use(cookieParser());

    this.app.use(this.routes);

    this.app.get("/", (_req: Request, res: Response) => {
      return res.status(HttpCode.OK).send({
        message: `Api started`,
      });
    });

    this.app.use(errorMiddleware);

    this.app.listen(this.port, () => {
      figlet(`API !`, (err, data) => {
        if (err) {
          console.log("Algo salió mal con Figlet...");
          console.dir(err);
          return;
        }
        console.log(data);
      });
      console.log(
        `\x1b[36m
        \n****************************************\n      Server running on port ${this.port}\n****************************************\n
        \x1b[37m`,
      );
    });
  }
}
