import React from "react";
import "./HomeFeature.scss";

const HomeFeature = () => {
  const features = [
    {
      title: "Industry-Leading Expertise",
      description: "Our team consists of highly skilled, globally certified engineers, consultants, and technology specialists who continuously upskill across cloud, cybersecurity, networking, enterprise systems, and emerging technologies to deliver best-in-class solutions and support.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="7" />
          <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
        </svg>
      )
    },
    {
      title: "Trusted by Industry Leaders",
      description: "From enterprise organizations to fast-growing businesses, leading companies trust ITCS to power critical infrastructure, secure operations, and drive digital transformation.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 11 2 2 4-4" />
        </svg>
      )
    },
    {
      title: "End-To-End Technology Partner",
      description: "From cloud and cybersecurity to managed IT services, enterprise solutions, networking, and digital innovation, we provide everything your business needs under one roof.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
      )
    },
    {
      title: "Business-First Approach",
      description: "We don't just deploy technology—we help organizations improve efficiency, reduce risk, increase productivity, and create lasting competitive advantage.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
          <polyline points="17 6 23 6 23 12" />
        </svg>
      )
    }
  ];

  return (
    <section className="home-feature">
      <div className="feature-container">
        <div className="feature-header">
          <span className="feature-badge">WHY CHOOSE US</span>
          <h2 className="feature-title">Why Leading Organizations Choose ITCS</h2>
          <p className="feature-description">
            Technology is only as powerful as the people behind it. At ITCS, we combine certified expertise, strategic thinking, and hands-on experience to help businesses stay secure, agile, and competitive.
          </p>
        </div>

        <div className="feature-grid">
          {features.map((feature, index) => (
            <div className="feature-item" key={index}>
              <div className="item-icon">
                {feature.icon}
              </div>
              <div className="item-content">
                <h4 className="item-title">{feature.title}</h4>
                <p className="item-description">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="feature-footer-highlights">
          <p className="highlight-text">
            <strong>15+ Years of Experience.</strong> Certified Experts. Proven Results. Technology That Moves Your Business Forward.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HomeFeature;
