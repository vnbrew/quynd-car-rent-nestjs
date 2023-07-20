import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UsersModule } from "../users/users.module";
import { AppExceptionModule } from "../../core/exception/app.exception.module";
import { RedisCacheModule } from "../cache/rediscache.module";

@Module({
  imports: [
    AppExceptionModule,
    UsersModule,
    RedisCacheModule
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {
}
