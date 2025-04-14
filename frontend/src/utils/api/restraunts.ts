// utils/api/restaurants.ts

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const fetchRcentRestaurants = async () => {
  try {
    const response = await fetch(`${BASE_URL}/Restaurants/recent`);
    if (!response.ok) throw new Error("Failed to fetch recent restaurants listing");
    return response.json();
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const fetchFeaturedRestaurants = async () => {
  try {
    const response = await fetch(`${BASE_URL}/Restaurants/featured`);
    if (!response.ok) throw new Error("Failed to fetch  featured restaurants listing");
    return response.json();
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const fetchRestaurantsListing = async (cuisineType?: number, latitude?: string, longitude?: string): Promise<Restaurant[]> => {
  try {
    const params = new URLSearchParams();
    if (cuisineType) params.append("cuisineType", cuisineType.toString());
    if(latitude && longitude){
      params.append("lat",latitude);
      params.append("lng",longitude);
    }
    let query = params.toString();
    const response = await fetch(`${BASE_URL}/Restaurants/listing?${query}`);
    if (!response.ok) {
      return [];
    }
    if (!response.ok) throw new Error("Failed to fetch restaurants listing");
    return response.json();
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const fetchRestaurantMapPins = async () => {
  try {
    const response = await fetch(`${BASE_URL}/Restaurants/mapPin`);
    if (!response.ok) throw new Error("Failed to fetch restaurants Pins");
    return response.json();
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const fetchRestaurantById = async (id: number) => {
  const response = await fetch(`${BASE_URL}/restaurants/${id}`);
  if (!response.ok) throw new Error(`Failed to fetch restaurant with id: ${id}`);
  return response.json();
};

export const addRestaurant = async (data: any) => {
  const response = await fetch(`${BASE_URL}/Restaurants/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response;
};

export const deleteRestaurantById = async (id: number) => {
  const response = await fetch(`${BASE_URL}/Restaurants/${id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    return response.json();
  }
};
