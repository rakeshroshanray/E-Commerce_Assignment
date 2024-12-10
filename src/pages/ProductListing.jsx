import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../services/fakestore';
import Rating from '../components/Rating';

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8; 

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(products.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };
  if (loading) {
    return <div className="text-center mt-10">Loading products...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentProducts.map((product) => (
          <div key={product.id} className="p-4 border rounded-lg shadow-sm hover:shadow-xl">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-48 object-contain mb-2"
            />
            <h2 className="text-lg font-semibold">{product.title}</h2>
            <p className="text-gray-700 font-semibold flex item-center">${product.price} <span className="ml-24">
    <Rating rating={product.rating.rate} />
  </span></p>
            
          </div>
        ))}
      </div>

       <div className="flex justify-center items-center mt-6 space-x-2">
      
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className={`px-4 py-2 border rounded ${
            currentPage === 1
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-white text-blue-500 hover:bg-blue-100'
          }`}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 border rounded ${
              currentPage === index + 1
                ? 'bg-blue-500 text-white'
                : 'bg-white text-blue-500 hover:bg-blue-100'
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className={`px-4 py-2 border rounded ${
            currentPage === totalPages
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-white text-blue-500 hover:bg-blue-100'
          }`}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductListing;
