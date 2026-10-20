import React from 'react';
import './CloudHero.scss';
import { useNavigate } from 'react-router-dom';

const CloudHero = () => {
  const navigate = useNavigate();
  
  return (
    <section className="cloud-hero">
      <div className="hero-background">
        <div className="hero-grid"></div>
        <div className="floating-cloud cloud-1">☁️</div>
        <div className="floating-cloud cloud-2">☁️</div>
        <div className="floating-cloud cloud-3">☁️</div>
      </div>

      <div className="hero-container">
        <div className="hero-badge">
          <span className="badge-icon">☁️</span>
          <span>MICROSOFT GOLD PARTNER</span>
        </div>

        <h1 className="hero-title">
          Empower Your Business with<br />
          <span className="gradient-text">ITCS Cloud Solutions</span>
        </h1>

        <p className="hero-description">
          Welcome to ITCS, your premier partner for cloud solutions powered by Microsoft. 
          As a Microsoft Gold Partner, we bring you a suite of cloud services designed to 
          elevate your business, featuring Azure, Microsoft 365, and professional web hosting.
        </p>

        <div className="hero-actions">
          <button className="btn-primary" onClick={() => navigate('/contact')}>
            Get Started
            <span className="btn-arrow">→</span>
          </button>
          <button className="btn-secondary" onClick={() => navigate('/services')}>
            View All Services
            <span className="btn-icon">▶</span>
          </button>
        </div>

        <div className="hero-badges-row">
          <div className="badge-item">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Microsoft Certified</span>
          </div>
          <div className="badge-item">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
              <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span>24/7 Support</span>
          </div>
          <div className="badge-item">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 15C15.866 15 19 11.866 19 8C19 4.13401 15.866 1 12 1C8.13401 1 5 4.13401 5 8C5 11.866 8.13401 15 12 15Z" stroke="currentColor" strokeWidth="2"/>
              <path d="M8.21 13.89L7 23L12 20L17 23L15.79 13.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Proven Expertise</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CloudHero;