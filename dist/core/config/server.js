"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const compression_1 = __importDefault(require("compression"));
const constants_1 = require("../constants");
const middlewares_1 = require("../../features/common/presentation/middlewares");
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const figlet_1 = __importDefault(require("figlet"));
class Server {
    constructor(options) {
        this.app = (0, express_1.default)();
        const { port = 3000, routes, apiPath } = options;
        this.port = port;
        this.routes = routes;
        this.apiPath = apiPath;
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            // middlewares
            this.app.use((0, cors_1.default)({
                origin: [
                    // "http://localhost:5173",
                    "http://192.168.0.17:5173",
                    // "http://localhost:5005",
                    // "http://192.168.0.17:5005",
                ],
                credentials: true,
            }));
            this.app.use(express_1.default.json());
            this.app.use(express_1.default.urlencoded({ extended: true }));
            this.app.use((0, compression_1.default)({ threshold: 1024 })); // Evita comprimir respuestas menores de 1KB
            this.app.use((0, cookie_parser_1.default)());
            this.app.use(express_1.default.static("public"));
            this.app.use(this.routes);
            this.app.get("/", (_req, res) => {
                return res.status(constants_1.HttpCode.OK).send({
                    message: `Api started`,
                });
            });
            this.app.use("*", (req, res) => {
                res.sendFile(path_1.default.join(__dirname, "../../public/index.html"));
            });
            this.app.use(middlewares_1.errorMiddleware);
            this.app.listen(this.port, () => {
                (0, figlet_1.default)(`API !`, (err, data) => {
                    if (err) {
                        console.log("Algo salió mal con Figlet...");
                        console.dir(err);
                        return;
                    }
                    console.log(data);
                });
                console.log(`\x1b[36m
        \n****************************************\n      Server running on port ${this.port}\n****************************************\n
        \x1b[37m`);
            });
        });
    }
}
exports.Server = Server;
