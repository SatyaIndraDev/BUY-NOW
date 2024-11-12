import React, { useState, useEffect } from 'react';

function ShoppingCart() {
  const [cart, setCart] = useState({});

  // Load cart from local storage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart2');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Function to add an item to the cart
  const addItem = (itemName) => {
    setCart(prevCart => {
      const updatedCart = { ...prevCart };
      updatedCart[itemName] = (updatedCart[itemName] || 0) + 1;
      return updatedCart;
    });
  };

  return (
    <div>
      <button onClick={() => addItem('item1')}>Add Item 1</button>
      <button onClick={() => addItem('item2')}>Add Item 2</button>
      <div>
        <h2>Cart</h2>
        <ul>
          {Object.entries(cart).map(([itemName, quantity]) => (
            <li key={itemName}>{itemName}: {quantity}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ShoppingCart;
