"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRoutes = void 0;
const express_1 = require("express");
const auth_routes_1 = require("./features/auth/presentation/auth.routes");
const user_routes_1 = require("./features/user/presentation/user.routes");
class AppRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        router.use("/auth", auth_routes_1.AuthRoutes.routes);
        router.use("/api", user_routes_1.UserRoutes.routes);
        return router;
    }
}
exports.AppRoutes = AppRoutes;
