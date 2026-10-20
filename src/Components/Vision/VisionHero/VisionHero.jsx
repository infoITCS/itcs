import React from "react";
import "./VisionHero.scss";

const VisionHero = () => {
  return (
    <section className="vision-hero">
      <div className="hero-background">
        <div className="animated-grid"></div>
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>
      <div className="hero-content">
        <h1 className="hero-title">
          Our <span className="gradient-text">Vision</span> & <span className="gradient-text">Mission</span>
        </h1>
        <p className="hero-subtitle">
          Shaping the future of technology, one innovation at a time
        </p>
      </div>
    </section>
  );
};

export default VisionHero;

