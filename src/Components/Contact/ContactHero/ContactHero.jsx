import React from "react";
import "./ContactHero.scss";

const ContactHero = () => {
  return (
    <section className="contact-hero">
      <div className="hero-background">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
      </div>
      <div className="hero-content">
        <span className="hero-badge">GET IN TOUCH</span>
        <h1 className="hero-title">
          Let's Start a <br />
          <span className="gradient-text">Conversation</span>
        </h1>
        <p className="hero-description">
          Have a project in mind? Want to learn more about our services? 
          We're here to help. Reach out and let's build something amazing together.
        </p>
      </div>
    </section>
  );
};

export default ContactHero;

