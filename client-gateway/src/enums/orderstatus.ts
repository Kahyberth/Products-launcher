export enum OrderStatus {
  PENDING = 'PENDING',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

export const orderList = [
  OrderStatus.CANCELLED,
  OrderStatus.DELIVERED,
  OrderStatus.PENDING,
];
