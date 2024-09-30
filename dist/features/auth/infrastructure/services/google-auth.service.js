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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleAuthService = void 0;
const core_1 = require("../../../../core");
const google_auth_library_1 = require("google-auth-library");
class GoogleAuthService {
    constructor() {
        const clientId = (0, core_1.envs)().GOOGLE_CLIENT_ID;
        const clientSecret = (0, core_1.envs)().GOOGLE_CLIENT_SECRET;
        this.oAuth2Client = new google_auth_library_1.OAuth2Client({
            clientId,
            clientSecret,
            redirectUri: "postmessage",
        });
    }
    // TODO: MANEJAR ERRORES
    getData(code) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { tokens } = yield this.oAuth2Client.getToken(code);
                this.oAuth2Client.setCredentials(tokens);
                const { data } = yield this.oAuth2Client.request({
                    url: "https://www.googleapis.com/oauth2/v3/userinfo",
                });
                return data;
            }
            catch (error) {
                console.log(error);
                throw core_1.ErrorHandler.internalError("error login google");
            }
        });
    }
}
exports.GoogleAuthService = GoogleAuthService;
