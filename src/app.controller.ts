import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { IsNumberString } from 'class-validator';

export class FindOneParams {
  @IsNumberString()
  id: number;
}

@Controller('v1/hello')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get(':id')
  getHello(@Param() params: FindOneParams): string {
    return this.appService.getHello(params.id);
  }
}
