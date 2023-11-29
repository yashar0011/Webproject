import React from 'react';
import "./About.css";
import aboutImg from "../../images/about-img.jpg";

const About = () => {
  return (
    <section className='about'>
      <div className='container'>
        <div className='section-title'>
          <h2>About</h2>
        </div>

        <div className='about-content grid'>
          <div className='about-img'>
            <img src={aboutImg} alt="" />
          </div>
          <div className='about-text'>
            <h2 className='about-title fs-26 ls-1'>Welcome to BookByte, a Haven for Book Lovers!</h2>
            <p className='fs-17'>Nestled in the heart of Toronto, BookByte is more than just a bookstore; it's a community hub for literature enthusiasts. Since 2020, we've been dedicated to fostering a love for reading and creating a welcoming space for discussions, discoveries, and literary adventures. Our shelves are stocked with a wide range of books, from timeless classics to contemporary bestsellers, catering to all ages and interests. We believe in the power of stories to connect people, spark imagination, and inspire change. Beyond books, we host author events, book clubs, and workshops, making BookByte a vibrant cultural landmark. Whether you're a lifelong bibliophile or just beginning your reading journey, we invite you to explore, relax, and find your next great read with us.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
