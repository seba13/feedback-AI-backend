import moment from "moment-timezone";
import winston from "winston";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({
      format: () => moment().tz("America/Santiago").format(),
    }),
    winston.format.printf(({ timestamp, level, message, stack, errors }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message} ${errors ? "\n" + JSON.stringify(errors) : ""}  ${stack ? "\n" + stack : ""}`;
    }),
  ),
  transports: [
    // new winston.transports.Console(), // Logueo en la consola
    new winston.transports.File({ filename: "logs/error.log", level: "error" }), // Logueo de errores en archivo
    new winston.transports.File({ filename: "logs/app.log" }), // Logueo general
  ],
});

export default logger;
