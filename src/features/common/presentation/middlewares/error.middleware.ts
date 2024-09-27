import { type Request, type Response, type NextFunction } from "express";
import { ErrorHandler } from "../../../../core/errors/error.handler";
import { HttpCode } from "../../../../core/constants";
import logger from "../../infrastructure/logger";

export const errorMiddleware = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (error instanceof ErrorHandler) {
    const {
      message,
      name,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      stack,
      statusCode = HttpCode.INTERNAL_SERVER_ERROR,
      validationErrors,
    } = error;

    res.status(statusCode);
    res.json({
      ok: false,
      name,
      errorMessage: message,
      errorCode: statusCode,
      // stack,
      errors: validationErrors,
    });

    logger.error("Error manejado por ErrorHandler", {
      message: message,
      stack: error.stack,
      errors: validationErrors,
    });
  } else {
    const name = "Internal Server Error";
    const message = "An internal server error occurred";
    const statusCode = HttpCode.INTERNAL_SERVER_ERROR;

    res.status(statusCode);
    res.json({ name, message });

    logger.error("Error manejado por ErrorHandler", {
      message: message,
      stack: (error as Error).stack,
    });
  }

  next();
};
