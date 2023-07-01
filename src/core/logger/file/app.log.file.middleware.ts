
import { v4 as uuidv4 } from "uuid";
import { AppLogFileService } from "./app.log.file.service";

export const appendIdToRequest = (
  req: Request,
  res: Response,
  next: () => void
) => {
  if (!req.headers["request-id"]) {
    const uuid = uuidv4();
    req.headers["request-id"] = uuid;
  }
  next();
};

export const appendRequestIdToLogger = (logger: AppLogFileService) => (
  req: Request,
  res: Response,
  next: () => void
) => {
  logger.appendDefaultMeta("request-id", req.headers["request-id"] as string);
  next();
};
