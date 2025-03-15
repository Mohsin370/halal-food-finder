export type Restaurant = {
  id: number;
  name: string;
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

export type CuisineType = {
  id:string,
  name:string
}

export type HalalStatus = {
  id:string,
  status:string
}

export type RestaurantType = {
  id:string,
  name:string
}