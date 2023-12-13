import React, { createContext, useState, useContext } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const { user } = useUser();
    const navigate = useNavigate();

    const addToCart = async (bookId, quantity) => {
        const userId = user?._id;
        if (!userId) {
            console.log("User must be logged in to add items to cart");
            navigate('/login');
            return;
        }

        try {
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ userId, bookId, quantity })
            };

            const response = await fetch('http://localhost:3001/add-to-cart', requestOptions);

            if (response.ok) {
                const result = await response.json();
                setCartItems(result.cartItems);
                console.log("Item added to cart successfully!");
            } else {
                const errorResult = await response.json();
                throw new Error(errorResult.message || "Error adding item to cart.");
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const removeFromCart = async (userId, bookId) => {
        try {
            const response = await fetch('http://localhost:3001/remove-from-cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ userId, bookId })
            });

            if (!response.ok) {
                throw new Error('Could not remove item from cart.');
            }

        } catch (error) {
            console.error('Error:', error);
        }
    };

    const getCart = async () => {
        const userId = user?._id;
        if (!userId) {
            return;
        }

        try {
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const clearCart = async () => {
        try {
            const response = await fetch('http://localhost:3001/clear-cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({})
            });

            if (!response.ok) {
                throw new Error('Could not clear cart.');
            }

            setCartItems([]);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, getCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
