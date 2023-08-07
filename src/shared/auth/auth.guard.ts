import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC_KEY } from '../constants';
import { Reflector } from '@nestjs/core';
import { AppExceptionService } from '../exception/app.exception.service';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { extractTokenFromHeader } from '../../common/utils/ultils';
import { UnauthorizedCode } from '../../common/enum/exception-code';
import { UsersService } from '../../modules/users/users.service';
import { RedisCacheService } from '../cache/rediscache.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
    private readonly appExceptionService: AppExceptionService,
    private readonly i18n: I18nService,
    private readonly usersService: UsersService,
    private readonly redisCacheService: RedisCacheService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = extractTokenFromHeader(request);
    //Check header has token or not
    if (!token) {
      const code = UnauthorizedCode.UN_HEADER_WITH_OUT_TOKEN;
      const message = this.i18n.translate('error.unauthorized', {
        lang: I18nContext.current().lang,
      });
      this.appExceptionService.unauthorizedException(code, '', message, []);
    }

    //Check memory cached has token invalid or not
    const isTokenInWhiteList = await this.redisCacheService.isTokenInWhiteList(
      token,
    );
    const isTokenInBlackList = await this.redisCacheService.isTokenInBlackList(
      token,
    );
    if (isTokenInBlackList || !isTokenInWhiteList) {
      const message = this.i18n.translate('error.unauthorized', {
        lang: I18nContext.current().lang,
      });
      this.appExceptionService.unauthorizedException(
        UnauthorizedCode.UN_TOKEN_IN_VALID,
        '',
        message,
        [],
      );
    }

    //JWT verify Token
    try {
      request['user'] = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_KEY,
      });
    } catch (error) {
      const hasTokenInDB = await this.usersService.hasTokenInDB(token);
      if (hasTokenInDB) {
        await this.usersService.removeTokenInDB(token);
      }
      await this.redisCacheService.addTokenToBlackList(token);
      const message = this.i18n.translate('error.unauthorized', {
        lang: I18nContext.current().lang,
      });
      this.appExceptionService.unauthorizedException(
        UnauthorizedCode.UN_TOKEN_IN_VALID,
        '',
        message,
        [],
      );
    }
    return true;
  }
}
