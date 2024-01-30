import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "../features/basket/basketSlice";
import resturantReducer from "../features/restaurant/restaurantSlice";

export const store = configureStore({
  reducer: {
    basket: basketReducer,
    restaurant: resturantReducer,
  },
});
