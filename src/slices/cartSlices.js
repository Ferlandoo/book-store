import { createSlice } from '@reduxjs/toolkit';
import { updateCart } from '../utils/cartUtils';

const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : { cartItems: [], shippingAdress: {}, paymentMethod: 'CreditCart' };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.primary_isbn10 === item.primary_isbn10);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) => (x.primary_isbn10 === existItem.primary_isbn10 ? { ...item, qty: x.qty + item.qty } : x));
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      return updateCart(state);
    },
    removeFromCart(state, action) {
      state.cartItems = state.cartItems.filter((x) => x.primary_isbn10 !== action.payload);

      return updateCart(state);
    },
    saveShippingAddress(state, action) {
      state.shippingAddress = action.payload;

      return updateCart(state);
    },
    savePaymentMethod(state, action) {
      state.paymentMethod = action.payload;
      return updateCart(state);
    },
    clearCartItems(state) {
      state.cartItems = [];
      return updateCart(state);
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
