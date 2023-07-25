export interface IDetailExceptionMessage {
  code: string;
  field: string;
  message: string;
}

export interface IBaseExceptionMessage {
  code: string;
  title: string;
  message: string;
  errors: IDetailExceptionMessage[];
}
