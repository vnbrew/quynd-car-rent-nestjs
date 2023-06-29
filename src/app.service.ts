import { BadRequestException, ForbiddenException, GoneException, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(id: number): string {
    return 'Hello World!';
  }
}
