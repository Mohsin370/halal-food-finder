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
  address:"",
  halalStatus:{
    id:0,
    status:"",
    description:""
  },
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
