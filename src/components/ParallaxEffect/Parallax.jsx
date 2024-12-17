import React from 'react'
import { Parallax } from 'react-parallax';
import bgImage from '../../Assets/contact.avif';
import './Parallax.css'
function ParallaxEffect() {
    return (
        <div className="parallax-container">
          <Parallax
            bgImage={bgImage}
            strength={500}
            bgImageStyle={{ height: '100%', width: '100%', objectFit: 'cover' }} // Ensure full image display
          >
            <div style={{ height: '100vh', position: 'relative' }}> {/* Keep the inner height here */}
              <div className="overlay" /> 
             
              <h1 className="contact-title">Contact Us</h1>
            </div>
          </Parallax>
        </div>
      );
}

export default ParallaxEffect