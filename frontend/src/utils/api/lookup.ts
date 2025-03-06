const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

type RestaurantType = {
    Id: string,
    Name: string
}

type HalalStatus = {
    Id: string,
    Status: string
}

type CuisineType = {
    Id: string,
    Name: string
}

export type LookUpType = {
    RestaurantType: RestaurantType[],
    HalalStatus: HalalStatus[],
    CuisineType: CuisineType[]
}

export const getRestaurntlookUps = async ():Promise<LookUpType> => {
  const response = await fetch(`${BASE_URL}/restaurants/lookup`);
  if (!response.ok) throw new Error(`Failed to fetch lookup data`);

  return response.json();
};
