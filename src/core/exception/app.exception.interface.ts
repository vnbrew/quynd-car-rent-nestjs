export interface IDetailExceptionMessage {
    property: string;
    message: string;
}

export interface IBaseExceptionMessage {
    message: string;
    code_error?: number;
    sub_code_error?: string;
    detail?: IDetailExceptionMessage[];
}

export interface IAppException {
    badRequestException(data: IBaseExceptionMessage): void;
    internalServerErrorException(data?: IBaseExceptionMessage): void;
    forbiddenException(data?: IBaseExceptionMessage): void;
    UnauthorizedException(data?: IBaseExceptionMessage): void;
}
