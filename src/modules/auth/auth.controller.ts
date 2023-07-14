import {
  Controller, Post, Body, HttpCode, Req
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserLoginRequestDto } from "./dto/user-login-request.dto";
import { UserLoginResponseDto } from "./dto/user-login-response.dto";
import { UserLogoutResponseDto } from "./dto/user-logout-response.dto";
import { SetPublic } from "../../core/constants";
import { extractTokenFromHeader } from "../../shared/utils/ultils";

@Controller("v1/auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {
  }

  @SetPublic()
  @HttpCode(200)
  @Post("login")
  async login(
    @Body() userLoginRequestDto: UserLoginRequestDto
  ): Promise<UserLoginResponseDto> {
    return await this.authService.login(userLoginRequestDto);
  }

  @Post("logout")
  @HttpCode(204)
  async logout(@Req() request): Promise<UserLogoutResponseDto> {
    const token = extractTokenFromHeader(request);
    return await this.authService.logout(token);
  }
}
