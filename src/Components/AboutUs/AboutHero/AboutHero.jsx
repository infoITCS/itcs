import React from "react";
import "./AboutHero.scss";

const AboutHero = () => {
  return (
    <section className="about-hero">
      <div className="hero-background">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
      </div>
      <div className="hero-content">
        <span className="hero-badge">ABOUT ITCS</span>
        <h1 className="hero-title">
          Innovating Technology, <br />
          <span className="gradient-text">Empowering Business</span>
        </h1>
        <p className="hero-description">
          For over two decades, we've been at the forefront of technological innovation,
          delivering cutting-edge solutions that drive business success across Pakistan and beyond.
        </p>
        <div className="hero-stats">
          <div className="stat-item">
            <h3>16+</h3>
            <p>Years Experience</p>
          </div>
          <div className="stat-item">
            <h3>500+</h3>
            <p>Projects Delivered</p>
          </div>
          <div className="stat-item">
            <h3>200+</h3>
            <p>Happy Clients</p>
          </div>
          <div className="stat-item">
            <h3>50+</h3>
            <p>Team Members</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;

