import jwt from "jsonwebtoken";
import { envs, ErrorHandler } from "../../../core";

export class JwtAdapter {
  static async generateToken(payload: object | string): Promise<string> {
    return new Promise((resolve, reject) => {
      jwt.sign(payload, envs().PRIVATE_KEY, (error: Error | null, token: string | undefined) => {
        if (error) {
          reject(ErrorHandler.internalError("Error generating token"));
        }
        resolve(token!);
      });
    });
  }
}
