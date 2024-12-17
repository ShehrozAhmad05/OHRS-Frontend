import React, { useState, useEffect } from "react";
import Logo from "../../Assets/logo.png";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./NavBar.css";
//import "../../SCSS/navbar.scss"
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from 'react-router-dom';

function NavigationBar() {

    const user = JSON.parse(localStorage.getItem('currentUser'));

    function logout() {
        localStorage.removeItem('currentUser');
        window.location.href = '/login';
    }

    const [activeDropdown, setActiveDropdown] = useState(null);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [hoverDropdown, setHoverDropdown] = useState(null); // Add hover state

    const handleDropdownToggle = () => {
        setActiveDropdown(
            activeDropdown === "accommodations" ? null : "accommodations"
        );
    };

    const handleMouseEnter = (dropdown) => {
        setHoverDropdown(dropdown);
    };

    const handleMouseLeave = () => {
        if (activeDropdown === null) {
            setHoverDropdown(null);
        }
    };

    const handleHamburgerClick = () => {
        setShowMobileMenu(!showMobileMenu);
    };

    const handleClickOutside = (event) => {
        if (!event.target.closest(".navbar-custom")) {
            setShowMobileMenu(false);
            setActiveDropdown(null);
            setHoverDropdown(null); // Reset hover state
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <Navbar className="navbar-custom" expand="lg">
            <div className="navbar-header">
                {/* Left side: Home and Accommodations */}
                <Nav className="navbar-links left-side">
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                    <NavDropdown
                        title="Accommodations"
                        id="accommodations-dropdown"
                        className="accommodations-dropdown"
                        show={activeDropdown === "accommodations" || hoverDropdown === "accommodations"}
                        onClick={handleDropdownToggle}
                        onMouseEnter={() => handleMouseEnter("accommodations")}
                        onMouseLeave={handleMouseLeave}
                    >
                        <NavDropdown.Item as={Link} to="/simple-room">
                            <span className="dropdown-text">Simple Room</span>
                        </NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/vip-room">
                            <span className="dropdown-text">Vip Room</span>
                        </NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/luxury-room">
                            <span className="dropdown-text">Luxury Room</span>
                        </NavDropdown.Item>
                    </NavDropdown>
                </Nav>

                {/* Centered Logo */}
                <Navbar.Brand as={Link} to="/">
                    <img src={Logo} alt="Logo" className="logo-image" />
                </Navbar.Brand>

                {/* Button for Book Your Stay */}
                <div className="button">
                    <Button as={Link} to="/book" className="book-button mobile" variant="outline-success">
                        Book Your Stay
                    </Button>
                </div>

                {/* Hamburger Icon */}
                <button className="hamburger-icon" onClick={handleHamburgerClick}>
                    <div className={`animated-icon1 ${showMobileMenu ? "open" : ""}`}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </button>

                {/* Right side: About Us, Contact, and Button */}
                <Nav className="navbar-links right-side">
                    <Nav.Link as={Link} to="/about">About Us</Nav.Link>
                    <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
                    {user ? (
                        <NavDropdown title={user.name} id="user-dropdown">
                            <NavDropdown.Item as={Link} to="/profile">
                            <span className="dropdown-text">Profile</span>
                        </NavDropdown.Item>
                            <NavDropdown.Item onClick={logout}>
                            <span className="dropdown-text">Logout</span>
                            </NavDropdown.Item> {/* Updated */}
                        </NavDropdown>
                    ) : (
                        <>
                            <Nav.Link as={Link} to="/register">Register</Nav.Link>
                            <Nav.Link as={Link} to="/login">Login</Nav.Link>
                        </>
                    )}
                    <Button as={Link} to="/home" className="book-button" variant="outline-success">
                        <div className="book-button1">BOOK YOUR STAY</div>
                    </Button>
                </Nav>
            </div >

            {/* Mobile Menu */}
            {
                showMobileMenu && (
                    <div className="mobile-menu">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>

                        <div className="mobile-dropdown">
                            <div className="dropdown-header" onClick={handleDropdownToggle}>
                                <span className="dropdown-text">Accommodations</span>
                            </div>
                            {activeDropdown === "accommodations" && (
                                <div className="dropdown-items">
                                    <Nav.Link as={Link} to="/simple-room" className="dropdown-item">
                                        Simple Room
                                    </Nav.Link>
                                    <Nav.Link as={Link} to="/vip-room" className="dropdown-item">
                                        Vip Room
                                    </Nav.Link>
                                    <Nav.Link as={Link} to="/luxury-room" className="dropdown-item">
                                        Luxury Room
                                    </Nav.Link>
                                </div>
                            )}
                        </div>
                        <Nav.Link as={Link} to="/about">About Us</Nav.Link>
                        <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
                        {user ? (
                            <>
                                <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                                <Nav.Link onClick={logout}>Logout</Nav.Link> {/* Updated */}
                            </>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/register">REGISTER</Nav.Link>
                                <Nav.Link as={Link} to="/login">LOGIN</Nav.Link>
                            </>
                        )} 
                    </div>
                )
            }
        </Navbar >
    );
}

export default NavigationBar;