import React from "react";
import "./CareerSection1.scss";
import careerImage from "./../../../assets/images/career-section1-img.webp";
const CareerSection1 = () => {
  return (
    <>
      {" "}
      <section className="career-section">
        <div className="content">
          <h2>Career Opportunities</h2>
        </div>
        <div className="image1">
          <img src={careerImage} alt="Career Opportunities" />
        </div>
      </section>
    </>
  );
};

export default CareerSection1;
