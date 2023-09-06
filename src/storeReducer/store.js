import { configureStore } from "@reduxjs/toolkit";
import fruitsReducer from "./FruitSliceReducer";
// import ordersReducer from "./OrderSlice";
const store = configureStore({
  reducer: {
    fruits: fruitsReducer,
    // orders: ordersReducer,
  },
});
export default store;
