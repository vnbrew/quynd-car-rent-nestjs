import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import {
  ExcludeNullInterceptor,
  TimeoutInterceptor,
  TransformInterceptor,
} from './core/interceptor/transform/transform.interceptor';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseInterceptors(
    TransformInterceptor,
    TimeoutInterceptor,
    ExcludeNullInterceptor,
  )
  getHello(): string {
    return this.appService.getHello();
  }
}
