// export interface IGetUserByEmail {
//   email: string;

import { IUser } from "./IUser";

// }
export type IGetUserByEmail = Pick<IUser, "email">;
