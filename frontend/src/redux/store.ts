import { configureStore } from "@reduxjs/toolkit";
import LocationReducer from "./features/locationSlice";
import RestaurantReducer from "./features/restaurantSlice";

export const store = configureStore({
  reducer: {
    location: LocationReducer,
    restaurant: RestaurantReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
