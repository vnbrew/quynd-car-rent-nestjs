import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UsersModule } from "../users/users.module";
import { AppExceptionModule } from "../../core/exception/app.exception.module";

@Module({
  imports: [
    AppExceptionModule,
    UsersModule
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {
}
