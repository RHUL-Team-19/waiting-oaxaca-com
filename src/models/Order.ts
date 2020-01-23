export interface Order {
  order_id: number;

  staff_id: number;

  table_id: number;

  is_paid: boolean;

  date_time_ordered: number;

  satisfaction_rating?: number;
}
