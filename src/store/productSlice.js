import { createSlice } from '@reduxjs/toolkit';
import { catalogue } from '../data/catalogue';

const initialState = {
  data: catalogue,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts(state, action) {
      state.data = action.payload;
    },
  },
});

export const { setProducts } = productSlice.actions;

export default productSlice.reducer;
