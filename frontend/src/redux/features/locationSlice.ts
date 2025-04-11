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
    }
  },
});

export const { setLocation } = locationSlice.actions;
export default locationSlice.reducer;
