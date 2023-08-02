import { Request } from 'express';

export const calculateNumberOfRentDays = (
  pick: string,
  drop: string,
): number => {
  const ONE_DAY: number = 24 * 60 * 60 * 1000;
  const pickDate: Date = new Date(pick);
  pickDate.setHours(0, 0, 0, 0);
  const dropDate: Date = new Date(drop);
  dropDate.setHours(0, 0, 0, 0);
  const difference: number = Math.ceil(
    (dropDate.getTime() - pickDate.getTime() + ONE_DAY) / ONE_DAY,
  );
  return difference;
};

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
  const a = new Date(dateTimeA).toISOString();
  const b = new Date(dateTimeB).toISOString();
  return a === b;
};

export const toNumber = (value: string) => {
  if (isNaN(+value)) {
    return 'NA';
  }
  const newValue: number = parseInt(value);
  return newValue;
};
