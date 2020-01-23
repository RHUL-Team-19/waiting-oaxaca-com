export interface Order {
  orderID: number;

  staffID: number;

  tableID: number;

  isPaid: boolean;

  dateTimeOrdered: number;

  satisfactionRating?: number;
}
