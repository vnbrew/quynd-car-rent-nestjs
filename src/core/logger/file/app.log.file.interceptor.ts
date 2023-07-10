import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler
} from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { AppLogFileService, LOG_TYPE } from "./app.log.file.service";
import { getCircularReplacer } from "./ultils";

@Injectable()
export class AppLogFileInterceptor implements NestInterceptor {
  constructor(private logger: AppLogFileService) {
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    this.logger.setContext(context.getClass().name);
    const ctx = context.switchToHttp();

    if (context.getType() === "http") {
      // do something that is only important in the context of regular HTTP requests (REST)
      const request: Request = ctx.getRequest();

      this.logger.log(
        `${JSON.stringify(
          {
            headers: request.headers,
            type: LOG_TYPE.REQUEST_ARGS,
            // if body is multipart, request.body={}
            value: request.body
          },
          getCircularReplacer()
        )}`
      );
    } else if (context.getType() === "rpc") {
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

    // const now = Date.now();
    return next.handle().pipe(
      tap({
        next: (value) => {
          this.logger.log(
            `${JSON.stringify({ Response: value }, getCircularReplacer())}`
          );
        }
        /*
       /**
         * Intercept error state
         */
        // error: (err) => {
        //   this.logger.error(err, "");
        // },

        /**
         * Intercept complete state
         */
        // complete: () => this.logger.log(`Finished... ${Date.now() - now}ms`),
      })
    );
  }
}
  