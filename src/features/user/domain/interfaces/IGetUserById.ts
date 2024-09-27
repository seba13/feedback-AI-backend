// export interface IGetUserById {
//   idUser: string;
// }

import { IUser } from "./IUser";

export type IGetUserById = Pick<IUser, "idUser">;
