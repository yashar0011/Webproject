import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Navbar.css";
import logoImg from "../../images/logo.jpg";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { useAuthUser } from '../../context/AuthContext';
import { FiShoppingCart } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const handleNavbar = () => setToggleMenu(!toggleMenu);
  const { isLoggedIn, logout } = useAuthUser();
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const handleCartClick = () => {
    if (isLoggedIn) {
      navigate('/cart');
    } else {
      navigate('/login');
    }
  };

  return (
    <nav className='navbar' id="navbar">
      <div className='container navbar-content flex'>
        <div className='brand-and-toggler flex flex-sb'>
          <Link to="/" className='navbar-brand flex'>
            <img src={logoImg} alt="site logo" />
            <span className='text-uppercase fw-7 fs-24 ls-1'>BookByte</span>
          </Link>
          <button type="button" className='navbar-toggler-btn' onClick={handleNavbar}>
            <HiOutlineMenuAlt3 size={35} style={{
              color: `${toggleMenu ? "#fff" : "#010101"}`
            }} />
          </button>
        </div>

        <div className={toggleMenu ? "navbar-collapse show-navbar-collapse" : "navbar-collapse"}>
          <ul className="navbar-nav">
            <li className='nav-item'>
              <Link to="book" className='nav-link text-uppercase text-white fs-22 fw-6 ls-1'>Home</Link>
            </li>
            <li className='nav-item'>
              <Link to="about" className='nav-link text-uppercase text-white fs-22 fw-6 ls-1'>about</Link>
            </li>
            <li className='nav-item'>
              {isLoggedIn ? (
                <button onClick={logout} className='nav-link text-uppercase text-white fs-22 fw-6 ls-1' style={{ background: 'none', border: 'none' }}>Logout</button>
              ) : (
                <Link to="login" className='nav-link text-uppercase text-white fs-22 fw-6 ls-1'>Login</Link>
              )}
            </li>
            <li className='nav-item' onClick={handleCartClick}>
              <Link to="/cart">
                <FiShoppingCart />
                {cartItems.length > 0 && (
                  <span className="cart-item-count">
                    {cartItems.length} {/* Display the number of items in the cart */}
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar