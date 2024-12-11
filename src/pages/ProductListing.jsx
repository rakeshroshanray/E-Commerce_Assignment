import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../services/fakestore';
import Rating from '../components/Rating';
import FilterComponent from '../components/FilterComponent';
import { Link } from 'react-router-dom';

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingFilters, setLoadingFilters] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const productsPerPage = 8;
  

  
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
        setFilteredProducts(data); 
        setLoadingProducts(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoadingProducts(false);
      }
    };

    fetchAllProducts();
  }, []);

  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
       
        const exampleCategories = ['electronics', 'jewelery', "men's clothing", "women's clothing"];
        setCategories(exampleCategories);
        setLoadingFilters(false);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setLoadingFilters(false);
      }
    };

    fetchCategories();
  }, []);

  
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleFilterChange = (selectedCategories) => {
    const filtered = selectedCategories.length
      ? products.filter((product) => selectedCategories.includes(product.category))
      : products;

    setFilteredProducts(filtered);
    setCurrentPage(1); 
  };

  const handlePriceChange = (range) => {
    setPriceRange(range);
console.log(range)
    const filtered = products.filter(
      (product) =>
        (!categories.length || categories.includes(product.category)) &&
        product.price >= range[0] &&
        product.price <= range[1]
    );
    console.log(filtered)
    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  
  const handleSortChange = (sortOption) => {
    const sorted = [...filteredProducts].sort((a, b) => {
      if (sortOption === 'asc') return a.price - b.price;
      if (sortOption === 'desc') return b.price - a.price;
      if (sortOption === 'ratingAsc') return a.rating.rate - b.rating.rate;
      if (sortOption === 'ratingDesc') return b.rating.rate - a.rating.rate;
      return 0;
    });

    setFilteredProducts(sorted);
    setCurrentPage(1); 
  };

  if (loadingProducts || loadingFilters) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="p-4 sm:p-8 flex flex-col md:flex-row gap-6">
  
  <div className="w-full md:w-1/4">
    <FilterComponent
      categories={categories}
      onFilterChange={handleFilterChange}
      onSortChange={handleSortChange}
      onPriceRangeChange={handlePriceChange}
    />
  </div>

  <div className="w-full md:w-3/4">
    <h1 className="text-2xl font-bold mb-4">Products</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {currentProducts.map((product) => (
        <Link to={`/products/${product.id}`} >
        <div key={product.id} className="p-4 border rounded-lg shadow-sm hover:shadow-xl">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-48 object-contain mb-2"
          />
          <h2 className="text-lg font-semibold">{product.title}</h2>
          <p className="text-gray-700 font-semibold flex items-center">
            ${product.price}
            <span className="ml-2">
              <Rating rating={product.rating.rate} />
            </span>
          </p>
        </div>
        </Link>
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
</div>
  );
};

export default ProductListing;