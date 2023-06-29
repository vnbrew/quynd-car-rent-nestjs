import { Injectable } from '@nestjs/common';
import { AppExceptionService } from './core/exception/app.exception.service';

@Injectable()
export class AppService {
  constructor(private readonly exceptionService: AppExceptionService,) { }
  getHello(id: number): string {
    return 'Hello World!';
  }
}
