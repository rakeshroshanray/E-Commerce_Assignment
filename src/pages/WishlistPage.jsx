import React, { useEffect } from "react";
import useWishlistStore from "../store/wishlistStore";
import { HeartIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const WishlistPage = () => {
  const { wishlistItems, removeFromWishlist, resetWishlist } = useWishlistStore();
  useEffect(() => {
    const user = localStorage.getItem("user"); 
    if (!user) {
      resetWishlist(); 
    }
  }, [resetWishlist]); 

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Wish List</h1>

      <div className="text-center mb-8">
        <Link
          to="/"
          className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
        >
          Shop All
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {wishlistItems.length === 0 ? (
          <p className="text-center text-gray-600 col-span-full">
            Your wishlist is empty!
          </p>
        ) : (
          wishlistItems.map((item) => (
           
              <div className=" p-4 rounded-lg shadow-sm hover:shadow-xl border">
                 <Link to={`/products/${item.id}`} key={item.id}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-contain mb-4"
                />
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-sm-bold text-black-600 mb-4">${Math.ceil(item.price)}</p>
                </Link>
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <HeartIcon className="w-6 h-6" />
                </button>
              </div>
            
          ))
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
