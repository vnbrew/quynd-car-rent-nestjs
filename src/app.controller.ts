import { Controller, Get, Param, UseFilters, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import {
  ExcludeNullInterceptor,
  TimeoutInterceptor,
  TransformInterceptor,
} from './core/interceptor/transform/transform.interceptor';
import { IsNumberString } from 'class-validator';
import { AppLogInterceptor } from './core/interceptor/applog/applog.interceptor';
import { AllExceptionsFilter } from './core/exception/all-exception.filter';

export class FindOneParams {
  @IsNumberString()
  id: number;
}

@Controller('v1/hello')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':id')
  @UsePipes(ValidationPipe)
  getHello(@Param() params: FindOneParams): string {
    return this.appService.getHello(params.id);
  }
}
