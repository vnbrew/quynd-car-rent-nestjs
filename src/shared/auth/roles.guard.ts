import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../../common/enum/role';
import { ROLES_KEY } from '../constants';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { AppExceptionService } from '../exception/app.exception.service';
import { BadRequestCode } from '../../common/enum/exception-code';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly appExceptionService: AppExceptionService,
    private readonly i18n: I18nService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    if (!user) {
      return true;
    }
    let isValid = requiredRoles.some((role) => user.role?.includes(role));
    if (!isValid) {
      let message = this.i18n.translate('error.method_not_allowed', {
        lang: I18nContext.current().lang,
      });
      this.appExceptionService.badRequestException(
        BadRequestCode.BA_PERMISSION,
        '',
        message,
        [],
      );
    }
    return isValid;
  }
}
