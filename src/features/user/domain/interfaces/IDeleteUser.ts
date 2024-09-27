import { IUser } from "./IUser";

export type IDeleteUser = Pick<IUser, "idUser" | "active">;
