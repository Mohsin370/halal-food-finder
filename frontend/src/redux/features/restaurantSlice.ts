import { createSlice } from "@reduxjs/toolkit";

const initialRestaurantState = {
  name: "",
  image: "",
};

const restaurantSlice = createSlice({
  name: "restaurant",
  initialState: initialRestaurantState,
  reducers: {
    setSelected: (state, action) => {
      return (state = action.payload);
    }
  },
});

export const { setSelected } = restaurantSlice.actions;
export default restaurantSlice.reducer;
