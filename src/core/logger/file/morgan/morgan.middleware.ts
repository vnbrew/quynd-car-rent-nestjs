import * as morgan from "morgan";
import { MORGAN_FORMAT_STRING } from "./morgan.constants";
import { AppLogFileService } from "../app.log.file.service";

export const morganRequestLogger = (
  logger: AppLogFileService,
  morganFormatString: string = MORGAN_FORMAT_STRING.REQUEST,
) =>
  morgan(morganFormatString, {
    immediate: true,
    stream: {
      write: (message: string) => {
        logger.log(message);
      },
    },
  });

export const morganResponseLogger = (
  logger: AppLogFileService,
  morganFormatString: string = MORGAN_FORMAT_STRING.RESPONSE,
) =>
  morgan(morganFormatString, {
    stream: {
      write: (message: string) => {
        logger.log(message);
      },
    },
  });
