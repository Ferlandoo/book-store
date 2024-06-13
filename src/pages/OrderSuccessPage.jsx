import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaCircleCheck } from "react-icons/fa6";

const OrderSuccessPage = () => {
  const cart = useSelector((state) => state.cart);

  return (
    <>
      <div className="container mx-auto px-4 py-10 sm:py-20 text-center min-h-[calc(100vh-170px)]">
        <div className="flex flex-col items-center justify-center">
          <FaCircleCheck className="text-green-500 text-8xl sm:text-9xl mb-6" />
          <h1 className="text-3xl sm:text-4xl font-bold mb-6">Order Placed Successfully!</h1>
          <div className="bg-white shadow-md rounded p-4 w-full max-w-lg text-left">
            <h2 className="text-2xl font-semibold mb-4 text-center">Order Details</h2>

            <p className="text-center">
              <strong>Shipping Address:</strong>
              {cart.shippingAddress.address},{cart.shippingAddress.city}{" "}
              {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
            </p>
          </div>
          <Link to="/" className="mt-6 bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded-lg">
            Go back to Home
          </Link>
        </div>
      </div>
    </>
  );
};

export default OrderSuccessPage;
