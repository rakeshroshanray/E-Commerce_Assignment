import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../services/fakestore";
import useCartStore from "../store/cartStore";
import useWishlistStore from "../store/wishlistStore";
import { useSnackbar } from "notistack";

const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");

  const { items: cart, addItem } = useCartStore();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (err) {
        setError("Failed to fetch product details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [id]);

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    if (!product) {
      enqueueSnackbar("Product details are not available.", { variant: "error" });
      return;
    }

    const isProductInCart = cart.find(
      (item) => item.id === product.id && item.size === selectedSize
    );
    if (isProductInCart) {
      enqueueSnackbar("Product is already in the cart!", { variant: "warning" });
      return;
    }

    addItem({
      id: product.id,
      name: product.title,
      price: product.price,
      quantity: quantity,
      size: selectedSize,
      image: product.image,
    });

    enqueueSnackbar("Product added to the cart!", { variant: "success" });
  };

  const handleWishlistToggle = () => {
    const inWishlist = isInWishlist(product.id);

    if (inWishlist) {
      removeFromWishlist(product.id);
      enqueueSnackbar("Product removed from the wishlist!", { variant: "warning" });
    } else {
      addToWishlist({
        id: product.id,
        name: product.title,
        price: product.price,
        image: product.image,
      });
      enqueueSnackbar("Product added to the wishlist!", { variant: "success" });
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const inWishlist = isInWishlist(product?.id);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Single Product View</h1>
      <div className="flex flex-col md:flex-row gap-8 bg-gray-100 p-6 rounded-lg shadow">
        <div className="flex-1">
          <div className="bg-gray-300 rounded-lg h-96 flex justify-center items-center">
            <img
              src={product.image}
              alt={product.title}
              className="object-contain max-h-full"
            />
          </div>
        </div>

        <div className="flex-1">
          <h2 className="text-2xl font-semibold">{product.title}</h2>
          <p className="text-gray-500 text-sm my-2">by Vendor Name</p>
          <p className="text-xl font-bold text-green-600 my-2">${product.price}</p>
          <p className="text-gray-700 my-4">{product.description}</p>

          <div className="my-4">
            <label className="block mb-2 font-semibold">Size</label>
            <div className="flex gap-4">
              {["S", "M", "L"].map((size) => (
                <button
                  key={size}
                  className={`px-4 py-2 border rounded ${
                    selectedSize === size
                      ? "bg-black text-white"
                      : "bg-white text-black"
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="my-4 flex items-center">
            <label className="font-semibold mr-4">Quantity</label>
            <button
              onClick={decreaseQuantity}
              className="px-3 py-1 border rounded bg-gray-200"
            >
              −
            </button>
            <span className="px-4">{quantity}</span>
            <button
              onClick={increaseQuantity}
              className="px-3 py-1 border rounded bg-gray-200"
            >
              +
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full bg-black text-white py-3 rounded my-4"
          >
            Add to Cart - ${product.price * quantity}
          </button>

          <button
            onClick={handleWishlistToggle}
            className={`w-full py-3 rounded my-2 ${
              inWishlist ? "bg-red-600 text-white" : "bg-gray-200 text-black"
            }`}
          >
            {inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
          </button>

          <p className="text-sm text-gray-600">
            Free standard shipping |{" "}
            <span className="underline text-gray-800">Free Returns</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
