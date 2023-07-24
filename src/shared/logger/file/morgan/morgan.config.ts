import * as morgan from "morgan";
import { TOKEN_TYPE } from "./morgan.constants";

export const configMorgan = {
  appendMorganToken: (
    token: string,
    tokenType: TOKEN_TYPE,
    morganToken: string
  ) =>
    morgan.token(morganToken, (req: any, res: any) => {
      if (tokenType === TOKEN_TYPE.Request) return req[token];
      else return res[token];
    })
};
