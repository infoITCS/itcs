import React from "react";
import "./CareerHero.scss";

const CareerHero = () => {
  return (
    <section className="career-hero">
      <div className="hero-background">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>
      <div className="hero-content">
        <span className="hero-badge">WE'RE HIRING</span>
        <h1 className="hero-title">
          Build Your Future <br />
          <span className="gradient-text">With Us</span>
        </h1>
        <p className="hero-description">
          Join a team of passionate innovators shaping the future of technology.
          Explore opportunities where your talent meets purpose.
        </p>
        <div className="hero-buttons">
          <a href="#positions" className="btn-primary">View Open Positions</a>
        </div>
        <div className="hero-stats">
          <div className="stat">
            <h3>50+</h3>
            <p>Team Members</p>
          </div>
          <div className="stat">
            <h3>15+</h3>
            <p>Open Positions</p>
          </div>
          <div className="stat">
            <h3>20+</h3>
            <p>Companies</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareerHero;

