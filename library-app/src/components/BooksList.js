import React, { useState, useEffect } from 'react';
import Book from './Book';

function BookList() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:3001/api/all-books')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setBooks(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error:', error);
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <div className="book-list">
                {books.map((book, index) => (
                    <Book key={index} {...book} />
                ))}
            </div>
            <footer className="site-footer">
                <p>© 2023 Library Hub. All rights reserved.</p>
                {/* You can add more content to the footer like links, social media icons, etc. */}
            </footer>
        </div>
    );
}

export default BookList;
