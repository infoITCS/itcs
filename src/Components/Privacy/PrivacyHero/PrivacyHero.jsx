import React from "react";
import "./PrivacyHero.scss";

const PrivacyHero = () => {
  return (
    <section className="privacy-hero">
      <div className="hero-background">
        <div className="animated-grid"></div>
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
      </div>
      <div className="hero-content">
        <span className="hero-badge">LEGAL</span>
        <h1 className="hero-title">
          Privacy <span className="gradient-text">Policy</span>
        </h1>
        <p className="hero-subtitle">
          How ITCS collects, uses, and protects your personal information
        </p>
      </div>
    </section>
  );
};

export default PrivacyHero;
