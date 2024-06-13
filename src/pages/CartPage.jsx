import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaTrash } from 'react-icons/fa';
import { addToCart, removeFromCart } from '../slices/cartSlices';

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = (item, qty) => {
    dispatch(addToCart({ ...item, qty }));
  };

  const removeFromCartHandler = (isbn) => {
    dispatch(removeFromCart(isbn));
  };

  const checkoutHandler = () => {
    navigate('/orderinfo');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 min-h-[calc(100vh-125px)] sm:min-h-[calc(100vh-170px)]">
      <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <div>
          Your cart is empty. <Link to="/" className="text-blue-500">Go back</Link>
        </div>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.primary_isbn10} className="flex items-center justify-between p-4 mb-4 border-b border-gray-200">
              <div className="flex items-center">
                <img src={item.book_image} alt={item.title} className="w-16 h-16 object-cover mr-4" />
                <Link to={`/book/${item.primary_isbn10}`} className="text-lg font-semibold hover:underline">
                  <div className="flex flex-col">
                    <span className='text-red-500 text-sm sm:text-base'>{item.title}</span>
                    <span className="text-gray-500 text-xs py-1 italic">by {item.author}</span>
                    <span className="font-bold text-xs italic">Price: ${item.price}</span>
                  </div>
                </Link>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => removeFromCartHandler(item.primary_isbn10)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
                <div className="flex items-center">
                  <button
                    onClick={() => addToCartHandler(item, -1)}
                    className="text-white bg-red-500 rounded px-2 hover:bg-red-600 font-bold"
                  >
                    -
                  </button>
                  <span className="mx-2">{item.qty}</span>
                  <button
                    onClick={() => addToCartHandler(item, 1)}
                    className="text-white bg-red-500 rounded px-2 hover:bg-red-600 font-bold"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className="mt-8 p-4 border-t border-gray-200 text-right">
            <h3 className="text-xl font-semibold">
              Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items: ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
            </h3>
            <button
              onClick={checkoutHandler}
              disabled={cartItems.length === 0}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
