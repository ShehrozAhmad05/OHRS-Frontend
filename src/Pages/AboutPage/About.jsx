import React, { useRef } from "react";
import { Parallax } from "react-parallax";
import bgImg from "../../Assets/About.avif";
import img2 from '../../Assets/inner-img.png';
import { FaCheckCircle, FaChevronLeft, FaChevronRight } from "react-icons/fa"; 
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"; 
import Slider from "react-slick";
import "./About.css";

const reviewsData = [
    {
      stars: 5,
      text: "This hotel exceeded all my expectations! The service was top-notch.",
      name: "John Doe",

    },
    {
      stars: 5,
      text: "Absolutely loved the ambiance and the staff was incredibly friendly.",
      name: "Jane Smith",
   
    },
    {
      stars: 5,
      text: "The rooms were clean, and the view from my room was breathtaking.",
      name: "Alex Lee",
    
    },
    {
      stars: 5,
      text: "I had a wonderful stay. Everything was perfect, from the location to the service.",
      name: "Maria Gonzalez",
  
    },
    {
      stars: 5,
      text: "The facilities were excellent, and the food was incredible!",
      name: "Tom Hardy",
    
    },
    {
      stars: 5,
      text: "An amazing experience! The staff made us feel like royalty.",
      name: "Emma Stone",
   
    },
];

const SamplePrevArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div className={`${className} custom-arrow`} onClick={onClick}>
      <FaChevronLeft />
    </div>
  );
};

const SampleNextArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div className={`${className} custom-arrow`} onClick={onClick}>
      <FaChevronRight />
    </div>
  );
};

function About() {
  let sliderRef = useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 500,
    prevArrow: <SamplePrevArrow />,
    nextArrow: <SampleNextArrow />,
  };

  const qualities = [
    "Spacious rooms with king-sized beds",
    "Free high-speed Wi-Fi",
    "Complimentary breakfast",
    "24-hour room service",
    "Air conditioning",
    "Modern bathroom facilities",
    "In-room entertainment system",
    "Daily housekeeping",
    "Minibar with a selection of beverages"
  ];

  return (
    <>
      <div className="parallaxContainer">
        <Parallax
          bgImage={bgImg}
          strength={500}
          bgImageStyle={{ height: "100%", width: "100%", objectFit: "cover" }}
        >
          <div style={{ height: "100vh", position: "relative" }}>
            <div className="Overlay" />
            <h1 className="contactTitle">About Us</h1>
          </div>
        </Parallax>
      </div>
      <div className="animated-heading">
        <p className="paragraph">Let's Meet</p>
      </div>
      <div className="contentSection">
        <div className="contentLeft">
          <p>
            At our hotel, we strive to provide an unparalleled experience of
            luxury and comfort. Nestled in the heart of the city, our hotel is
            not just a place to stay but a retreat from the hustle and bustle of
            daily life. Our team of dedicated staff ensures that every aspect of
            your stay is taken care of, from the moment you check-in until you
            depart. Whether you’re here for business, leisure, or a special
            occasion, we offer personalized services tailored to your needs.
          </p>
        </div>
        <div className="contentRight">
          <p>
            We understand that every guest has unique preferences, and we are
            here to cater to yours. If you have any special requests, inquiries,
            or feedback, feel free to reach out to us. Our customer service team
            is available 24/7 to assist with any queries you may have about your
            reservation, amenities, or local attractions. Whether you're
            planning a corporate event, a romantic getaway, or a family
            vacation, we will work with you to craft an experience that suits
            your individual needs.
          </p>
        </div>
      </div>
      <div className="imageContainer">
        <img src={img2} alt="Example" className="image" />
        <button className="roundButton">SEE ALL SUITES</button>
      </div>
      <div className="qualitiesSection">
        <div className="qualitiesGrid">
          {qualities.map((quality, index) => (
            <div key={index} className="qualityItem">
              <FaCheckCircle className="tickIcon" />
              <p>{quality}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="reviewsSection">
    
        <Slider ref={(slider) => (sliderRef.current = slider)} {...settings}>
          {reviewsData.map((review, index) => (
            <div className="reviewItem" key={index}>
              <div className="stars">{"★".repeat(review.stars)}</div>
              <p className="reviewText">{review.text}</p>
              <div className="reviewerDetails">
                <p className="reviewerName">{review.name}</p>
                <p className="reviewerCountry">{review.country}</p>
              </div>
            </div>
          ))}
        </Slider>
      
      </div>
    </>
  );
}

export default About;
