import { Module } from "@nestjs/common";
import { TaskScheduleService } from "./task_schedule.service";
import { ScheduleModule } from "@nestjs/schedule";
import { RentalModule } from "../rental/rental.module";

@Module({
  imports: [
    ScheduleModule.forRoot(),
    RentalModule
  ],
  controllers: [],
  providers: [TaskScheduleService]
})
export class TaskScheduleModule {
}
