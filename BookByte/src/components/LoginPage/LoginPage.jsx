import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import './LoginPage.css';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const handleLogin = () => {
        const validUsername = 'Yashaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaar';
        const validPassword = 'Yasharrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr';

        if (username === validUsername && password === validPassword) {
            // Redirect to the details page if credentials are valid
            navigate('/'); // Use navigate to redirect
        } else {
            // Display an error message
            alert('Invalid username or password');
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form>
                <label>
                    Username:
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <button type="button" onClick={handleLogin}>
                    Login
                </button>
            </form>
        </div>
    );
};

export default LoginPage;
