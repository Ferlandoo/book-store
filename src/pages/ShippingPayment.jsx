import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveShippingAddress, savePaymentMethod, clearCartItems } from '../slices/cartSlices';

const ShippingPayment = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress?.address || '');
  const [city, setCity] = useState(shippingAddress?.city || '');
  const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || '');
  const [country, setCountry] = useState(shippingAddress?.country || '');

  const [paymentMethod, setPaymentMethod] = useState('CreditCart');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (paymentMethod === 'PaymentOnDelivery') {
      dispatch(clearCartItems());
      navigate(`/ordersuccess`);
    } else {
      dispatch(savePaymentMethod(paymentMethod));
      dispatch(saveShippingAddress({ address, city, postalCode, country }));
      navigate('/placeorder');
    }
  };

  return (
    <>
      <div className="max-w-4xl px-4 sm:px-0 mx-auto min-h-[calc(100vh-170px)]">
        <h1 className="text-2xl font-semibold pt-10">Shipping</h1>
        <form onSubmit={submitHandler} className="space-y-4 pb-10">
          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              placeholder="Enter address"
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">City</label>
            <input
              type="text"
              placeholder="Enter city"
              value={city}
              required
              onChange={(e) => setCity(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Postal Code</label>
            <input
              type="number"
              placeholder="Enter postal code"
              value={postalCode}
              required
              onChange={(e) => setPostalCode(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Country</label>
            <input
              type="text"
              placeholder="Enter country"
              value={country}
              required
              onChange={(e) => setCountry(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
            />
          </div>
          <h1 className="text-2xl font-semibold pt-6">Payment Method</h1>
          <span className="text-sm text-gray-500">Select a payment method</span>
          <div className="flex items-center">
            <input
              type="radio"
              name="paymentMethod"
              value="CreditCart"
              checked={paymentMethod === 'CreditCart'}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="h-4 w-4 text-red-600 border-gray-300 focus:ring-red-500"
            />
            <label className="ml-3 block text-sm font-medium text-gray-700">
              Credit Card
            </label>
          </div>
          <div className="flex items-center pb-4">
            <input
              type="radio"
              name="paymentMethod"
              value="PaymentOnDelivery"
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="h-4 w-4 text-red-600 border-gray-300 focus:ring-red-500"
            />
            <label className="ml-3 block text-sm font-medium text-gray-700">
              Payment on Delivery
            </label>
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:red-indigo-500"
          >
            {paymentMethod === 'CreditCart' ? 'Continue' : 'Place Order'}
          </button>
        </form>
      </div>
    </>
  );
};

export default ShippingPayment;
