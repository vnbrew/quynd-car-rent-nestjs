import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AppLogFileService, LOG_TYPE } from './app.log.file.service';
import { getCircularReplacer, maskJSONOptions } from "./ultils";
import * as MaskData from "maskdata";

@Injectable()
export class AppLogFileInterceptor implements NestInterceptor {
  constructor(private logger: AppLogFileService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    this.logger.setContext(context.getClass().name);
    const ctx = context.switchToHttp();

    if (context.getType() === 'http') {
      const request: Request = ctx.getRequest();
      this.logger.log(
        `${JSON.stringify(
          {
            headers: MaskData.maskJSONFields(request.headers, maskJSONOptions),
            type: LOG_TYPE.REQUEST_ARGS,
            value: MaskData.maskJSONFields(request.body, maskJSONOptions),
          },
          getCircularReplacer(),
        )}`,
      );
    } else if (context.getType() === 'rpc') {
      // do something that is only important in the context of Microservice requests
    }
    //   else if (context.getType<GqlContextType>() === "graphql") {
    //     const gqlContext = GqlExecutionContext.create(context);
    //     const args = gqlContext.getArgs();
    //     this.logger.log(
    //       `${JSON.stringify(
    //         {
    //           headers: ctx.getRequest<Request>()?.headers,
    //           type: LOG_TYPE.REQUEST_ARGS,
    //           value: args,
    //         },
    //         getCircularReplacer(),
    //       )}`,
    //     );
    //   }

    const now = Date.now();
    return next.handle().pipe(
      tap({
        next: (value) => {
          this.logger.log(
            `${JSON.stringify({ 
              Response: MaskData.maskJSONFields(value, maskJSONOptions), 
            }, getCircularReplacer())}`,
          );
        },
        complete: () => this.logger.log(`Finished... ${Date.now() - now}ms`),
      }),
    );
  }
}
