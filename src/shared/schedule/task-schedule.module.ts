import { Module } from '@nestjs/common';
import { TaskScheduleService } from './task-schedule.service';
import { ScheduleModule } from '@nestjs/schedule';
import { UsersModule } from '../../modules/users/users.module';
import { RedisCacheModule } from '../cache/rediscache.module';

@Module({
  imports: [ScheduleModule.forRoot(), UsersModule, RedisCacheModule],
  controllers: [],
  providers: [TaskScheduleService],
})
export class TaskScheduleModule {}
