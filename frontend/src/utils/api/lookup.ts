import { CuisineType, HalalStatus } from "../../types/RestaurantType";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;



export type LookUpType = {
  restaurantType: RestaurantType[];
  halalStatus: HalalStatus[];
  cuisineType: CuisineType[];
};

export const getRestaurantlookUps = async (): Promise<LookUpType> => {
  try {
    const response = await fetch(`${BASE_URL}/restaurants/lookup`);
    if (!response.ok) throw new Error(`Failed to fetch lookup data`);
    return response.json();
  } catch (Ex) {
    console.log("Server not connected")
    return new Promise<LookUpType>((a) => {});
  }
};
