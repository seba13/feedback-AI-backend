export interface IJwtPayload {
  // [key: string]: T | string | object;
  idUser: string;
  iat: string;
  exp: string;
}
