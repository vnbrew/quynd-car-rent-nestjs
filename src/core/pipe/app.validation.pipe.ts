import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { IBaseExceptionMessage } from '../exception/app.exception.interface';
import { AppExceptionService } from '../exception/app.exception.service';
import { validate } from 'class-validator';

@Injectable()
export class AppValidationPipe implements PipeTransform<any> {
    constructor(private readonly exceptionService: AppExceptionService) { }
    async transform(value: any, { metatype }: ArgumentMetadata) {
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }
        const object = plainToInstance(metatype, value);
        const errors = await validate(object);
        if (errors.length > 0) {
            const transformedErrors = errors.map(error => {
                const property = error.property;
                const message = Object.values(error.constraints)[0];
                return { property, message };
            });
            const errorResponse: IBaseExceptionMessage = {
                message: 'Validation failed',
                detail: transformedErrors,
            };
            this.exceptionService.badRequestException(errorResponse);
        }
        return value;
    }

    private toValidate(metatype: Function): boolean {
        const types: Function[] = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
    }
}