export interface Staff {
  [index: string]: number | string | boolean;

  staff_id: number;

  restaurant_id: number;

  full_name: string;

  password: string;

  has_passed_training: boolean;
}
