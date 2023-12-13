import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer>
            <p>&copy; 2023 BookByte. All rights reserved</p>
            <ul>
                <li><a href="/about">About Us</a></li>
                <li><a href="/">Home</a></li>
                <li><a href="/contact">Contact Us</a></li>
            </ul>
        </footer>
    );
};

export default Footer;
