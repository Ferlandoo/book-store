import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { clearCartItems } from "../slices/cartSlices";
import { FaCreditCard, FaCcVisa, FaCcMastercard } from "react-icons/fa6";

const PlaceOrderPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardType, setCardType] = useState('');

  useEffect(() => {
    if (!cart.shippingAddress.address || !cart.paymentMethod) {
      navigate('/orderinfo');
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const placeOrderHandler = async () => {
    try {
      if (!validateCardDetails()) {
        toast.error("Invalid card details. Please check and try again.");
        return;
      }
      dispatch(clearCartItems());
      navigate(`/ordersuccess`);
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
    }
  };

  const cardNumberHandler = (e) => {
    const number = e.target.value.replace(/\D/g, '');
    if (number.length <= 16) {
      setCardNumber(number);
      if (/^4[0-9]{12}(?:[0-9]{3})?$/.test(number)) {
        setCardType(<FaCcVisa />);
      } else if (/^5[1-5][0-9]{14}$/.test(number)) {
        setCardType(<FaCcMastercard />);
      } else {
        setCardType(<FaCreditCard />);
      }
    } else {
      toast.error("Card number must be 16 digits.");
    }
  };

  const validateCardDetails = () => {
    const cardNumberValid = /^\d{16}$/.test(cardNumber);
    const expiryDateValid = /^\d{2}\/\d{2}$/.test(expiryDate);
    const cvvValid = /^\d{3,4}$/.test(cvv);
    return cardNumberValid && expiryDateValid && cvvValid;
  };

  const handleExpiryDateChange = (e) => {
    let value = e.target.value;
    const currentYear = new Date().getFullYear() % 100;
    const maxYear = currentYear + 10;

    // Auto-insert slash after MM
    if (value.length === 2 && !value.includes('/')) {
      value += '/';
    }

    // Validate month
    if (value.length >= 2) {
      const month = parseInt(value.substring(0, 2), 10);
      if (isNaN(month) || month < 1 || month > 12) {
        toast.error("Invalid month. Please enter a valid month between 01 and 12.");
        return;
      }
    }

    // Validate year
    if (value.length === 5) {
      const year = parseInt(value.substring(3, 5), 10);
      if (isNaN(year) || year < currentYear || year > maxYear) {
        toast.error(`Invalid year. Please enter a valid year between ${currentYear} and ${maxYear}.`);
        return;
      }
    }

    // Restrict input length to MM/YY format
    if (value.length > 5) {
      return;
    }

    setExpiryDate(value);
  };

  const cvvHandler = (e) => {
    const cvvValue = e.target.value.replace(/\D/g, '');
    if (cvvValue.length <= 3) {
      setCvv(cvvValue);
    } else {
      toast.error("CVV must be not more than 3 digits.");
    }
  };


  return (
    <div className="container mx-auto px-4 py-6 min-h-[calc(100vh-170px)]">
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-2/3">
          <div className="bg-white shadow-md rounded p-4 mb-4">
            <h2 className="text-xl font-semibold mb-4">Shipping</h2>
            <p>
              <strong>Address:</strong> {cart.shippingAddress.address}, {cart.shippingAddress.city} {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
            </p>
          </div>
          <div className="bg-white shadow-md rounded p-4 mb-4">
            <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Card Number</label>
                <div className="relative mt-1 block w-full">
                  <input
                    type="text"
                    value={cardNumber}
                    placeholder="1234 5678 9012 3456"
                    onChange={cardNumberHandler}
                    className="w-full border border-gray-300 rounded-md shadow-sm py-2 pl-3 pr-20 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                    required
                  />
                  {cardType && (
                    <p className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl text-gray-600">
                      {cardType}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Expiry Date (MM/YY)</label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={expiryDate}
                  onChange={handleExpiryDateChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">CVV</label>
                <input
                  type="text"
                  value={cvv}
                  onChange={cvvHandler}
                  placeholder="123"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  required
                />
              </div>
            </form>
          </div>
          <div className="bg-white shadow-md rounded p-4">
            <h2 className="text-xl font-semibold mb-4">Order Items</h2>
            {cart.cartItems.length === 0 ? (
              <div>
                Your cart is empty. <Link to="/" className="text-red-500">Go back</Link>
              </div>
            ) : (
              <ul>
                {cart.cartItems.map((item, index) => (
                  <li key={index} className="mb-4">
                    <div className="flex">
                      <div className="w-16 h-16">
                        <img src={item.book_image} alt={item.title} className="w-full h-full object-cover rounded-md" />
                      </div>
                      <div className="ml-4 flex-1">
                        <Link to={`/book/${item.primary_isbn10}`} className="text-lg font-semibold">{item.title}</Link>
                        <p className="text-sm text-gray-500 italic">by {item.author}</p>
                        <p className="text-sm mt-2">{item.qty} x ${item.price} = ${item.qty * item.price}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="lg:w-1/3 lg:ml-4">
          <div className="bg-white shadow-md rounded p-4">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <ul>
              <li className="flex justify-between py-2">
                <span>Items</span>
                <span>${cart.itemsPrice}</span>
              </li>
              <li className="flex justify-between py-2">
                <span>Shipping</span>
                <span>${cart.shippingPrice}</span>
              </li>
              <li className="flex justify-between py-2 font-semibold">
                <span>Total</span>
                <span>${cart.totalPrice}</span>
              </li>
            </ul>
            <div className="mt-4">
              <button
                type="button"
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                disabled={cart.cartItems.length === 0}
                onClick={placeOrderHandler}>
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderPage;
