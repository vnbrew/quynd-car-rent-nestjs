import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  MethodNotAllowedException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  IBaseExceptionMessage,
  IDetailExceptionMessage,
} from './app.exception.interface';

@Injectable()
export class AppExceptionService {
  badRequestException(
    code: string = '',
    title: string = '',
    message: string,
    errors: IDetailExceptionMessage[],
  ): void {
    const errorResponse: IBaseExceptionMessage = {
      code: code,
      title: title,
      message: message,
      errors: errors,
    };
    throw new BadRequestException(errorResponse);
  }

  unauthorizedException(
    code: string = '',
    title: string = '',
    message: string,
    errors: IDetailExceptionMessage[],
  ): void {
    const errorResponse: IBaseExceptionMessage = {
      code: code,
      title: title,
      message: message,
      errors: errors,
    };
    throw new UnauthorizedException(errorResponse);
  }

  internalServerErrorException(
    code: string = '',
    title: string = '',
    message: string,
    errors: IDetailExceptionMessage[],
  ): void {
    const errorResponse: IBaseExceptionMessage = {
      code: code,
      title: title,
      message: message,
      errors: errors,
    };
    throw new InternalServerErrorException(errorResponse);
  }
}
