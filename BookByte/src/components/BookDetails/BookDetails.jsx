import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Loading from "../Loader/Loader";
import coverImg from "../../images/cover_not_found.jpg";
import "./BookDetails.css";
import { FaArrowLeft } from "react-icons/fa";
import { useUser } from '../../context/UserContext';

const URL = "https://openlibrary.org/works/";

const BookDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState(null);
  const navigate = useNavigate();
  const { user, setUserData } = useUser();
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      if (userData.token !== user?.token || userData.userId !== user?.userId) {
        setUserData(userData);
      }
    }
  }, [user, setUserData]);

  useEffect(() => {
    setLoading(true);
    async function getBookDetails() {
      try {
        const response = await fetch(`${URL}${id}.json`);
        if (response.ok) {
          const data = await response.json();
          const newBook = {
            description: data.description ? data.description.value : "No description found",
            title: data.title,
            cover_img: data.covers ? `https://covers.openlibrary.org/b/id/${data.covers[0]}-L.jpg` : coverImg,
            subject_places: data.subject_places ? data.subject_places.join(", ") : "No subject places found",
            subject_times: data.subject_times ? data.subject_times.join(", ") : "No subject times found",
            subjects: data.subjects ? data.subjects.join(", ") : "No subjects found"
          };
          setBook(newBook);
        } else {
          console.error("Failed to fetch book details");
        }
      } catch (error) {
        console.error("Error fetching book details:", error);
      } finally {
        setLoading(false);
      }
    }
    getBookDetails();
  }, [id]);

  const handleAddToCart = async (bookTitle, quantity, coverImg) => {

    if (!bookTitle || !quantity) {
      console.error("Book title and quantity are required for adding to cart");
      return;
    }
    const token = user?.token;

    if (!token) {
      console.error("User token is not available. Authentication might be required.");
      return;
    }

    const response = await fetch('http://localhost:3001/add-to-cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ bookName: bookTitle, quantity, coverImg })
    });

    if (response.ok) {
      console.log('Book added to the cart');
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 3000);
    } else {
      console.error('Failed to add the book to the cart');
      const errMsg = await response.text();
      console.error(errMsg);
    }
  };

  const onAddToCartClick = () => {
    if (user && user.token && book && book.title) {
      handleAddToCart(book.title, 1, book.cover_img);
    } else {
      console.log('Error: Missing user information, book details, or book title');
    }
  };

  if (loading) return <Loading />;

  return (
    <section className='book-details'>
      <div className='container'>
        <button type='button' className='flex flex-c back-btn' onClick={() => navigate("/book")}>
          <FaArrowLeft size={22} />
          <span className='fs-18 fw-6'>Go Back</span>
        </button>

        <div className='book-details-content grid'>
          <div className='book-details-img'>
            <img src={book?.cover_img} alt="cover img" />
          </div>
          <div className='book-details-info'>
            <div className='book-details-item title'>
              <span className='fw-6 fs-24'>{book?.title}</span>
            </div>
            <div className='book-details-item description'>
              <span>{book?.description}</span>
            </div>
            <div className='book-details-item'>
              <span className='fw-6'>Subject Places: </span>
              <span className='text-italic'>{book?.subject_places}</span>
            </div>
            <div className='book-details-item'>
              <span className='fw-6'>Subject Times: </span>
              <span className='text-italic'>{book?.subject_times}</span>
            </div>
            <div className='book-details-item'>
              <span className='fw-6'>Subjects: </span>
              <span>{book?.subjects}</span>
            </div>
          </div>
        </div>
        {addedToCart && <div className="added-to-cart-message">Added to the cart!</div>}
        <button onClick={onAddToCartClick} className="add-to-cart-button">
          Add to Cart
        </button>

      </div>
    </section>
  )
}

export default BookDetails