import React from 'react';
import './ProductListSkeleton.css';

const ProductListSkeleton = () => {
  return (
    <div className="skeleton-wrapper">
      {[...Array(10)].map((_, index) => (
        <div key={index} className="skeleton-card" style={{width:"250px", height:"250px ", marginTop:"140px" }}>
          <div className="skeleton-image"></div>
          <div className="skeleton-text skeleton-title"></div>
          <div className="skeleton-text skeleton-subtitle"></div>
        </div>
      ))}
    </div>
  );
};

export default ProductListSkeleton;
