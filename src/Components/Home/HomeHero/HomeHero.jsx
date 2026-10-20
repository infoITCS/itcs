import React from 'react';
import './HomeHero.scss';
import { Link } from 'react-router-dom';

const HomeHero = () => {
  return (
    <section className="home-hero">
      <div className="hero-background">
        <div className="hero-grid"></div>
        <div className="hero-orb hero-orb-1"></div>
        <div className="hero-orb hero-orb-2"></div>
        <div className="hero-orb hero-orb-3"></div>
      </div>

      <div className="hero-container">
        <div className="hero-badge">
          <span className="badge-icon">⚡</span>
          <span>PAKISTAN'S TOP MICROSOFT CSP TIER-1 DIRECT PARTNER</span>
        </div>

        <h1 className="hero-title">
          Want to Unlock Business 4.0 with
          <span className="gradient-text"> Smarter Tech?</span>
        </h1>

        <p className="hero-description">
          At ITCS, we help organizations solve complex technology challenges
          through cloud solutions, cybersecurity, network infrastructure, enterprise
          systems, IT support, web development, and managed services—so your
          systems stop holding you back and start driving business performance in
          a way that matters.
        </p>

        <div className="hero-actions">
          <Link to="/services" className="btn-primary">
            Get Started
            <span className="btn-arrow"> →</span>
          </Link>
          <Link to="/contact" className="btn-secondary">
            Learn More
            <span className="btn-icon"> ▶</span>
          </Link>
        </div>

        <div className="hero-stats">
          <div className="stat-item">
            <div className="stat-number">16+</div>
            <div className="stat-label">Years Experience</div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <div className="stat-number">497+</div>
            <div className="stat-label">Satisfied Clients</div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <div className="stat-number">954+</div>
            <div className="stat-label">Projects Completed</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;

