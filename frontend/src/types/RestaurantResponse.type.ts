type RestaurantT = {
    id: number;
    name: string;
    image: string;
    restaurantType: RestaurantType;
    suburb: string;
    city: string;
  }
  type RestaurantType = {
    id: number,
    name: string
  }