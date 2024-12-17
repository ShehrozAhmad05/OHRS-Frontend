import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ode1 from '../../Assets/Ode1.jpg';
import ode2 from '../../Assets/Ode2.jpg';
import ode3 from '../../Assets/Ode3.jpg';
import home from '../../Assets/Home2.avif'
import Home1 from '../../Assets/Home.avif'
import { Button } from 'react-bootstrap'; // Add this import
import './Home.css';

function Home() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update time every second

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  // Format data
  const date = currentTime.getDate();
  const month = currentTime.toLocaleString('default', { month: 'long' });
  const year = currentTime.getFullYear();

  // Convert to 12-hour format
  const hours = currentTime.getHours() % 12 || 12; // Convert 0 to 12 for midnight/noon
  const minutes = currentTime.getMinutes().toString().padStart(2, '0'); // Ensure 2 digits for minutes
  const ampm = currentTime.getHours() >= 12 ? 'PM' : 'AM'; // Determine AM/PM

  return (
    <>
<div className="suite-section">
<Button as={Link} to="/book" className="round" variant="outline-success">
            BOOK YOUR STAY
          </Button>
  <div className="suite-image-container">
    <img src={Home1} alt="Suite" className="suite-image" />
  </div>
</div>



      <div className="homeContainer">
        <p className="homeHeading">THIS IS AUGUSTINE</p>
        <h2 className="head">
          A Luxurious Way to Meet <br />
          the Capitals of Europe
        </h2>
        <p className="homeDescription">
          Welcome to Augustine! We are delighted to offer a luxurious and unique experience.
          Discover our services, enjoy premium amenities, and relax in comfort and style.
        </p>
        {/* New Section for Date, Time, and Weather */}
        <div className="info-container">
  <div className="info-block">
    <p className="info-title">{date}</p>
    <p className="info-subtitle">{month}, {year}</p>
  </div>
  <div className="info-block">
    <p className="info-title">
      {hours}:{minutes}
      <span className="ampm"> {ampm}</span>
    </p>
    <p className="info-subtitle">Current Time</p>
  </div>
  <div className="info-block">
    <p className="info-title">25°C</p>
    <p className="info-subtitle">Broken Cloud</p>
  </div>
</div>
      </div>
      <div className="about-section">
  <div className="about-text">
    <p className="about-heading">THIS IS AUGUSTINE</p>
    <p className="about-subheading">An ode to discovery</p>
  </div>
  <div className="image-row">
    <img src={ode1} className="about-image" />
    <img src={ode2} className="about-image middle-image" />
    <img src={ode3} className="about-image" />
  </div>
</div>
<div className="fullwidth-image-section">
  <img src={home} className="background-image" />
  <div className="text-overlay">
    <p className="image-heading">Authentic Place for the Best Memories</p>
    <p className="image-description">
      Welcome to our luxurious hotel, where every moment is crafted to perfection.
      Enjoy the finest amenities and create unforgettable memories in a truly
      authentic setting.
    </p>
  </div>
</div>

    </>
  );
}

export default Home;
