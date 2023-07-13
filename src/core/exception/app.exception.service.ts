import {
  BadRequestException, ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException
} from "@nestjs/common";
import { IAppException, IBaseExceptionMessage } from "./app.exception.interface";

@Injectable()
export class AppExceptionService implements IAppException {
  conflictException(data: IBaseExceptionMessage): void {
    throw new ConflictException(data);
  }

  badRequestException(data: IBaseExceptionMessage): void {
    throw new BadRequestException(data);
  }

  internalServerErrorException(data?: IBaseExceptionMessage): void {
    throw new InternalServerErrorException(data);
  }

  forbiddenException(data?: IBaseExceptionMessage): void {
    throw new ForbiddenException(data);
  }

  unauthorizedException(data?: IBaseExceptionMessage): void {
    throw new UnauthorizedException(data);
  }
}
  