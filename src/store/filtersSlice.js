import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  gender: '',
  color: '',
  priceRange: '',
  type: '',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setGenderFilter(state, action) {
      state.gender = action.payload;
    },
    setColorFilter(state, action) {
      state.color = action.payload;
    },
    setPriceRangeFilter(state, action) {
      state.priceRange = action.payload;
    },
    setTypeFilter(state, action) {
      state.type = action.payload;
    },
  },
});

export const {
  setGenderFilter,
  setColorFilter,
  setPriceRangeFilter,
  setTypeFilter,
} = filtersSlice.actions;

export default filtersSlice.reducer;
