export interface ValidationError<T> {
  invalid_fields: T;
}

export const generateValidationError = <T>(invalid_fields: T): ValidationError<T> => {
  return {
    invalid_fields: invalid_fields,
  };
};

export interface ResponseError {
  errcode: number,
  errmsg: string,
  sub_errcode: number;
}

export const generateResponseError = (errcode: number, message: string, sub_errcode?: number): ResponseError => {
  return {
    errcode: errcode,
    errmsg: message,
    sub_errcode: sub_errcode,
  };
};