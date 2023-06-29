import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { AppLogService } from '../log/app.log.service';
import { IBaseExceptionMessage } from '../exception/app.exception.interface';

@Catch()
export class AppAllExceptionFilter implements ExceptionFilter {
    constructor(private readonly logger: AppLogService) { }
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request: any = ctx.getRequest();
        const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
        const message =
            exception instanceof HttpException
                ? (exception.getResponse() as IBaseExceptionMessage)
                : { message: (exception as Error).message, code_error: null };
        const responseData = {
            ...{
                statusCode: status,
                timestamp: new Date().toISOString(),
                path: request.url,
            },
            ...message,
        };
        this.logMessage(request, message, status, exception);
        response.status(status).json(responseData);
    }

    private logMessage(request: any, message: IBaseExceptionMessage, status: number, exception: any) {
        if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
            this.logger.error(
                AppAllExceptionFilter.name,
                `End Request for ${request.path} method=${request.method} status=${status} code_error=${message.code_error ? message.code_error : null} message=${message.message ? message.message : null}`,
                status >= HttpStatus.INTERNAL_SERVER_ERROR ? exception.stack : '',
            );
        } else {
            this.logger.warn(
                AppAllExceptionFilter.name,
                `End Request for ${request.path} method=${request.method} status=${status} code_error=${message.code_error ? message.code_error : null} message=${message.message ? message.message : null}`,
            );
        }
    }
}
