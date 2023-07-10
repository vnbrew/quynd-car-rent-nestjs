import { Module } from "@nestjs/common";
import { AppExceptionService } from "./app.exception.service";

@Module({
  providers: [AppExceptionService],
  exports: [AppExceptionService]
})
export class AppExceptionModule {
}
