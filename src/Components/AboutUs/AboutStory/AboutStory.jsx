import React from "react";
import "./AboutStory.scss";
import aboutImage from "./../../../assets/images/About.webp";


const AboutStory = () => {
  return (
    <section className="about-story">
      <div className="story-container">
        <div className="story-content">
          <span className="section-badge">OUR STORY</span>
          <h2>Building the Future Since 2000</h2>
          <p className="lead-text">
            ITCS was founded with a simple yet powerful vision: to bridge the gap between 
            businesses and technology. What started as a small IT services company has grown 
            into a comprehensive technology solutions provider.
          </p>
          <div className="story-points">
            <div className="point-item">
              <div className="point-icon">✓</div>
              <div className="point-content">
                <h4>Expert Team</h4>
                <p>Certified professionals with decades of combined experience</p>
              </div>
            </div>
            <div className="point-item">
              <div className="point-icon">✓</div>
              <div className="point-content">
                <h4>Proven Track Record</h4>
                <p>Successfully delivered 500+ projects across various industries</p>
              </div>
            </div>
            <div className="point-item">
              <div className="point-icon">✓</div>
              <div className="point-content">
                <h4>Customer-Centric</h4>
                <p>Building lasting partnerships through exceptional service</p>
              </div>
            </div>
          </div>
        </div>
        <div className="story-image">
          <div className="image-wrapper">
            <img src={aboutImage} alt="About ITCS" />
            <div className="image-decoration"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutStory;

