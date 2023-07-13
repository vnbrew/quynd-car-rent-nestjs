import { Request } from "express";

export const extractTokenFromHeader = (request: Request) => {
  const [type, token] = request.headers.authorization?.split(" ") ?? [];
  return type === "Bearer" ? token : undefined;
};