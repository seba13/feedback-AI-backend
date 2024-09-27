import { IUser } from "./IUser";

export type IUpdateUser = Partial<Omit<IUser, "password" | "password">> & {
  currentUserRole: string;
  idUser: string;
};
