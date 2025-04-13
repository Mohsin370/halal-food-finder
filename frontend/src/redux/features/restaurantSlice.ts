import { createSlice } from "@reduxjs/toolkit";

const initialRestaurantState = {
  id: 0,
  description: "",
  name: "",
  image: "",
  placeId: "",
  cuisineType: 0,
  restaurantType: 0,
};

const restaurantSlice = createSlice({
  name: "restaurant",
  initialState: initialRestaurantState,
  reducers: {
    setSelected: (state, action) => {
      return (state = action.payload);
    },
  },
});

export const { setSelected } = restaurantSlice.actions;
export default restaurantSlice.reducer;
