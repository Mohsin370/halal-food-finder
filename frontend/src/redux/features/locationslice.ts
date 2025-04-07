import { createSlice } from "@reduxjs/toolkit";

const initialLocationState = {
  latitude: "",
  longitude: "",
};

const locationSlice = createSlice({
  name: "location",
  initialState: initialLocationState,
  reducers: {
    setLocation: (state, action) => {
      return (state = action.payload);
    },
    getLocation: (state) => {
      return state;
    },
  },
});

export const { setLocation, getLocation } = locationSlice.actions;
export default locationSlice.reducer;
