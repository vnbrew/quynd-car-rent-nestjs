import { Inject, Injectable } from "@nestjs/common";
import { UserLoginRequestDto } from "./dto/user-login-request.dto";
import { UserLoginResponseDto } from "./dto/user-login-response.dto";
import { IBaseExceptionMessage } from "../../core/exception/app.exception.interface";
import { I18nContext, I18nService } from "nestjs-i18n";
import { compare } from "bcrypt";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { AppExceptionService } from "../../core/exception/app.exception.service";
import { UserLogoutResponseDto } from "./dto/user-logout-response.dto";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";
import { TokenStatus } from "../../shared/enum/token-status";
import { BadRequestCode, UnauthorizedCode } from "../../shared/enum/exception-code";
import { RedisCacheService } from "../rediscache/rediscache.service";

@Injectable()
export class AuthService {

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly appExceptionService: AppExceptionService,
    private readonly i18n: I18nService,
    private readonly redisCacheService: RedisCacheService
  ) {
  }

  async login(userLoginRequestDto: UserLoginRequestDto): Promise<UserLoginResponseDto> {
    let email = userLoginRequestDto.email;
    let password = userLoginRequestDto.password;
    let userInDB = await this.usersService.getUserByEmail(email);
    if (!userInDB) {
      let code = BadRequestCode.BA_EMAIL_DOES_NOT_EXIST;
      let message = this.i18n.translate("error.email_does_not_exist", {
        lang: I18nContext.current().lang
      });
      this.appExceptionService.badRequestException(code, "", message, []);
    }
    const isMatch = await compare(password, userInDB.password);
    if (!isMatch) {
      let code = BadRequestCode.BA_INVALID_PASSWORD;
      let message = this.i18n.translate("error.invalid_password", {
        lang: I18nContext.current().lang
      });
      this.appExceptionService.badRequestException(code, "", message, []);
    }
    let payload = {
      id: userInDB.id,
      email: userInDB.email,
      role: userInDB.role
    };
    let access_token = await this.jwtService.signAsync(payload);
    await this.usersService.addAccessTokenToDB(userInDB.id, access_token);
    await this.redisCacheService.addTokenToWhiteList(access_token);
    return new UserLoginResponseDto(access_token);
  }

  async logout(token: string): Promise<UserLogoutResponseDto> {
    await this.usersService.removeTokenInDB(token);
    await this.redisCacheService.addTokenToBlackList(token);
    return new UserLogoutResponseDto(token);
  }
}
