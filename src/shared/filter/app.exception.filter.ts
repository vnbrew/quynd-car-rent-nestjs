import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { IBaseExceptionMessage } from '../exception/app.exception.interface';
import { InternalServerErrorCode } from '../../common/enum/exception-code';

@Catch()
export class AppAllExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const error =
      exception instanceof HttpException
        ? (exception.getResponse() as IBaseExceptionMessage)
        : {
            code: InternalServerErrorCode.IN_COMMON_ERROR,
            title: '',
            message: (exception as Error).message,
            errors: [],
          };

    const responseData = {
      ...{
        error,
      },
    };
    response.status(status).json(responseData);
  }
}
