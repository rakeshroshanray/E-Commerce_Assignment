import React from "react";
import useCartStore from "../store/cartStore";
import { TrashIcon } from "@heroicons/react/24/outline";  
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const { items, totalAmount, updateQuantity, removeItem } = useCartStore();
  const handleQuantityChange = (id, quantity) => {
    if (quantity > 0) {
      updateQuantity(id, quantity);
    }
  };
  const navigate = useNavigate();

  const truncateProductName = (name) => {
    return name.length > 30 ? name.slice(0, 30) + "..." : name;
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      {items.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty!</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          <div className="col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-center sm:items-start justify-between bg-gray-50 p-4 rounded-lg shadow-sm border space-y-4 sm:space-y-0"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-contain"
                />

                <div className="flex-1 sm:px-4 text-center sm:text-left">
                  <h3 className="text-sm sm:text-lg font-semibold">{item.name}</h3>
                  <p className="text-xs sm:text-sm text-gray-600">Size: {item.size}</p>
                  <div className="text-xs sm:text-sm text-gray-600">Cost: ${Math.ceil(item.price)}</div>
                  <p className="text-xs sm:text-sm text-gray-600">by Vendor Name</p>
                </div>

                <div className="flex items-center justify-center sm:justify-start space-x-2">
                  <button
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity - 1)
                    }
                    className="px-2 py-1 border rounded bg-gray-200 text-sm"
                  >
                    −
                  </button>
                  <span className="px-3">{item.quantity}</span>
                  <button
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity + 1)
                    }
                    className="px-2 py-1 border rounded bg-gray-200 text-sm"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:text-red-700 mt-2 sm:mt-0"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            ))}

            <p className="text-sm text-gray-600 text-center sm:text-left">
              Not ready to checkout?{" "}
              <button
                className="text-blue-500 hover:underline"
                onClick={() => navigate('/')}
              >
                Continue Shopping
              </button>
            </p>
          </div>

          <div className="bg-gray-100 p-4 md:p-6 rounded-lg shadow-md border">
            <h2 className="text-lg font-bold mb-4">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Total Items</span>
                <span className="text-sm">
                  {items.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              </div>

              {items.map((item) => {
                const itemSubtotal = Math.ceil(item.price * item.quantity);
                return (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{truncateProductName(item.name)}</span>
                    <span>${itemSubtotal}</span>
                  </div>
                );
              })}

              <div className="flex justify-between font-semibold">
                <span>Subtotal</span>
                <span>${Math.ceil(totalAmount)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-sm">Shipping</span>
                <span className="text-sm">Calculated at the next step</span>
              </div>

              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>${Math.ceil(totalAmount)}</span>
              </div>
            </div>

            <div className="my-4">
              <input
                type="text"
                placeholder="Enter coupon code here"
                className="w-full p-2 border rounded text-sm"
              />
            </div>

            <button className="w-full bg-black text-white py-3 rounded-lg mt-4 hover:bg-gray-800 text-sm">
              Continue to checkout
            </button>
          </div>
        </div>
      )}

      <div className="mt-8 bg-gray-50 p-4 md:p-6 rounded-lg shadow-sm border">
        <h3 className="text-sm sm:text-lg font-semibold mb-4">Order Information</h3>
        <p className="text-xs sm:text-sm text-gray-600">
          This is our example return policy which is everything you need to
          know about our returns.
        </p>
      </div>
    </div>
  );
};

export default CartPage;
