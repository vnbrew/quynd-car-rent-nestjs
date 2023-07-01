import { Module } from '@nestjs/common';
import { AppLogService } from './app.log.service';

@Module({
  providers: [AppLogService],
  exports: [AppLogService],
})
export class AppLogModule {}
