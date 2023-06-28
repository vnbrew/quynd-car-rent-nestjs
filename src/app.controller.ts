import { Controller, Get, HttpStatus, Param, ParseIntPipe, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import {
  ExcludeNullInterceptor,
  TimeoutInterceptor,
  TransformInterceptor,
} from './core/interceptor/transform/transform.interceptor';
import { IsInt, IsNumberString } from 'class-validator';

export class FindOneParams {
  @IsNumberString()
  id: number;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/api/v1/hello/:id')
  @UseInterceptors(
    TransformInterceptor,
    TimeoutInterceptor,
    ExcludeNullInterceptor,
  )
  getHello(@Param() params: FindOneParams): string {
    return this.appService.getHello(params.id);
  }
}
