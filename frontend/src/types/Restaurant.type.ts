type RestaurantAddressType = {
  address: string;
  suburb: string;
  country: string;
  city: string;
  lat: string;
  lng: string;
  state: string;
  postCode: string;
};


type Restaurant = {
    id: number;
    name: string;
    description: string;
    placeId: string;
    userRatingCount: number;
    rating: string;
    image: string;
    type: string;
    suburb: string;
    city: string;
    country:string;
    lat: string;
    lng: string;
    address:string;
    createdAt:string;
    cuisineType :CuisineType,
    halalStatus :HalalStatus,
    restaurantType :RestaurantType,
    halalStatusId:string,
    restaurantTypeId:string,
    postCode:string
  };
  

