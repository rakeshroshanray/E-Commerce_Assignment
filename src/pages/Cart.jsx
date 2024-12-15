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
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {items.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         
          <div className="col-span-2 space-y-6">
            <p className="text-sm text-gray-600">
              Not ready to checkout?{" "}
              <button className="text-blue-500 hover:underline"
              onClick={() =>navigate('/')}>
                Continue Shopping
              </button>
            </p>
            {items.map((item) => {
              
              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm border"
                >
              
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-contain"
                  />

                  <div className="flex-1 px-4">
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-600">Size: {item.size}</p>
                    <div className="text-sm  text-gray-600"> Cost :${ Math.ceil(item.price)}</div>
                    <p className="text-sm text-gray-600">by Vendor Name</p>
                  </div>

                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity - 1)
                      }
                      className="px-3 py-1 border rounded bg-gray-200"
                    >
                      −
                    </button>
                    <span className="px-4">{item.quantity}</span>
                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity + 1)
                      }
                      className="px-3 py-1 border rounded bg-gray-200"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-700 ml-4"
                  >
                    <TrashIcon className="w-6 h-6" />
                  </button>

                </div>
              );
            })}
          </div>

          <div className="bg-gray-100 p-6 rounded-lg shadow-md border">
            <h2 className="text-lg font-bold mb-4">Order Summary</h2>
            <div className="space-y-4">
             
              <div className="flex justify-between">
                <span className="text-sm">Total Items</span>
                <span className="text-sm">
                  {items.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              </div>

              {items.map((item) => {
                const itemSubtotal =  Math.ceil(item.price * item.quantity);
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
                className="w-full p-2 border rounded"
              />
            </div>

            <button className="w-full bg-black text-white py-3 rounded-lg mt-6 hover:bg-gray-800">
              Continue to checkout
            </button>
          </div>
        </div>
      )}

      <div className="mt-8 bg-gray-50 p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Order Information</h3>
        <p className="text-sm text-gray-600">
          This is our example return policy which is everything you need to
          know about our returns.
        </p>
      </div>
    </div>
  );
};

export default CartPage;
