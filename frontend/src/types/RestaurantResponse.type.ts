type RestaurantT = {
    id: number;
    name: string;
    image: string;
    restaurantType: RestaurantType;
    suburb: string;
    city: string;
    isFeatured?: boolean;
  }
  type RestaurantType = {
    id: number,
    name: string
  }

  interface listingProps <T extends RestaurantT> {
    items: T[]
  }