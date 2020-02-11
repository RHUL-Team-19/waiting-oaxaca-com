export interface OrderMeal {
  [index: string]: number | string | undefined;

  order_meal_id: number;

  order_id: number;

  meal_id: number;

  date_time_prepared?: string;
}
