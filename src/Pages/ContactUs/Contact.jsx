import React, {useState, useEffect } from "react";
import ParallaxEffect from "../../components/ParallaxEffect/Parallax";

import "./Contact.css";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [termsAccepted, setTermsAccepted] = useState(false);
  useEffect(() => {
    const paragraphs = document.querySelectorAll(".paragraph");
    const texts = Array.from(paragraphs).map((p) => p.textContent);

    // Clear paragraph text before starting the typewriter effect
    paragraphs.forEach((p) => {
      p.textContent = "";
    });

    let index = 0;

    function typeWriter() {
      const currentParagraph = paragraphs[index];
      const currentText = texts[index];

      if (index < paragraphs.length && currentParagraph && currentText) {
        if (currentParagraph.textContent.length < currentText.length) {
          currentParagraph.textContent += currentText.charAt(
            currentParagraph.textContent.length
          );
          setTimeout(typeWriter, 80); // Adjust typing speed here
        } else {
          index++;
          typeWriter(); // Start typing next paragraph immediately
        }
      }
    }

    typeWriter(); // Start the typing effect

    // Cleanup function to prevent memory leaks
    return () => {
      paragraphs.forEach((p) => {
        p.textContent = ""; // Reset paragraph text on unmount
      });
    };
  }, []);
  const validate = () => {
    const newErrors = { name: "", email: "", message: "" };
    let isValid = true;

    if (!name) {
      newErrors.name = "Name is required.";
      isValid = false;
    }
    if (!email) {
      newErrors.email = "Email is required.";
      isValid = false;
    }
    if (!message) {
      newErrors.message = "Message is required.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleCheckboxChange = () => {
    setTermsAccepted(!termsAccepted);
    if (!validate()) {
      // Display error messages if validation fails
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent form submission
    if (validate() && termsAccepted) {
      // Proceed with form submission logic
      console.log("Form submitted successfully");
    }
  };

  return (
    <>
      <ParallaxEffect />
      <div className="animated-heading">
        <p className="paragraph">Get In Touch</p>
      </div>
      <div className="form-page">
        {/* Left section with text, location, and email */}
        <div className="info-section">
          <p>
            Welcome to our hotel, where comfort meets elegance.
            Nestled in the heart of the city, our hotel offers an exceptional
            stay experience, blending modern amenities with warm hospitality.
            Whether you're here for business or leisure, we are committed to
            making your stay unforgettable.Feel free to reach out—we’re here to
            help you every step of the way.
          </p>

          <div className="info-item">
            <i className="fas fa-map-marker-alt"></i>{" "}
            {/* Font Awesome location icon */}
            <span>1234 Luxury St, Hotel City</span>
          </div>

          <div className="info-item">
            <i className="fas fa-envelope"></i> {/* Font Awesome mail icon */}
            <span>info@luxuryhotel.com</span>
            
          </div>
          <div className="info-item no-icon">
    <span>reservations@luxuryhotel.com</span>
  </div>

  <div className="info-item no-icon">
    <span>support@luxuryhotel.com</span>
  </div>
          
        </div>

        {/* Right section with the form */}
        <div className="form-section">
          <p className="form-heading">Reservation Form</p>
          <h3 className="form-subheading">Ask before booking</h3>

          <form className="reservation-form">
          <div className="form-group">
  <textarea
    id="message"
    name="message"
    placeholder="Message"
    // rows="4"
  />
  <hr className="input-line" />
</div>

            <div className="form-group">
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            
              />
              <hr className="input-line" />
              {errors.name && (
                <span className="error-message">{errors.name}</span>
              )}
            </div>

            <div className="form-group">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Type your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                
              />
              <hr className="input-line" />
              {errors.email && (
                <span className="error-message">{errors.email}</span>
              )}
            </div>

            <div className="checkterms">
  <input type="checkbox" 
  id="terms" 
  name="terms"
  checked={termsAccepted}
  onChange={handleCheckboxChange}
   />
  <label htmlFor="terms" className="terms-label">
  I agree to the terms & conditions
  </label>
</div>



            <button type="submit" className="contact-button"onClick={handleSubmit}>
              Submit
            </button>
           

          </form>
         
        </div>
      
      </div>
      <hr className="form-divider" /> 
    </>
  );
}

export default Contact;
