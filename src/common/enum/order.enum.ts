export enum EOrderStatus {
  order = 1,
  paid = 2,
  cancel = 3,
}

export enum EOrderErrorType {
  ORDER_CAR_IS_NOT_AVAILABLE,
  ORDER_COUPON_IS_INVALID,
  ORDER_IS_INTERNAL_ERROR,
}
