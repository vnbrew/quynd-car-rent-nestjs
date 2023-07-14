import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { IBaseExceptionMessage } from "../exception/app.exception.interface";
import { AppLogService } from "../logger/console/app.log.service";
import { InternalServerErrorCode } from "../../shared/enum/exception-code";

@Catch()
export class AppAllExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: AppLogService) {
  }

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request: any = ctx.getRequest();
    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const error =
      exception instanceof HttpException
        ? (exception.getResponse() as IBaseExceptionMessage)
        : {
          code: InternalServerErrorCode.IN_COMMON_ERROR,
          title: "",
          message: (exception as Error).message,
          errors: []
        };

    let responseData = {
      ...{
        error
      }
    };
    this.logMessage(request, error, status, exception);
    response.status(status).json(responseData);
  }

  private logMessage(request: any, message: IBaseExceptionMessage, status: number, exception: any) {
    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error(
        AppAllExceptionFilter.name,
        `End Request for ${request.path} method=${request.method} status=${status} code_error=${message.code ? message.code : null} message=${message.message ? message.message : null}`,
        status >= HttpStatus.INTERNAL_SERVER_ERROR ? exception.stack : ""
      );
    } else {
      this.logger.warn(
        AppAllExceptionFilter.name,
        `End Request for ${request.path} method=${request.method} status=${status} code_error=${message.code ? message.code : null} message=${message.message ? message.message : null}`
      );
    }
  }
}
