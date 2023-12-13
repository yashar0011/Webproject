import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
const AuthUserContext = createContext(null);

export const AuthUserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    const authenticate = async (username, password) => {
        try {
            const response = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                const userData = {
                    username: data.username,
                    token: data.token,
                    userId: data.userId
                };
                console.log(userData);
                setUser(userData);
                setIsLoggedIn(true);
                localStorage.setItem('user', JSON.stringify(userData));
            } else {
                throw new Error('Authentication failed');
            }
        } catch (error) {
            console.error('Authentication error:', error);
            setIsLoggedIn(false);
            setUser(null);
        }
    };

    const logout = () => {
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        setUser(null);
        navigate('/login');
    };

    return (
        <AuthUserContext.Provider value={{ user, isLoggedIn, logout, authenticate }}>
            {children}
        </AuthUserContext.Provider>
    );
};

export const useAuthUser = () => useContext(AuthUserContext);
