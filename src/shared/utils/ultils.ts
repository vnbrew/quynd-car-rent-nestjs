import {Request} from "express";
import {IBaseExceptionMessage, IDetailExceptionMessage} from "../../core/exception/app.exception.interface";

export const extractTokenFromHeader = (request: Request) => {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
};

export const createExceptionMessage = (message: string, errors: IDetailExceptionMessage[]) => {
    const errorResponse: IBaseExceptionMessage = {
        code: "",
        title: "",
        message: message,
        errors: errors
    };
    return errorResponse;
}