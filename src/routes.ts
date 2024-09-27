import { Router } from "express";
import { AuthRoutes } from "./features/auth/presentation/auth.routes";
import { UserRoutes } from "./features/user/presentation/user.routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/auth", AuthRoutes.routes);
    router.use("/api", UserRoutes.routes);

    return router;
  }
}
