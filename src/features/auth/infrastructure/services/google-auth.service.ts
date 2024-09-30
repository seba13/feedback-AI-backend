import { envs, ErrorHandler } from "../../../../core";
import { OAuth2Client } from "google-auth-library";

export class GoogleAuthService {
  private oAuth2Client;

  constructor() {
    const clientId = envs().GOOGLE_CLIENT_ID;
    const clientSecret = envs().GOOGLE_CLIENT_SECRET;

    this.oAuth2Client = new OAuth2Client({
      clientId,
      clientSecret,
      redirectUri: "postmessage",
    });
  }

  // TODO: MANEJAR ERRORES
  async getData(code: string) {
    try {
      const { tokens } = await this.oAuth2Client.getToken(code);

      this.oAuth2Client.setCredentials(tokens);

      const { data } = await this.oAuth2Client.request({
        url: "https://www.googleapis.com/oauth2/v3/userinfo",
      });

      return data;
    } catch (error) {
      console.log(error);
      throw ErrorHandler.internalError("error login google");
    }
  }
}
