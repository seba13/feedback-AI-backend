import { ValidationType } from "../types";

// TODO: ADAPTAR AL CODIGO
// TODO: CREAR REDUCER PARA MENSAJE DE ERRORES

export function transformValidationErrors(errors: ValidationType[]): string {
  return errors.map((err) => `${err.fields.join(", ")}: ${err.constraint}`).join("; ");
}
