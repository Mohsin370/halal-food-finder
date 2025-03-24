type RestaurantT = {
    id: number;
    name: string;
    image: string;
    restaurantType: RestaurantType;
    cuisineType: CuisineType
    suburb: string;
    city: string;
    isFeatured?: boolean;
  }
  type RestaurantType = {
    id: number,
    name: string
  }

  type CuisineType = {
    id: number,
    name:string
  }
  

  interface listingProps <T extends RestaurantT> {
    items: T[]
  }