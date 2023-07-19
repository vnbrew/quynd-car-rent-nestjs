import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { usersProviders } from "./users.provider";
import { AppExceptionModule } from "../../core/exception/app.exception.module";
import { QueueModule } from "../queue/queue.module";

@Module({
  imports: [AppExceptionModule, QueueModule],
  controllers: [UsersController],
  providers: [UsersService, ...usersProviders],
  exports: [UsersService]
})
export class UsersModule {
}
