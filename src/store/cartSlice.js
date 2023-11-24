import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const { id } = action.payload;
      const existingItem = state.find((item) => item.id === id);

      if (existingItem) {
        // If the item is already in the cart, don't add a new one, just return the current state
        return state;
      } else {
        // Add the item to the cart with a default quantity of 1
        return [...state, { ...action.payload, quantity: 1 }];
      }
    },
    incrementQuantity(state, action) {
      const { id } = action.payload;
      const existingItem = state.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity += 1;
      }
    },
    decrementQuantity(state, action) {
      const { id } = action.payload;
      const existingItem = state.find((item) => item.id === id);

      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      } else if (existingItem && existingItem.quantity === 1) {
        // Remove the item from the cart if quantity becomes 0
        return state.filter((item) => item.id !== id);
      }
    },
    removeFromCart(state, action) {
      return state.filter((item) => item.id !== action.payload);
    },
  },
});

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} = cartSlice.actions;

export default cartSlice.reducer;
