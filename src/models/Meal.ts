export interface Meal {
  meal_id: number;

  name: string;

  price: number;

  description: string;

  is_vegan: boolean;

  is_vegetarian: boolean;

  does_contain_nuts: boolean;

  does_contain_gluten: boolean;

  does_contain_dairy: boolean;

  does_contain_lactose: boolean;

  does_contain_wheat: boolean;

  does_contain_fish: boolean;

  does_contain_soy: boolean;

  does_contain_egg: boolean;

  image_url: string;
}
