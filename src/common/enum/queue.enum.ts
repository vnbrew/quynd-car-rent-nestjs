export enum EQueueName {
  register = 'register_queue',
  order = 'order_queue',
  rental = 'rental_queue',
  payment = 'payment_queue',
}

export enum EProcessName {
  register_completed = 'register_completed',
  booking_success = 'booking_success',
  payment_completed = 'payment_completed',
  create_order = 'create_order',
  // pay_order = 'pay_order',
  // cancel_order = 'cancel_order',
}
