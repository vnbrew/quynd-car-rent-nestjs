import {
  CanActivate,
  ExecutionContext, Inject,
  Injectable
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { IS_PUBLIC_KEY } from "../../core/constants";
import { Reflector } from "@nestjs/core";
import { AppExceptionService } from "../../core/exception/app.exception.service";
import { IBaseExceptionMessage } from "../../core/exception/app.exception.interface";
import { I18nContext, I18nService } from "nestjs-i18n";
import { extractTokenFromHeader } from "../../shared/utils/ultils";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";
import { TokenStatus } from "../../shared/enum/token-status";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
    private readonly appExceptionService: AppExceptionService,
    private readonly i18n: I18nService
  ) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass()
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = extractTokenFromHeader(request);
    if (!token) {
      const errorResponse: IBaseExceptionMessage = {
        message: this.i18n.translate("error.unauthorized", {
          lang: I18nContext.current().lang
        }),
        detail: []
      };
      this.appExceptionService.unauthorizedException(errorResponse);
    }
    let tokenStatus = await this.cacheManager.get<String>(token);
    if (tokenStatus == TokenStatus.invalid) {
      const errorResponse: IBaseExceptionMessage = {
        message: this.i18n.translate("error.unauthorized", {
          lang: I18nContext.current().lang
        }),
        detail: []
      };
      this.appExceptionService.unauthorizedException(errorResponse);
    }
    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: process.env.JWT_KEY
        }
      );
      // console.log(payload);
      request["user"] = payload;
    } catch (error) {
      const errorResponse: IBaseExceptionMessage = {
        message: this.i18n.translate("error.unauthorized", {
          lang: I18nContext.current().lang
        }),
        detail: []
      };
      this.appExceptionService.unauthorizedException(errorResponse);
    }
    return true;
  }
}