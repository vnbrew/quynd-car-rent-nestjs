import { Module } from "@nestjs/common";
import { TaskScheduleService } from "./task-schedule.service";
import { ScheduleModule } from "@nestjs/schedule";
import { UsersModule } from "../users/users.module";
import { RedisCacheModule } from "../rediscache/rediscache.module";

@Module({
  imports: [
    ScheduleModule.forRoot(),
    UsersModule,
    RedisCacheModule,
  ],
  controllers: [],
  providers: [TaskScheduleService]
})
export class TaskScheduleModule {
}
