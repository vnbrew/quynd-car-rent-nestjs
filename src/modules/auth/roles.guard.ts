import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "../../shared/enum/role";
import { ROLES_KEY } from "../../core/constants";
import { IBaseExceptionMessage } from "../../core/exception/app.exception.interface";
import { I18nContext, I18nService } from "nestjs-i18n";
import { AppExceptionService } from "../../core/exception/app.exception.service";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly appExceptionService: AppExceptionService,
    private readonly i18n: I18nService
  ) {
  }

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
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
      const errorResponse: IBaseExceptionMessage = {
        message: this.i18n.translate("error.forbidden", {
          lang: I18nContext.current().lang
        }),
        detail: []
      };
      this.appExceptionService.forbiddenException(errorResponse);
    }
    return isValid;
  }
}