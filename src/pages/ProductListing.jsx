import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../services/fakestore';
import Rating from '../components/Rating';
import FilterComponent from '../components/FilterComponent';
import { Link } from 'react-router-dom';
import heroImage from '../assets/hero_image.webp';
import useWishlistStore from '../store/wishlistStore';
import useAuthStore from '../store/authStore'; 
import { enqueueSnackbar } from 'notistack';
import { ShimmerLoadingPage, ShimmerPlaceholder } from '../components/LoadingComponent'; // Import shimmer components

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingFilters, setLoadingFilters] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const productsPerPage = 8;

  const { addToWishlist, removeFromWishlist, wishlistItems } = useWishlistStore();
  const { isAuthenticated } = useAuthStore(); 

  const isInWishlist = (id) => {
    if (!isAuthenticated) {
      return false; 
    }
    return wishlistItems.some((item) => item.id === id);
  };

  const toggleWishlist = (product) => {
    if (!isAuthenticated) {
      enqueueSnackbar('You must be logged in to add to wishlist.', { variant: 'warning' });
      return;
    }

    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      enqueueSnackbar('Removed from wishlist', { variant: 'info' });
    } else {
      addToWishlist(product);
      enqueueSnackbar(`${product.title} added to wishlist!`, { variant: 'success' });
    }
  };

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
    const filtered = products.filter(
      (product) =>
        (!categories.length || categories.includes(product.category)) &&
        product.price >= range[0] &&
        product.price <= range[1]
    );
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
    return <ShimmerLoadingPage />; 
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="w-full mb-6 aspect-[16/9]">
  <img
    src={heroImage}
    alt="Hero"
    className="w-full h-full object-cover rounded-lg shadow-md"
  />
   </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/4">
          {loadingFilters ? (
            <ShimmerPlaceholder /> 
          ) : (
            <FilterComponent
              categories={categories}
              onFilterChange={handleFilterChange}
              onSortChange={handleSortChange}
              onPriceRangeChange={handlePriceChange}
            />
          )}
        </div>

        <div className="w-full md:w-3/4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {loadingProducts ? (
              Array.from({ length: 8 }).map((_, index) => <ShimmerPlaceholder key={index} />) 
            ) : (
              currentProducts.map((product) => (
                <div key={product.id} className="p-4 border rounded-lg shadow-sm hover:shadow-xl h-full relative">
                  <Link to={`/products/${product.id}`} key={product.id}>
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-48 object-contain mb-2"
                    />
                  
                  <h2 className="text-lg font-semibold truncate" title={product.title}>
                    {product.title.length > 80 ? product.title.slice(0, 80) + '...' : product.title}
                  </h2>
                  <p className="text-gray-700 font-semibold flex items-center">
                    ${Math.ceil(product.price)}
                    <span className="ml-10">
                      <Rating rating={product.rating.rate} />
                    </span>
                  </p>
                  </Link>
                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`absolute top-4 right-4 ${
                      isInWishlist(product.id)
                        ? ' text-red-700 '
                        : ' text-gray-600 '
                    }`}
                  >
                    {isInWishlist(product.id) ? <i class="fas fa-heart text-red-500 text-2xl hover:text-red-700"></i> : <i class="far fa-heart text-gray-500"></i>}
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="flex justify-center items-center mt-6 space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className={`px-4 py-2 border rounded ${currentPage === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-white text-black-500 hover:bg-amber-300'}`}
              disabled={currentPage === 1}
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 border rounded ${currentPage === index + 1 ? 'bg-amber-800 text-white' : 'bg-white text-black-500 hover:bg-amber-300'}`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className={`px-4 py-2 border rounded ${currentPage === totalPages ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-white text-black-500 hover:bg-amber-300'}`}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
