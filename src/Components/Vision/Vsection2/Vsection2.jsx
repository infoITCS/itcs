import React from "react";
import "./Vsection2.scss";
import islamicimg from "./../../../assets/images/islamic-ideology.webp";
const Vsection2 = () => {
  const cardsData = [
    {
      title: "Mission Statement",
      description:
        "Our Mission is to uplift businesses with advanced technology solutions and skilled consulting services, helping them reach their strategic objectives and navigate their digital evolution",
    },
    {
      title: "Vision Statement",
      description:
        "Our vision is to be the global frontrunners in IT consulting, services, and solutions. We're dedicated to delivering real business value through our expertise and innovative approach. Let's forge lasting partnerships based on trust, respect, and shared success.",
    },
    {
      title: "Our Core Values",
      description:
        "Our Ethos is based on the Egalitarian principles and Teachings of ISLAM.",
    },
  ];
  return (
    <>
      <div className="rotatable-cards">
        <h2>Our Philosophy</h2>
        <p>
          Our customer-centered approach relies on driving progress through
          collaboration.
        </p>
        <div className="cards-container">
          {cardsData.map((card, index) => (
            <div key={index} className="card">
              <div className="card-inner">
                <div className="card-front">
                  <h3>{card.title}</h3>
                </div>
                <div className="card-back">
                  <p>{card.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="second-section">
        <div className="northstar">
          <div className="islamic-ideology">
            <h5>OUR NORTHSTAR</h5>
            <h2>ISLAMIC IDEOLOGY</h2>
            <p>
              We, at ITCS, steadfastly adhere to the principles of Islam in our
              dealings. We shall never resort to bribery, falsehoods, deceit, or
              the allure of interest. Our commitment to honest dealings knows no
              compromise. From our very inception, we have held these principles
              dear, and, God willing, we shall maintain this unwavering course
              for all time.
            </p>
          </div>
          <div className="islamic-img">
            <img src={islamicimg} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Vsection2;
