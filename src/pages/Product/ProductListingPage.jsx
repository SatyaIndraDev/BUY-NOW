import React, { useState, useEffect } from 'react';
import './ProductListingPage.css';
import { FaSearch, FaHeart, FaStar, FaArrowUp, FaArrowDown } from 'react-icons/fa';

const brands = ['Nike', 'Adidas', 'Puma', 'Reebok', 'Under armour', 'New balance'];

function ProductListingPage() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [brandFilters, setBrandFilters] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [ratingFilter, setRatingFilter] = useState(null);
  const [sortBy, setSortBy] = useState('price');
  const [sortOrder, setSortOrder] = useState('asc');
  const [loading, setLoading] = useState(false);

  // Fetch products from API
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

      const url = `https://buy-now-be.onrender.com/products/products?${params.toString()}`;
      const response = await fetch(url);
      const data = await response.json();

      // Apply brand filter client-side
      const filteredByBrand = brandFilters.length > 0
        ? data.filter(product => brandFilters.includes(product.name))
        : data;

      setProducts(data);
      setFiltered(filteredByBrand);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch on filters change
  useEffect(() => {
    fetchProducts();
  }, [search, minPrice, maxPrice, ratingFilter, sortBy, sortOrder]);

  // Refetch when brandFilters change
  useEffect(() => {
    const result = brandFilters.length > 0
      ? products.filter(p => brandFilters.includes(p.name))
      : products;
    setFiltered(result);
  }, [brandFilters, products]);

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
          <div className="search-input">
            <FaSearch className="icon" />
            <input type="text" placeholder="Search for products, brands and more" value={search} onChange={e => setSearch(e.target.value)} />
          </div>

          <div className="sort-buttons">
            <button onClick={() => setSortBy('price')} className={sortBy === 'price' ? 'active' : ''}>Price</button>
            <button onClick={() => setSortBy('rating')} className={sortBy === 'rating' ? 'active' : ''}>Rating</button>
            <button onClick={() => setSortOrder(o => o === 'asc' ? 'desc' : 'asc')}>
              {sortOrder === 'asc' ? <FaArrowUp /> : <FaArrowDown />} {sortOrder === 'asc' ? 'Low to High' : 'High to Low'}
            </button>
          </div>
        </div>

        <div className="products-grid">
          {loading ? (
            <div className="loader">Loading...</div>
          ) : (
            filtered.map(p => (
              <div key={p._id} className="product-card">
                <div className="image-box">
                  <img src={p.image} alt={p.name} />
                  <div className="rating-badge" style={{ backgroundColor: p.rating >= 4.5 ? 'green' : 'purple' }}>{p.rating} ★</div>
                  <FaHeart className="wishlist-icon" />
                  <button className="add-to-bag">ADD TO BAG</button>
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
      </main>
    </div>
  );
}

export default ProductListingPage;
