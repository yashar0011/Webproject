import React from 'react';
import '../styles/Book.css';

function Book({ title, author, genre, description }) {
    return (
        <div className="book">
            <h3>{title}</h3>
            <p><strong>Author:</strong> {author}</p>
            <p><strong>Genre:</strong> {genre}</p>
            <p>{description}</p>
        </div>
    );
}

export default Book;
