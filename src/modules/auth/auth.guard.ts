import {
  CanActivate,
  ExecutionContext, Inject,
  Injectable
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { IS_PUBLIC_KEY } from "../../core/constants";
import { Reflector } from "@nestjs/core";
import { AppExceptionService } from "../../core/exception/app.exception.service";
import { I18nContext, I18nService } from "nestjs-i18n";
import { extractTokenFromHeader } from "../../shared/utils/ultils";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";
import { TokenStatus } from "../../shared/enum/token-status";
import { UnauthorizedCode } from "../../shared/enum/exception-code";
import { UsersService } from "../users/users.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
    private readonly appExceptionService: AppExceptionService,
    private readonly i18n: I18nService,
    private readonly usersService: UsersService
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
    //Check header has token or not
    if (!token) {
      let code = UnauthorizedCode.UN_HEADER_WITH_OUT_TOKEN;
      let message = this.i18n.translate("error.unauthorized", {
        lang: I18nContext.current().lang
      });
      this.appExceptionService.unauthorizedException(code, "", message, []);
    }

    //Check memory cached has token invalid or not
    let tokenStatus = await this.cacheManager.get<String>(token);
    if (tokenStatus == TokenStatus.invalid) {
      let message = this.i18n.translate("error.unauthorized", {
        lang: I18nContext.current().lang
      });
      this.appExceptionService.unauthorizedException(UnauthorizedCode.UN_TOKEN_OF_USER_LOGOUT, "", message, []);
    }

    //JWT verify Token
    try {
      request["user"] = await this.jwtService.verifyAsync(
        token,
        {
          secret: process.env.JWT_KEY
        }
      );
    } catch (error) {
      let message = this.i18n.translate("error.unauthorized", {
        lang: I18nContext.current().lang
      });
      this.appExceptionService.unauthorizedException(UnauthorizedCode.UN_TOKEN_IN_VALID, "", message, []);
    }

    //Check UserToken has token valid or not
    let hasTokenInDB = await this.usersService.hasTokenInUserToken(token);
    if (!hasTokenInDB) {
      let message = this.i18n.translate("error.unauthorized", {
        lang: I18nContext.current().lang
      });
      this.appExceptionService.unauthorizedException(UnauthorizedCode.UN_TOKEN_REMOVED, "", message, []);
    }
    return true;
  }
}