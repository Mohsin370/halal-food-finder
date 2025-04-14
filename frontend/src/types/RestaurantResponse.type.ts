type RestaurantT = {
    id: number;
    description:string,
    name: string;
    image: string;
    restaurantType: RestaurantType;
    cuisineType: CuisineType
    suburb: string;
    city: string;
    isFeatured?: boolean;
    rating: number,
    userRatingCount: number
    placeId: number
  }
  type RestaurantType = {
    id: number,
    name: string
  }

  type CuisineType = {
    id: number,
    name:string
  }
  
  type HalalStatus = {
    id:number,
    status:string,
    description:string
  }
  

  interface listingProps <T extends Restaurant> {
    items: T[]
  }