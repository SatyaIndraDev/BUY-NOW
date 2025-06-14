import React, { useState, useEffect, useMemo, useRef } from 'react';
import './ProductListingPage.css';
import { FaSearch, FaHeart, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { Loader2 } from 'lucide-react';
import { Wrap } from '@chakra-ui/react';

// import { Loader2 } from "lucide-react";
// import { useEffect, useRef } from "react";

export function LoaderComponent() {
  const loaderRef = useRef(null);

  useEffect(() => {
    let angle = 0;
    const interval = setInterval(() => {
      if (loaderRef.current) {
        angle = (angle + 6) % 360; // 6 deg per 16ms ~ 1s per full spin
        loaderRef.current.style.transform = `rotate(${angle}deg)`;
      }
    }, 16); // ~60fps
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)", // Center the loader
        zIndex: 9999,
        backgroundColor: "#ffffffcc", // Optional: light overlay
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      <Loader2
        ref={loaderRef}
        style={{
          width: "64px",
          height: "64px",
          color: "#e91e63", // Myntra pink
        }}
      />
    </div>
  );
}




const brands = ['Nike', 'Adidas', 'Puma', 'Reebok', 'Under armour', 'New balance'];

// In-memory cache object
const productCache = {};

function ProductListingPage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [brandFilters, setBrandFilters] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [ratingFilter, setRatingFilter] = useState(null);
  const [sortBy, setSortBy] = useState('price');
  const [sortOrder, setSortOrder] = useState('asc');
  const [loading, setLoading] = useState(false);

  // Cart with localStorage persistence
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('cartItems');
    return saved ? JSON.parse(saved) : [];
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (ratingFilter) params.append('rating', ratingFilter);
      if (minPrice) params.append('priceMin', minPrice);
      if (maxPrice) params.append('priceMax', maxPrice);
      if (sortBy) params.append('sortField', sortBy);
      if (sortOrder) params.append('sortOrder', sortOrder);

      const queryString = params.toString();

      if (productCache[queryString]) {
        setProducts(productCache[queryString]);
        return;
      }

      const url = `https://buy-now-be.onrender.com/products/products?${queryString}`;
      const response = await fetch(url);
      const data = await response.json();

      productCache[queryString] = data;
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [search, minPrice, maxPrice, ratingFilter, sortBy, sortOrder]);

  const filtered = useMemo(() => {
    let result = [...products];
    if (brandFilters.length > 0) {
      result = result.filter(product => brandFilters.includes(product.name));
    }
    return result;
  }, [products, brandFilters]);

  // Paginate filtered products
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filtered.slice(start, start + itemsPerPage);
  }, [filtered, currentPage]);

  const toggleBrand = (brand) => {
    setBrandFilters(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const clearFilters = () => {
    setSearch('');
    setMinPrice('');
    setMaxPrice('');
    setRatingFilter(null);
    setBrandFilters([]);
  };

  const addToCart = (selectedProduct) => {
    setCartItems(prev => {
      const exists = prev.find(item => item._id === selectedProduct._id);
      if (exists) {
        alert('Product already in cart!');
        return prev;
      }
      const updatedCart = [...prev, { ...selectedProduct, quantity: 1 }];
      localStorage.setItem('cart2', JSON.stringify(updatedCart));
      alert('Product added to cart!');
      return updatedCart;
    });
  };

  // if(loading)
  // {
  //   return (
  //     <LoaderComponent />
  //   )
  // }

  return (
    <div className="product-page">
      <aside className="sidebar">
        <div className="filter-header">
          FILTERS
          <span onClick={clearFilters}>CLEAR ALL</span>
        </div>

        <div className="filter-section">
          <h4>BRAND</h4>
          {brands.map(brand => (
            <label key={brand}>
              <input
                type="checkbox"
                checked={brandFilters.includes(brand)}
                onChange={() => toggleBrand(brand)}
              /> {brand}
            </label>
          ))}
        </div>

        <div className="filter-section">
          <h4>PRICE</h4>
          <input type="text" placeholder="Min" value={minPrice} onChange={e => setMinPrice(e.target.value)} />
          <input type="text" placeholder="Max" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} />
          <label><input type="checkbox" onChange={() => { setMinPrice('0'); setMaxPrice('1000'); }} /> Under ₹1000</label>
          <label><input type="checkbox" onChange={() => { setMinPrice('1000'); setMaxPrice('1500'); }} /> ₹1000 - ₹1500</label>
          <label><input type="checkbox" onChange={() => { setMinPrice('1500'); setMaxPrice('2000'); }} /> ₹1500 - ₹2000</label>
        </div>

        <div className="filter-section">
          <h4>CUSTOMER RATINGS</h4>
          <label><input type="radio" name="rating" onChange={() => setRatingFilter(4)} /> 4★ & above</label>
          <label><input type="radio" name="rating" onChange={() => setRatingFilter(3)} /> 3★ & above</label>
        </div>
      </aside>

      <main className="main-content">
        <div className="topbar">
          {/* Left: Search Bar */}
          <div className="search-container">
            <FaSearch className="icon" />
            <input
              type="text"
              placeholder="Search for products, brands and more"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          {/* Middle: Sort Buttons */}
          <div className="sort-group">
            <button onClick={() => setSortBy('price')} className={sortBy === 'price' ? 'active' : ''}>
              Price
            </button>
            <button onClick={() => setSortBy('rating')} className={sortBy === 'rating' ? 'active' : ''}>
              Rating
            </button>
            <button onClick={() => setSortOrder(o => o === 'asc' ? 'desc' : 'asc')} className="sort-toggle">
              {sortOrder === 'asc' ? <FaArrowUp /> : <FaArrowDown />}
              <span>{sortOrder === 'asc' ? 'Low to High' : 'High to Low'}</span>
            </button>
          </div>
        </div>


        <div className="products-grid">
          {loading ? (
            <LoaderComponent />
          ) : paginatedProducts.length === 0 ? (
            <div className="no-products-message">
              <p style={{ fontSize: "18px", color: "#555", textAlign: "center", padding: "40px" }}>
                No products available.
              </p>
            </div>
          )
            : (
              paginatedProducts.map(p => (
                <div key={p._id} className="product-card">
                  <div className="image-box">
                    <img src={p.image} alt={p.name} />
                    <div className="rating-badge" style={{ backgroundColor: p.rating >= 4.5 ? 'green' : 'purple' }}>{p.rating} ★</div>
                    <FaHeart className="wishlist-icon" />
                    <button className="add-to-bag" onClick={() => addToCart(p)}>ADD TO BAG</button>
                  </div>
                  <div className="info">
                    <h5>{p.name}</h5>
                    <p>{p.desc}</p>
                    <div className="price">₹{p.price} <span className="strike">₹{p.originalPrice}</span> <span className="discount">({p.discount}% OFF)</span></div>
                  </div>
                </div>
              ))
            )}
        </div>

        {/* Pagination Controls */}
        {/* Pagination Controls */}
        {!loading && paginatedProducts.length > 0 && (
          <div className="pagination">
            <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}>&lt;</button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                className={currentPage === page ? 'active' : ''}
                onClick={() => {
                  setCurrentPage(page);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                {page}
              </button>
            ))}
            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)}>&gt;</button>
          </div>
        )}

      </main>
    </div>
  );
}

export default ProductListingPage;
