import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  IBaseExceptionMessage,
  IDetailExceptionMessage,
} from './app.exception.interface';

@Injectable()
export class AppExceptionService {
  badRequestException(
    code = '',
    title = '',
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
    code = '',
    title = '',
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
    code = '',
    title = '',
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
