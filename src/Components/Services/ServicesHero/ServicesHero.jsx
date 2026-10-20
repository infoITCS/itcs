import React from "react";
import "./ServicesHero.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocket, faStar, faHeadset } from '@fortawesome/free-solid-svg-icons';

const ServicesHero = () => {
  return (
    <section className="services-hero">
      <div className="hero-content">
        <div className="hero-badge">
          <span className="badge-icon">
            <FontAwesomeIcon icon={faRocket} color="#ffffff" />
          </span>
          <span>WORLD CLASS SERVICES</span>
        </div>

        <h1 className="hero-title">
          Empowering Your Business
          <span className="gradient-text"> Through Technology</span>
        </h1>

        <p className="hero-description">
          Comprehensive IT solutions designed to drive innovation, enhance security,
          and accelerate your digital transformation journey.
        </p>

        <div className="hero-features">
          <div className="feature-item">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Expert Solutions</span>
          </div>
          <div className="feature-item">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Proven Track Record</span>
          </div>
          <div className="feature-item">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>24/7 Support</span>
          </div>
        </div>
      </div>

      <div className="scroll-indicator">
        <span>Scroll to explore</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 5V19M12 19L19 12M12 19L5 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  );
};

export default ServicesHero;

