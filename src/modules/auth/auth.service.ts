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

@Injectable()
export class AuthService {

  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly exceptionService: AppExceptionService,
    private readonly i18n: I18nService
  ) {
  }

  async login(userLoginRequestDto: UserLoginRequestDto): Promise<UserLoginResponseDto> {
    let email = userLoginRequestDto.email;
    let password = userLoginRequestDto.password;
    let userInDB = await this.usersService.getUserByEmail(email);
    if (!userInDB) {
      let userNotExisting: IBaseExceptionMessage = {
        message: this.i18n.translate("error.invalid_email", {
          lang: I18nContext.current().lang
        }),
        detail: []
      };
      this.exceptionService.badRequestException(userNotExisting);
    }
    const isMatch = await compare(password, userInDB.password);
    if (!isMatch) {
      let userNotExisting: IBaseExceptionMessage = {
        message: this.i18n.translate("error.invalid_password", {
          lang: I18nContext.current().lang
        }),
        detail: []
      };
      this.exceptionService.badRequestException(userNotExisting);
    }
    let payload = {
      id: userInDB.id,
      email: userInDB.email,
      role: userInDB.role
    };
    let access_token = await this.jwtService.signAsync(payload);
    await this.usersService.addOrUpdateUserAccessToken(userInDB.id, access_token);
    return new UserLoginResponseDto(access_token);
  }

  async logout(token: string): Promise<UserLogoutResponseDto> {
    let tokenExisting = await this.usersService.removeTokenFromUserToken(token);
    if (tokenExisting) {
      await this.cacheManager.set(token, TokenStatus.invalid, parseInt(process.env.JWT_EXP_TIME.replaceAll("s", "")));
    }
    let message = this.i18n.translate("message.logout_success", {
      lang: I18nContext.current().lang
    });
    return new UserLogoutResponseDto(message);
  }
}
