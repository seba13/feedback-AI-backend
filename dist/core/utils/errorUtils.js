"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformValidationErrors = transformValidationErrors;
// TODO: ADAPTAR AL CODIGO
// TODO: CREAR REDUCER PARA MENSAJE DE ERRORES
function transformValidationErrors(errors) {
    return errors.map((err) => `${err.fields.join(", ")}: ${err.constraint}`).join("; ");
}
