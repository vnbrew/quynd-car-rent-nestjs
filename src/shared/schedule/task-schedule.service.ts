import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { UsersService } from '../../modules/users/users.service';
import { RedisCacheService } from '../cache/rediscache.service';

@Injectable()
export class TaskScheduleService {
  constructor(
    private readonly usersService: UsersService,
    private readonly redisCacheService: RedisCacheService,
  ) {}

  // @Cron("0 * * * * *") //every minute at second 0
  @Cron('*/5 * * * *') //run after 5 minutes
  async cronToCheckRentalStatus() {
    let userTokens = await this.usersService.getAllUserTokenExpired();
    for (const userToken of userTokens) {
      await this.usersService.removeTokenInDB(userToken.token);
      await this.redisCacheService.addTokenToBlackList(userToken.token);
    }
  }
}
