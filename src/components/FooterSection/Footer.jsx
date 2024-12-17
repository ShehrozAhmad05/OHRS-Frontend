import React from 'react'
// import { FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';
import { FaFacebook } from "react-icons/fa6";
import { IoLogoTwitter } from "react-icons/io5";
import { FaInstagram } from "react-icons/fa";
import logo from '../../Assets/logo-augustine-footer.webp';

 import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
        <div className="footer-container">
            {/* Logo Section */}
            <div className="logo-with-menu">
                <img src={logo} alt="Logo" className="footer-logo" />
            </div>

            {/* Home Section */}
            <div className="footer-column footer-home-section">
                <ul>
                    <li><a href="#about">Home</a></li>
                    <li><a href="#careers">About Us</a></li>
                    <li><a href="#blog">Contact Us</a></li>
                </ul>
            </div>

            {/* Address Section */}
            <div className="footer-column footer-address-section">
                <ul>
                    <li><a href="#help">Turgut Ozal Millet Cd. 23466 Sjsa Niyadak 897, Istanbul, Turkey</a></li>
                    <li><a href="#terms">0225 5582 55 55 </a></li>
                    {/* <li><a href="#privacy">0055 5486 55 56</a></li> */}
                    {/* <li><a href="#privacy">augustine@example.com</a></li> */}
                    <li><a href="#privacy">augustine@qodeinteractive.com</a></li>
                </ul>
            </div>

            {/* Subscription Section */}
            <div className="footer-subscription">
                {/* <h4>Subscribe to our newsletter</h4> */}
                <p>Monthly digest of what's new and exciting from us.</p>
                <div className="subscription-form">
                    <input type="email" placeholder="Enter your email address" />
                    <button type="button">Subscribe</button>
                </div>
            </div>
        </div>

        <hr />

        {/* Footer Bottom Section */}
        <div className="footer-bottom">
            <span>© 2024 Aura. All rights reserved.</span>
            <div className="social-links">
                <a href="#twitter"><IoLogoTwitter /></a>
                <a href="#facebook"><FaFacebook /></a>
                <a href="#instagram"><FaInstagram /></a>
            </div>
        </div>
    </footer>
);
}

export default Footer