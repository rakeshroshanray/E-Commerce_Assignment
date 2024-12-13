import React, { useState } from 'react';

const FilterComponent = ({ categories, onFilterChange, onSortChange, onPriceRangeChange }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortOption, setSortOption] = useState('asc');
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const handleCategoryChange = (category) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((cat) => cat !== category)
      : [...selectedCategories, category];

    setSelectedCategories(updatedCategories);
    onFilterChange(updatedCategories); 
  };


  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    onSortChange(e.target.value);
  };

  const handlePriceChange = (e) => {
    const value = parseFloat(e.target.value);
    const range = [...priceRange];
    if (e.target.name === 'min') range[0] = value;
    if (e.target.name === 'max') range[1] = value;

    setPriceRange(range);
    onPriceRangeChange(range);
  };

  return (
    <div className="p-4 border rounded shadow-sm bg-gray-200">
      <h2 className="text-xl font-bold mb-4">Filters</h2>

      <div className="mb-4">
        <h3 className="text-lg font-semibold">Categories</h3>
        {categories.map((category) => (
          <div key={category} className="flex items-center mb-2">
            <input
              type="checkbox"
              id={category}
              value={category}
              checked={selectedCategories.includes(category)}
              onChange={() => handleCategoryChange(category)}
              className="mr-2"
            />
            <label htmlFor={category} className="text-gray-700">
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </label>
          </div>
        ))}
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold">Sort By</h3>
        <select
          value={sortOption}
          onChange={handleSortChange}
          className="p-2 border rounded w-full"
        >
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
          <option value="ratingAsc">Rating: Low to High</option>
          <option value="ratingDesc">Rating: High to Low</option>
        </select>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold mb-2">Price Range</h3>
        <div className="flex items-center space-x-2">
          <input
            type="number"
            name="min"
            value={priceRange[0]}
            onChange={handlePriceChange}
            className="border rounded p-1 w-16"
            placeholder="Min"
          />
          <span>to</span>
          <input
            type="number"
            name="max"
            value={priceRange[1]}
            onChange={handlePriceChange}
            className="border rounded p-1 w-16"
            placeholder="Max"
          />
        </div>
      </div>
    </div>
  );
};

export default FilterComponent;
