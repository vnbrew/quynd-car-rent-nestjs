import {
    BadRequestException,
    Injectable,
    InternalServerErrorException, MethodNotAllowedException, NotFoundException,
    UnauthorizedException
} from "@nestjs/common";
import {IBaseExceptionMessage, IDetailExceptionMessage} from "./app.exception.interface";

@Injectable()
export class AppExceptionService {

    badRequestException(message: string, errors: IDetailExceptionMessage[]): void {
        const errorResponse: IBaseExceptionMessage = {
            code: "",
            title: "",
            message: message,
            errors: errors
        };
        throw new BadRequestException(errorResponse);
    }

    unauthorizedException(message: string, errors: IDetailExceptionMessage[]): void {
        const errorResponse: IBaseExceptionMessage = {
            code: "",
            title: "",
            message: message,
            errors: errors
        };
        throw new UnauthorizedException(errorResponse);
    }

    notFoundException(message: string, errors: IDetailExceptionMessage[]): void {
        const errorResponse: IBaseExceptionMessage = {
            code: "",
            title: "",
            message: message,
            errors: errors
        };
        throw new NotFoundException(errorResponse);
    }

    internalServerErrorException(message: string, errors: IDetailExceptionMessage[]): void {
        const errorResponse: IBaseExceptionMessage = {
            code: "",
            title: "",
            message: message,
            errors: errors
        };
        throw new InternalServerErrorException(errorResponse);
    }

    methodNotAllowedException(message: string, errors: IDetailExceptionMessage[]): void {
        const errorResponse: IBaseExceptionMessage = {
            code: "",
            title: "",
            message: message,
            errors: errors
        };
        throw new MethodNotAllowedException(errorResponse);
    }


}
  