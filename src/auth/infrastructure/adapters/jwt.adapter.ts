import jwt from "jsonwebtoken";
import { ErrorHandler } from "../../../core";

export class JwtAdapter {
  static async generateToken(
    payload: object | string,
    privateKey: string,
    expiresIn: string = "20s",
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      jwt.sign(
        payload,
        privateKey,
        { expiresIn },
        (error: Error | null, token: string | undefined) => {
          if (error) {
            reject(ErrorHandler.internalError("Error generating token"));
          }
          resolve(token!);
        },
      );
    });
  }

  static async ValidateToken(token: string, privateKey: string) {
    return new Promise((resolve) => {
      jwt.verify(token, privateKey, (error: Error | null, payload: object | string | undefined) => {
        if (error) {
          resolve({});
        } else {
          resolve(payload);
        }
      });
    });
  }
}
