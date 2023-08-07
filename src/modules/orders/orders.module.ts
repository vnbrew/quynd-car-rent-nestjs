import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { AppExceptionModule } from '../../shared/exception/app.exception.module';
import { CarsModule } from '../cars/cars.module';
import { QueueModule } from '../../shared/queue/queue.module';
import { UsersModule } from '../users/users.module';
import { databaseProvider } from '../../shared/database/database.provider';
import { ordersProviders } from './orders.provider';

@Module({
  imports: [AppExceptionModule, CarsModule, QueueModule, UsersModule],
  controllers: [OrdersController],
  providers: [OrdersService, ...ordersProviders, ...databaseProvider],
  exports: [OrdersService],
})
export class OrdersModule {}
