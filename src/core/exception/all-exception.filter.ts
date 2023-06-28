import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
import { generateResponseError, generateValidationError } from './error-response.interface';
  
  @Catch()
  export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
      const request = ctx.getRequest();
  
      const status =
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;

        //Validation Error
        //Invalid Request
        // Business Logic Error
        if(status === HttpStatus.BAD_REQUEST) {
            response.status(status).json(generateValidationError(exception));
        }
        else {
            response.status(status).json(generateResponseError(status, ''));
        }
      
    }
  }