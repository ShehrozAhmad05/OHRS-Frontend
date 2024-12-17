import React from 'react';
import { Parallax } from 'react-parallax';
import './BookForm.css';
import parallaxImg from "../../Assets/room-gallery-04.jpg"
import Form from './Form';

const BookForm = () => {
    return (
        <div className="book-form">
            {/* Parallax Image */}
            <div className="parallax-image-container">
                <Parallax
                    className="parallax"
                    bgImage={parallaxImg} // Replace with your image path
                    strength={500}
                    bgImageStyle={{ height: '100%', width: '100%', objectFit: 'cover' }}
                >
                    <div style={{ height: '100vh', position: 'relative' }}>
                        <div className="overlay" />
                        <h1 className="contact-title">RESERVATION FORM</h1>
                    </div>
                </Parallax>
            </div>

            {/* Heading */}
            <div className="animated-heading">
                <p className="paragraph">Book A Room</p>
            </div>
            {/* Form Component */}
            <div className="form-section">
                <Form />
            </div>

        </div>
    );
};

export default BookForm;