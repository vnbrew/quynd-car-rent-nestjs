import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { UsersService } from '../../modules/users/users.service';
import { RedisCacheService } from '../cache/rediscache.service';
import { OrdersService } from '../../modules/orders/orders.service';
// import { CreateOrderDto } from '../../modules/orders/dto/create-order.dto';

@Injectable()
export class TaskScheduleService {
  constructor(
    private readonly usersService: UsersService,
    private readonly ordersService: OrdersService,
    private readonly redisCacheService: RedisCacheService,
  ) {}

  // @Cron("0 * * * * *") //every minute at second 0
  @Cron('*/5 * * * *') //run after 5 minutes
  async cronToCheckRentalStatus() {
    const userTokens = await this.usersService.getAllUserTokenExpired();
    for (const userToken of userTokens) {
      await this.usersService.removeTokenInDB(userToken.token);
      await this.redisCacheService.addTokenToBlackList(userToken.token);
    }
  }
  // private async createOrder() {
  //   const userId = 2;
  //   const orderBody: CreateOrderDto = {
  //     car_id: 1,
  //     order_status_id: 1,
  //     payment_type_id: 1,
  //     billing_id: 2,
  //     coupon_code: 'DC-100',
  //     pick_city: 5,
  //     pick_date_time: new Date('2023-08-11 08:00:00'),
  //     drop_city: 1,
  //     drop_date_time: new Date('2023-08-12 16:30:00'),
  //     tax: 10,
  //     detail: '',
  //   };
  //   await this.ordersService.createOrder(userId, orderBody)
  // }
  //
  // @Cron('*/5 * * * *') //run after 5 minutes
  // async createOrder1() {
  //   console.log('createOrder1 at ' + new Date());
  //   await this.createOrder();
  // }
  //
  // @Cron('*/5 * * * *') //run after 5 minutes
  // async createOrder2() {
  //   console.log('createOrder2 at ' + new Date());
  //   await this.createOrder();
  // }
  //
  // @Cron('*/5 * * * *') //run after 5 minutes
  // async createOrder3() {
  //   console.log('createOrder3 at ' + new Date());
  //   await this.createOrder();
  // }
  //
  // @Cron('*/5 * * * *') //run after 5 minutes
  // async createOrder4() {
  //   console.log('createOrder4 at ' + new Date());
  //   await this.createOrder();
  // }
  //
  // @Cron('*/5 * * * *') //run after 5 minutes
  // async createOrder5() {
  //   console.log('createOrder5 at ' + new Date());
  //   await this.createOrder();
  // }
}
