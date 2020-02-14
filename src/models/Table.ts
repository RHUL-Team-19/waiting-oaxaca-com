export interface Table {
  [index: string]: number | boolean;

  table_id: number;

  restaurant_id: number;

  table_number: number;

  is_cleaned: boolean;

  number_of_seats: number;
}
