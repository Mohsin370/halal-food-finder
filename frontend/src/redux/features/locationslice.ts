import { createSlice } from "@reduxjs/toolkit";

const initialLocationState = "";

const locationSlice = createSlice({
  name: "location",
  initialState: initialLocationState,
  reducers: {
    setAddress: (state, action) => {
      return (state = action.payload);
    },
  },
});

export const { setAddress } = locationSlice.actions;
