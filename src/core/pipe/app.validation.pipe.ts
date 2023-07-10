import {
  PipeTransform,
  Injectable,
  ArgumentMetadata
} from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { IBaseExceptionMessage } from "../exception/app.exception.interface";
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
        console.log(error);
        const property = error.property;
        const message = Object.values(error.constraints)[0];
        // const key = Object.keys(error.constraints)[0];
        // const message = this.i18n.translate(`validation.${key}`, {
        //   args: { property: error.property },
        //   lang: lang,
        // });
        return { property, message };
      });

      const errorResponse: IBaseExceptionMessage = {
        message: this.i18n.translate("validation.data.type", {
          lang: lang
        }),
        detail: transformedErrors
      };
      this.exceptionService.badRequestException(errorResponse);
    }
    return value;
  }

  private translateErrors(errors: any) {
    const data = [];
    errors.forEach(async (error: { constraints: {}; property: any }) => {
      const message = Promise.all(
        Object.keys(error.constraints).map(async (key) =>
          this.i18n.translate(`validation.${key}`, {
            args: { property: error.property }
          })
        )
      );
      data.push({ field: error.property, message });
    });
    return data;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
