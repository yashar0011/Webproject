import React from 'react';
import '../styles/LandingPage.css';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
    let navigate = useNavigate();

    const handleAddBookClick = () => {
        navigate('/add-book');
    };

    const handleViewBooks = () => {
        navigate('/books');
    };

    return (
        <div className="landing-page">
            <header className="landing-header">
                <h1 className="site-name">Library Hub</h1>
                <img src='"../assets/logo.png"' alt="Library Hub Logo" className="site-logo" />
            </header>
            <main>
                <button className="hero-button" onClick={handleAddBookClick}>
                    Add New Book
                </button>
                <button className="view-books-button" onClick={handleViewBooks}>
                    View All Books
                </button>
                {/* You might want to add more content here, like an introduction to your site or featured books/resources */}
            </main>
            <footer className="site-footer">
                <p>© 2023 Library Hub. All rights reserved.</p>
                {/* You can add more content to the footer like links, social media icons, etc. */}
            </footer>
        </div>
    );
}

export default LandingPage;
