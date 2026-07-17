import React from "react";
import "./Csection2.scss";
import technicalSupport from "./../../../assets/logos/support-icon.webp";
import phoneIcon from "./../../../assets/logos/phone-icon.webp";
import mailIcon from "./../../../assets/logos/email-icon.webp";

const Csection2 = () => {
  const cardData = [
    {
      imgSrc: technicalSupport,
      title: "Technical Support",
      buttonText: "Create a Ticket",
      link: "https://support.itcs.com.pk/?_gl=1*1k28ai4*_ga*NzQyNDA5Njg4LjE3MzQ2MDk0MTY.*_ga_7DHSEEDY6N*MTczNzAwMTU3Ni40Mi4xLjE3MzcwMDE2MDEuMC4wLjA.",
    },
    {
      imgSrc: phoneIcon,
      title: "UAN",
      buttonText: "Call us : 021111482711",
      link: "tel:021111482711",
    },
    {
      imgSrc: mailIcon,
      title: "Mail Us 24/7",
      buttonText: "info@itcs.com.pk",
      link: "mailto:info@itcs.com.pk",
    },
  ];

  return (
    <div className="Csection2">
      <h6>IT Consulting and Services</h6>
      <h2>Need immediate assistance?</h2>
      <p className="text">
        Get assistance with tracking an order, requesting a quote, contacting
        your account representative and more
      </p>

      <div className="cards">
        {cardData.map((card, index) => (
          <div className="card" style={{ width: "20rem" }} key={index}>
            <img src={card.imgSrc} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{card.title}</h5>
              <a href={card.link} className="btn">
                {card.buttonText}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Csection2;
