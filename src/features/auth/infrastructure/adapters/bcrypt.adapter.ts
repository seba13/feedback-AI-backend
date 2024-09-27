import { hash, compare } from "bcrypt";

export class BCryptAdapter {
  static async hash(password: string) {
    return await hash(password, 10);
  }

  static async compare(password: string, hashedPassword: string) {
    return await compare(password, hashedPassword);
  }
}
