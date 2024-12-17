// import React, { useEffect, useState } from "react";
import { Parallax } from "react-parallax";
import CustomCarousel from "./CustomCarousel"; // Ensure to update the path based on your project structure
import "./Rooms.css"; // Ensure you import your CSS file
import SimpleParallax from "../../Assets/simple.avif";
import s1 from "../../Assets/Room photos/room.png";
import s2 from "../../Assets/Room photos/s2.png";
import s3 from "../../Assets/Room photos/s3.png";
import s4 from "../../Assets/Room photos/s4.png";
import s5 from "../../Assets/Room photos/s5.png";
import s6 from "../../Assets/Room photos/s6.png";
import s7 from "../../Assets/Room photos/s7.png";
import s8 from "../../Assets/Room photos/s8.png";
import s9 from "../../Assets/Room photos/s9.png";
import VipParallax from "../../Assets/pexels-catscoming-707579.jpg";
import v1 from "../../Assets/Room photos/v2.png";
import v2 from "../../Assets/Room photos/v3.png";
import v3 from "../../Assets/Room photos/v4.png";
import v4 from "../../Assets/Room photos/v5.png";
import v5 from "../../Assets/Room photos/v6.png";
import v6 from "../../Assets/Room photos/v7.png";
import v7 from "../../Assets/Room photos/v8.png";
import v8 from "../../Assets/Room photos/v9.png";
import v9 from "../../Assets/room-gallery-03.jpg";
import LuxuryParallax from "../../Assets/luxury.avif";
import l1 from "../../Assets/room-gallery-07.png";
import l2 from "../../Assets/room-gallery-05.jpg";
import l3 from "../../Assets/room-gallery-03.jpg";

const RoomComponent = ({ selectedRoom }) => {
  const roomData = {
    simple: {
      parallaxImage: SimpleParallax,
      sliders: [
        {
          images: [s1, s2, s3],
          description: {
            heading: "Standard Room",
            capacity: "2 Guests",
            size: "300 sq ft",
            price: "$100 ",
            paragraph:
              " A comfortable, budget-friendly room featuring essential amenities such as a cozy bed, en-suite bathroom, TV, and free Wi-Fi. Ideal for solo travelers or couples seeking a convenient stay.",
          },
        },
        {
          images: [s4, s5, s6],
          description: {
            heading: "Classic Room",
            capacity: "2 Guests",
            size: "300 sq ft",
            price: "$100 ",
            paragraph: "A warm and inviting room with all basic amenities, including a queen bed, work desk, and complimentary toiletries. Suitable for guests who appreciate simplicity with a touch of style.",
          },
        },
        {
          images: [s7, s8, s9],
          description: {
            heading: "Economy Room",
            capacity: "2 Guests",
            size: "300 sq ft",
            price: "$100 ",
            paragraph: " A compact room designed for budget-conscious travelers. Includes a double bed, small workspace, and access to hotel facilities like Wi-Fi and breakfast service.",
          },
        },
      ],
    },
    vip: {
      parallaxImage: VipParallax,
      sliders: [
        {
          images: [v1, v2, v3],
          description: {
            heading: "Executive Room",
            capacity: "3 Guests",
            size: "400 sq ft",
            price: "$150",
            paragraph: "A spacious room tailored for business travelers, featuring a king bed, work desk, and ergonomic chair. Includes additional amenities like a minibar, daily newspaper, and city views.",
          },
        },
        {
          images: [v4, v5, v6],
          description: {
            heading: "Deluxe Room",
            capacity: "3 Guests",
            size: "400 sq ft",
            price: "$150",
            paragraph: " A refined space with elegant decor, offering a king or queen-sized bed, premium linens, and a larger seating area. Perfect for guests seeking comfort with a touch of luxury.",
          },
        },
        {
          images: [v7, v8, v9],
          description: {
            heading: "Superior Room",
            capacity: "3 Guests",
            size: "400 sq ft",
            price: "$150 ",
            paragraph: "A well-appointed room with enhanced amenities such as a coffee maker, plush bedding, and a spacious bathroom. Ideal for guests looking for a blend of comfort and style.",
          },
        },
      ],
    },
    luxury: {
      parallaxImage: LuxuryParallax,
      sliders: [
        {
          images: [l1, l2, l3],
          description: {
            heading: "Presidential Suite",
            capacity: "4 Guests",
            size: "500 sq ft",
            price: "$200 ",
            paragraph:
              "The epitome of luxury, featuring a separate living area, master bedroom, and a lavish bathroom with a jacuzzi. Includes VIP services like a personal butler and private dining options.",
          },
        },
        {
          images: [l1, l2, l3],
          description: {
            heading: "Royal Suite",
            capacity: "4 Guests",
            size: "500 sq ft",
            price: "$200",
            paragraph: "A grand suite with exquisite furnishings, offering panoramic views, a king-sized bed, and a spacious living room. Includes premium amenities like a sound system, high-end toiletries, and access to exclusive lounge areas.",
          },
        },
        {
          images: [l1, l2, l3],
          description: {
            heading: "Penthouse Suite",
            capacity: "4 Guests",
            size: "500 sq ft",
            price: "$200",
            paragraph: "Located on the top floor, this suite provides stunning views of the city or ocean. Features include a private terrace, multiple bedrooms, and luxurious decor. Designed for those seeking an exclusive and indulgent stay experience.",
          },
        },
      ],
    },
  };

  const room = roomData[selectedRoom];

  return (
    <div>
     <div className="parallax-image-container">
      <Parallax className="parallax" 
        bgImage={room.parallaxImage}
            strength={500}
            bgImageStyle={{ height: '100%', width: '100%', objectFit: 'cover' }} >      
          <div style={{ height: '100vh', position: 'relative' }}>
            <div className="overlay" />
            <h1 className="contact-title">{selectedRoom.toUpperCase()} ROOM</h1>
          </div>
      </Parallax>
      </div>
      

      <div className="room-slider-section">
        {room.sliders.map((slider, index) => (
          <div key={index} className="slider-container">
            <CustomCarousel>
              {slider.images.map((image, imgIndex) => (
                <div className="slider__item" key={imgIndex}>
                  <img src={image} alt={`slider-${index}-${imgIndex}`} />
                </div>
              ))}
            </CustomCarousel>
            <div className="slider-right">
              <h2>{slider.description.heading}</h2>
              <p><span className="pHeading">Capacity: </span>{slider.description.capacity}</p>
              <p><span className="pHeading">Size:</span> {slider.description.size}</p>
              <p><span className="pHeading">Price:</span> {slider.description.price}</p>
              <p1>{slider.description.paragraph}</p1>
              {/* <button className="book-suite-button">Book Suite</button> */}

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomComponent;
