// utils/api/restaurants.ts

import { IRestaurants } from "@/interface/IRestaurants";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const fetchRestaurants = async () => {
  try {
    const response = await fetch(`${BASE_URL}/Restaurants`, { cache: "no-store" });
    if (!response.ok) throw new Error("Failed to fetch restaurants");
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
    headers:{
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response;
};
