import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { TokenStatus } from '../../common/enum/token-status';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class RedisCacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async addTokenToBlackList(token: string) {
    await this.cacheManager.set(token, TokenStatus.blacklist, {
      ttl: parseInt(process.env.JWT_EXP_TIME) * 1000,
    });
  }

  async addTokenToWhiteList(token: string) {
    await this.cacheManager.set(token, TokenStatus.whitelist, {
      ttl: parseInt(process.env.JWT_EXP_TIME) * 1000,
    });
  }

  async isTokenInBlackList(token: string): Promise<boolean> {
    let tokenStatus = await this.cacheManager.get<String>(token);
    return tokenStatus === TokenStatus.blacklist;
  }

  async isTokenInWhiteList(token: string): Promise<boolean> {
    // console.log(token);
    let tokenStatus = await this.cacheManager.get<String>(token);
    // console.log(tokenStatus);
    return tokenStatus === TokenStatus.whitelist;
  }
}
