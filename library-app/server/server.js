const express = require('express');
const mongoose = require('mongoose');
const Book = require('./models/book');

const app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors());

// MongoDB connection URI
const mongoURI = 'mongodb+srv://yghasempour1:aV8IrgzZH25asDTu@yasharcluster.ygwlgkp.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const transformOpenLibraryData = (openLibraryBooks) => {
    return openLibraryBooks.map(book => {
        let genre = 'Unknown';
        let description = 'No description available';

        if (book.subjects && Array.isArray(book.subjects)) {
            genre = book.subjects.map(subject => subject.name).join(', ');
        }

        if (book.description) {
            description = typeof book.description === 'string' ? book.description : book.description.value;
        }

        return {
            title: book.title,
            author: book.authors && book.authors.length > 0 ? book.authors[0].name : 'Unknown',
            genre: genre,
            description: description
        };
    });
};


// Endpoint
app.post('/api/books', async (req, res) => {
    try {
        const newBook = new Book(req.body);
        await newBook.save();
        res.status(201).send(newBook);
    } catch (error) {
        console.error(error); // Log the error for server-side debugging
        res.status(500).send({ message: 'An error occurred while saving the book.' });
    }
});


app.get('/api/all-books', async (req, res) => {
    try {
        const myBooks = await Book.find({});

        // Modify this URL based on the specific books or criteria you want from Open Library
        const externalApiUrl = 'https://openlibrary.org/subjects/science.json';
        const externalApiResponse = await fetch(externalApiUrl);
        const externalApiResponseData = await externalApiResponse.json();
        const transformedExternalBooks = transformOpenLibraryData(externalApiResponseData.works);

        const allBooks = myBooks.concat(transformedExternalBooks);

        res.json(allBooks);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send({ message: 'An error occurred while fetching books' });
    }
});


// ... other routes and server setup

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
