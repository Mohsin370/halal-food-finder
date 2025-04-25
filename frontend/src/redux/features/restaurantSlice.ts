import { createSlice } from "@reduxjs/toolkit";

const initialRestaurantState = {
  id: 0,
  description: "",
  name: "",
  image: "",
  placeId: "",
  rating: 0,
  useRatingCount: 0,
  cuisineType: "",
  restaurantType: "",
  address: "",
  halalStatus: {
    id: 0,
    status: "",
    description: "",
  },
  reviews: [
    {
      date: new Date(),
      description: "",
      id: "",
      rating: 0,
      reviewerName: "",
    },
  ],
  lat: "",
  lng: "",
};

const restaurantSlice = createSlice({
  name: "restaurant",
  initialState: initialRestaurantState,
  reducers: {

  },
});

export const {  } = restaurantSlice.actions;
export default restaurantSlice.reducer;
