/* eslint-disable react/no-unescaped-entities */
import './Landing.css';
import { Link } from 'react-router-dom';
const Landing = () => {
  return (
    <div className="landing-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Find Your Perfect Sound</h1>
          <p>Explore a wide range of musical instruments and accessories</p>
          <button className="cta-btn">Shop Now</button>
        </div>
      </section>

      {/*  */}
      <section className="whyus">
      <h2>Why Us?</h2>
<p>The love for music has made you come here.</p>
<p>Here are the stands that prove we share your passion for music and care deeply for music lovers.</p>
<div className='content'>
  <div className='one'>
    <h3>Expertly Curated Selection</h3>
    <p>We handpick every instrument in our collection to ensure the highest quality and sound. Our team of musicians and experts personally tests each product, ensuring you only get the best instruments to inspire your music journey.</p>
  </div>
  <div className='two'>
    <h3>Unbeatable Customer Support</h3>
    <p>Our dedication to music lovers goes beyond sales. We provide exceptional customer support to help you choose the right instrument, answer your questions, and offer guidance, making your experience as seamless and enjoyable as possible.</p>
  </div>
  <div className='three'>
    <h3>Exclusive Offers and Free Courses</h3>
    <p>When you buy an instrument from us, you're not just purchasing a product—you're investing in your musical growth. Enjoy exclusive discounts on our top-rated instruments, plus a free online course to help you master your new instrument from the comfort of your home.</p>
  </div>
</div>

      </section>

      {/* Discount Offer Section */}
      <section className="discount-offer">
        <div className="discount-content">
          <h2>Exclusive Offer: Free Course with Purchase</h2>
          <p>Yes, you read it rigtht!!! Here is a big shoutout from our side for our customers</p>
          <p>Buy any instrument and get a<span><b> free online course </b></span> to start mastering your new instrument.</p>
          <button className="cta-btn">Learn More</button>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <h2>What Our Customers Say</h2>
        <div className="testimonial-grid">
          <div className="testimonial-card">
            <p>"Great selection of instruments and fast shipping!"</p>
            <h3>- Jane Doe</h3>
          </div>
          <div className="testimonial-card">
            <p>"Amazing quality, love my new guitar!"</p>
            <h3>- John Smith</h3>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <h2>Start Your Musical Journey Today!</h2>
        <Link to="/product"><button className="cta-btn">Get Started</button></Link>
      </section>
    </div>
  );
};

export default Landing;
