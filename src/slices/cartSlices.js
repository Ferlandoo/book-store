import { createSlice } from '@reduxjs/toolkit';
import { updateCart } from '../utils/cartUtils';

const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : { cartItems: [], shippingAddress: {}, paymentMethod: 'CreditCard' };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.primary_isbn10 === item.primary_isbn10);

      if (existItem) {
        const newQty = existItem.qty + item.qty;
        if (newQty <= 0) {
          state.cartItems = state.cartItems.filter((x) => x.primary_isbn10 !== item.primary_isbn10);
        } else {
          state.cartItems = state.cartItems.map((x) =>
            x.primary_isbn10 === existItem.primary_isbn10 ? { ...x, qty: newQty } : x
          );
        }
      } else {
        state.cartItems.push(item);
      }
      updateCart(state);
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x.primary_isbn10 !== action.payload);
      updateCart(state);
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      updateCart(state);
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      updateCart(state);
    },
    clearCartItems: (state) => {
      state.cartItems = [];
      updateCart(state);
    }
  },
});

export const {
  addToCart,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
  clearCartItems
} = cartSlice.actions;

export default cartSlice.reducer;
