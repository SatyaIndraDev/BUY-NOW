import React from 'react';
import './CartItem.css';

const CartItem = ({ product, onRemove, onUpdateQuantity }) => {
    const handleQuantityChange = (e) => {
        const newQuantity = parseInt(e.target.value, 10);
        onUpdateQuantity(product, newQuantity);
    };

    return (
        <div className="cart-item">
            <img src={product.image} alt={product.name} className="cart-item-image" />
            <div className="cart-item-details">
                <h3>{product.name}</h3>
                <p>${product.price}</p>
                <label htmlFor={`quantity-${product.id}`}>Quantity:1</label>
                {/* <select
                    id={`quantity-${product.id}`}
                    value={product.quantity}
                    onChange={handleQuantityChange}
                >
                    {[...Array(10).keys()].map(i => (
                        <option key={i +1} value={i + 1}>
                            {i + 1}
                        </option>
                    ))}
                </select> */}
                {/* <button className="remove-btn" onClick={() => onRemove(product)}>Remove</button> */}
            </div>
        </div>
    );
};

export default CartItem;
