import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthUser } from '../../context/AuthContext';
import '../Cart/Cart.css';

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const { isLoggedIn, user } = useAuthUser();
    const navigate = useNavigate();

    const updateQuantity = async (bookName, quantity) => {
        try {
            const response = await fetch('http://localhost:3001/cart/item', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`,
                },
                body: JSON.stringify({ bookName, quantity }),
            });

            if (response.ok) {
                const updatedCart = await response.json();
                setCartItems(updatedCart.cart);
            } else {
                throw new Error('Could not update cart item quantity.');
            }
        } catch (error) {
            console.error('Error updating cart item quantity:', error);
        }
    };

    const removeItemFromCart = async (bookName) => {
        try {
            const response = await fetch('http://localhost:3001/cart/item', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`,
                },
                body: JSON.stringify({ bookName, quantity: 0 }),
            });

            if (response.ok) {
                const updatedCart = await response.json();
                setCartItems(updatedCart.cart);
            } else {
                throw new Error('Could not remove cart item.');
            }
        } catch (error) {
            console.error('Error removing cart item:', error);
        }
    };

    const incrementQuantity = async (item, index) => {
        const updatedQuantity = item.quantity + 1;
        updateQuantity(item.bookName, updatedQuantity);
    };

    const decrementQuantity = async (item, index) => {
        const updatedQuantity = item.quantity - 1;
        if (updatedQuantity === 0) {
            removeItemFromCart(item.bookName);
        } else {
            updateQuantity(item.bookName, updatedQuantity);
        }
    };

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
            return;
        }

        const fetchCartItems = async () => {
            try {
                const response = await fetch('http://localhost:3001/cart', {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch cart items');
                }

                const clonedResponse = response.clone();
                const text = await clonedResponse.text();
                console.log('Response body:', text);

                const data = await response.json();
                setCartItems(data);
            } catch (error) {
                console.error('Error fetching cart items:', error);
            } finally {
                setLoading(false);
            }
        };


        fetchCartItems();
    }, [isLoggedIn, navigate, user.token]);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="cart-page">
            <h2>Your Cart</h2>
            {cartItems.length === 0 ? (
                <p className="empty-cart-message">Your cart is empty.</p>
            ) : (
                <ul>
                    {cartItems.map((item, index) => (
                        <li key={index} className="cart-item">
                            <div className="cart-item-details">
                                <img src={item.coverImg} alt={item.bookName} className="cart-item-image" />
                                <span className="cart-item-name">{item.bookName}</span>
                            </div>
                            <div className="cart-item-quantity">
                                <button onClick={() => decrementQuantity(item, index)}>-</button>
                                <span>{item.quantity}</span>
                                <button onClick={() => incrementQuantity(item, index)}>+</button>
                            </div>
                            <button
                                onClick={() => removeItemFromCart(item.bookName)}
                                className="cart-item-remove">
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            )}
            <button onClick={() => navigate('/add-address')} className="add-address-button">Add Address</button>
            <button
                onClick={() => {/* logic to handle payment */ }}
                className="pay-button"
            >
                Pay
            </button>
        </div>
    );
};

export default CartPage;
