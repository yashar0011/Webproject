import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './LoginPage.css';
import { useAuthUser } from '../../context/AuthContext';

const LoginPage = () => {
    const { authenticate } = useAuthUser();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        setError('');

        try {
            await authenticate(username, password);
            navigate('/');
        } catch (error) {
            setError('Login failed: ' + error.message);
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            {error && <p className="error">{error}</p>} {/* Displaying error messages */}
            <form onSubmit={handleLogin}>
                {/* Form inputs and submit button */}
                <label>
                    Username:
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </label>
                <button type="submit">Login</button>
                <p>
                    Don't have an account? <Link to="/register">Register here</Link>
                </p>
            </form>
        </div>
    );

};

export default LoginPage;
