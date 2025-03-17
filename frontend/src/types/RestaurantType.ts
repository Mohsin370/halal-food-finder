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
  id: number,
  name:string
}

export type HalalStatus = {
  id:number,
  status:string
}

export type RestaurantType = {
  id:number,
  name:string
}