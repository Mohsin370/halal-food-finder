const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

type RestaurantType = {
    id: string,
    name: string
}

type HalalStatus = {
    id: string,
    status: string
}

type CuisineType = {
    id: string,
    name: string
}

export type LookUpType = {
    restaurantType: RestaurantType[],
    halalStatus: HalalStatus[],
    cuisineType: CuisineType[]
}

export const getRestaurantlookUps = async ():Promise<LookUpType> => {
  const response = await fetch(`${BASE_URL}/restaurants/lookup`);
  if (!response.ok) throw new Error(`Failed to fetch lookup data`);

  return response.json();
};
