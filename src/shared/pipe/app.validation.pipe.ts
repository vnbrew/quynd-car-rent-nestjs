import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { IDetailExceptionMessage } from '../exception/app.exception.interface';
import { AppExceptionService } from '../exception/app.exception.service';
import { validate } from 'class-validator';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { BadRequestCode } from '../../common/enum/exception-code';

@Injectable()
export class AppValidationPipe implements PipeTransform<any> {
  constructor(
    private readonly exceptionService: AppExceptionService,
    private readonly i18n: I18nService,
  ) {}

  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToInstance(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      const transformedErrors = errors.map((error) => {
        const code = '';
        const field = error.property;
        const message = Object.values(error.constraints)[0];
        let detail: IDetailExceptionMessage = { code, field, message };
        return detail;
      });
      let message = this.i18n.translate('error.data_type', {
        lang: I18nContext.current().lang,
      });
      this.exceptionService.badRequestException(
        BadRequestCode.BA_IN_CORRECT_DATA_TYPE,
        '',
        message,
        transformedErrors,
      );
    }
    return value;
  }

  private toValidate(metaType: any): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metaType);
  }
}
