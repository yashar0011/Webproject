import React from 'react';

const CartItem = ({ item, onRemove }) => {
    return (
        <li className="cart-item">
            <span>{item.title} - ${item.price}</span>
            <span>Quantity: {item.quantity}</span>
            <button onClick={() => onRemove(item.bookId)}>Remove</button>
            {/* You can also add buttons to increase or decrease the quantity */}
        </li>
    );
};

export default CartItem;
