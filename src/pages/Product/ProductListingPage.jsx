import React, { useState, useEffect, useMemo } from 'react';
import './ProductListingPage.css';
import { FaSearch, FaHeart, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { Loader2 } from 'lucide-react';

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
      return prev; // no update
    }

    const updatedCart = [...prev, { ...selectedProduct, quantity: 1 }];
    localStorage.setItem('cart2', JSON.stringify(updatedCart));
    alert('Product added to cart!');
    return updatedCart;
  });
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

          <div className="cart-status">
            🛒 Cart Items: {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
          </div>
        </div>

        <div className="products-grid">
          {loading ? (
            <div className="loader">
              <Loader2 className="animate-spin h-6 w-6 text-gray-500" />
            </div>
          ) : (
            filtered.map(p => (
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
      </main>
    </div>
  );
}

export default ProductListingPage;
