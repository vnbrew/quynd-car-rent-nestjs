import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { usersProviders } from './users.provider';
import { AppExceptionModule } from '../../shared/exception/app.exception.module';
import { QueueModule } from '../../shared/queue/queue.module';
import { RedisCacheModule } from '../../shared/cache/rediscache.module';
import { databaseProvider } from '../../shared/database/database.provider';

@Module({
  imports: [AppExceptionModule, QueueModule, RedisCacheModule],
  controllers: [UsersController],
  providers: [UsersService, ...usersProviders, ...databaseProvider],
  exports: [UsersService],
})
export class UsersModule {}
