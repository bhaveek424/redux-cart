import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import productReducer from './productSlice';
import filtersReducer from './filtersSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    product: productReducer,
    filters: filtersReducer,
  },
});

export default store;
