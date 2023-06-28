export interface BaseResponse<T> {
  data: T;
  message: string;
  timestamp: number;
}
