import {
  PipeTransform,
  Injectable,
  ArgumentMetadata
} from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { IBaseExceptionMessage, IDetailExceptionMessage } from "../exception/app.exception.interface";
import { AppExceptionService } from "../exception/app.exception.service";
import { validate } from "class-validator";
import { I18nContext, I18nService } from "nestjs-i18n";

@Injectable()
export class AppValidationPipe implements PipeTransform<any> {
  constructor(
    private readonly exceptionService: AppExceptionService,
    private readonly i18n: I18nService
  ) {
  }

  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const lang = I18nContext.current().lang;
    const object = plainToInstance(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      const transformedErrors = errors.map((error) => {
        const property = error.property;
        const message = Object.values(error.constraints)[0];
        // const key = Object.keys(error.constraints)[0];
        // console.log(key);
        // const message: string = this.i18n.translate(`validation.${key}`, {
        //   args: { property: error.property },
        //   lang: lang
        // });
        let detail: IDetailExceptionMessage = { property, message };
        return detail;
      });

      const errorResponse: IBaseExceptionMessage = {
        message: this.i18n.translate("error.data_type", {
          lang: lang
        }),
        detail: transformedErrors
      };
      this.exceptionService.badRequestException(errorResponse);
    }
    return value;
  }

  private toValidate(metaType: any): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metaType);
  }
}
