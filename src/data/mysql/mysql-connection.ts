import mysql from "mysql2";
import { ErrorHandler } from "../../core";
import { options } from "./keys";

export const pool = mysql.createPool(options);

export const startConnection = async () => {
  return new Promise((resolve, reject) => {
    pool.getConnection((error, connection) => {
      if (error) {
        console.log(error.message);
        reject(ErrorHandler.internalError("error al conectar base de datos"));
      }

      console.log(
        `\x1b[35m
        \n****************************************\n      MySQL connection started\n****************************************\x1b[35m`,
      );
      if (connection) {
        connection.release();
      }
      resolve(true);
    });
  });
};

export const promise = pool.promise();
