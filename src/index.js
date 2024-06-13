import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import HomePage from './pages/HomePage';
import BookPage from './pages/BookPage';
import CartPage from './pages/CartPage';
import ShippingPayment from './pages/ShippingPayment';
import PlaceOrderPage from './pages/PlaceOrderPage';
import OrderSuccessPage from './pages/OrderSuccessPage';

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path='/' element={<HomePage />} />
      <Route path='/book/:id' element={<BookPage />} />
      <Route path='/cart' element={<CartPage />} />
      <Route path='/orderinfo' element={<ShippingPayment />} />
      <Route path='/placeorder' element={<PlaceOrderPage />} />
      <Route path='/ordersuccess' element={<OrderSuccessPage />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={routes} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
