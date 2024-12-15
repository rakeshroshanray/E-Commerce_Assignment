import React from 'react';
const ShimmerLoadingPage = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-200">
      <div className="w-full h-full bg-shimmer animate-shimmer"></div>
    </div>
  );
};

const ShimmerPlaceholder = () => (
  <div className="p-4 w-full bg-shimmer animate-shimmer rounded-lg mb-4 h-48"></div> // Placeholder card
);

export { ShimmerLoadingPage, ShimmerPlaceholder };
