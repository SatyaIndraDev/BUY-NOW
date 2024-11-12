import React from 'react';
import './ProductItem.css';

const ProductItem = ({ product }) => {
  const addToCart = (selectedProduct) => {
    // Create a copy of the selected product to ensure immutability
    const productToAdd = { ...selectedProduct };

    // Retrieve cart from localStorage or initialize as an empty array
    let cart = JSON.parse(localStorage.getItem('cart2')) || [];
    
    // Check if the product is already in the cart
    const existingProduct = cart.find(item => item.id === productToAdd.id);

    if (existingProduct) {
      // If product is already in cart, increase its quantity by 1
      existingProduct.quantity += 1;
    } else {
      // If product is not in cart, set quantity to 1 and add it to the cart
      productToAdd.quantity = 1;
      cart.push(productToAdd);
    }

    // Save updated cart back to localStorage
    localStorage.setItem('cart2', JSON.stringify(cart));
    alert(`${productToAdd.name} added to cart!`);
  };

  const removeFromCart = (selectedProduct) => {
    // Retrieve cart from localStorage or initialize as an empty array
    let cart = JSON.parse(localStorage.getItem('cart2')) || [];

    // Find the product in the cart
    const existingProduct = cart.find(item => item.id === selectedProduct.id);

    if (existingProduct) {
      if (existingProduct.quantity > 1) {
        // If quantity is more than 1, decrease by 1
        existingProduct.quantity -= 1;
      } else {
        // If quantity is 1, remove the product from the cart
        cart = cart.filter(item => item.id !== selectedProduct.id);
      }

      // Save updated cart back to localStorage
      localStorage.setItem('cart2', JSON.stringify(cart));
      alert(`${selectedProduct.name} quantity updated!`);
    } else {
      alert("Product not found in cart.");
    }
  };

  return (
    <div className="product-item">
      <img 
        src={product.image} 
        alt={product.name} 
        className="product-image" 
      />
      <div className="product-details">
        <h2 className="product-name">{product.name}</h2>
        <p className="product-desc">{product.desc}</p>
        <p className="product-rating">Rating: {product.rating} ★</p>
        <p className="product-price">Price: ${product.price}</p>
        <div className="quantity-controls">
          <button className="add-to-cart-btn" onClick={() => addToCart(product)}>Add to Cart</button>
          <button className="remove-from-cart-btn" onClick={() => removeFromCart(product)}>Remove One</button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
