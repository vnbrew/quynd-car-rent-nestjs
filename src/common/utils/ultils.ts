import { Request } from 'express';
import {
  IBaseExceptionMessage,
  IDetailExceptionMessage,
} from '../../shared/exception/app.exception.interface';
import { IsDecimal } from 'sequelize-typescript/dist/browser';

export const extractTokenFromHeader = (request: Request) => {
  const [type, token] = request.headers.authorization?.split(' ') ?? [];
  return type === 'Bearer' ? token : undefined;
};

export const isDateValid = (dateString?: Date) => {
  if (dateString === null) return false;
  const date = new Date(dateString);
  return !isNaN(date.getTime());
};

export const isPriceValid = (price?: number) => {
  if (price === null) return false;
  if (typeof price !== 'number') {
    return false;
  }
  return !isNaN(price);
};

export const isSameDateTime = (dateTimeA?: Date, dateTimeB?: Date) => {
  if (dateTimeA === null || dateTimeB === null) return false;
  let a = new Date(dateTimeA).toISOString();
  let b = new Date(dateTimeB).toISOString();
  return a === b;
};

export const toNumber = (value: string) => {
  if (isNaN(+value)) {
    return 'NA';
  }
  let newValue: number = parseInt(value);
  return newValue;
};
