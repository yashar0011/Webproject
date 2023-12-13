import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Home from './pages/Home/Home';
import About from "./pages/About/About";
import BookList from "./components/BookList/BookList";
import BookDetails from "./components/BookDetails/BookDetails";
import LoginPage from "./components/LoginPage/LoginPage"
import Cart from "./components/Cart/Cart"
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import { AuthUserProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { UserProvider } from './context/UserContext';
import { AppProvider } from './context.';
import AddressForm from './components/AddressForm/AddressForm';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AppProvider>
    <BrowserRouter>
      <AuthUserProvider>
        <UserProvider>
          <CartProvider>
            <Routes>
              <Route path="/" element={<Home />}>
                <Route path="about" element={<About />} />
                <Route path="book" element={<BookList />} />
                <Route path="/book/:id" element={<BookDetails />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegistrationForm />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/add-address" element={<AddressForm />} />
              </Route>
            </Routes>
          </CartProvider>
        </UserProvider>
      </AuthUserProvider>
    </BrowserRouter>
  </AppProvider>
);

