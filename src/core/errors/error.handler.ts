import { HttpCode } from "../constants";
import { ValidationType } from "../types";

interface errorArgs {
  name: string;
  statusCode: HttpCode;
  message: string;
  validationErrors?: ValidationType[];
}

export class ErrorHandler extends Error {
  public readonly name: string;
  public readonly statusCode: HttpCode;
  public readonly validationErrors?: ValidationType[];

  constructor(args: errorArgs) {
    const {
      message,
      name = "Internal aplication error",
      statusCode = HttpCode.INTERNAL_SERVER_ERROR,
      validationErrors,
    } = args;
    super(message);

    // this.name = name ?? "Aplication Error";
    this.name = name;
    this.statusCode = statusCode;

    this.validationErrors = validationErrors;

    Error.captureStackTrace(this);
  }

  static badRequest(message: string, validationErrors?: ValidationType[]) {
    return new ErrorHandler({
      name: "BadRequestError",
      message,
      statusCode: HttpCode.BAD_REQUEST,
      validationErrors,
    });
  }

  static forbidden(message: string, validationErrors?: ValidationType[]) {
    return new ErrorHandler({
      name: "ForbiddenError",
      message,
      statusCode: HttpCode.FORBIDDEN,
      validationErrors,
    });
  }

  static unauthorized(message: string, validationErrors?: ValidationType[]) {
    return new ErrorHandler({
      name: "UnauthorizedError",
      message,
      statusCode: HttpCode.UNAUTHORIZED,
      validationErrors,
    });
  }

  static notFound(message: string, validationErrors?: ValidationType[]) {
    return new ErrorHandler({
      name: "NotFoundError",
      message,
      statusCode: HttpCode.NOT_FOUND,
      validationErrors,
    });
  }

  static internalError(message: string, validationErrors?: ValidationType[]) {
    return new ErrorHandler({
      name: "InternalServerError",
      message,
      statusCode: HttpCode.INTERNAL_SERVER_ERROR,
      validationErrors,
    });
  }
}
