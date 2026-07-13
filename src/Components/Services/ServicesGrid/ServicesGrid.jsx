import React from "react";
import { useNavigate } from "react-router-dom";
import "./ServicesGrid.scss";
import cloud from "./../../../assets/logos/SCloud.png";
import cybersecurity from "./../../../assets/logos/SCybersecurity.png";
import consulting from "./../../../assets/logos/SConsulting.png";
import enterpriseSol from "./../../../assets/logos/SEnterpriseSol.png";
import itServices from "./../../../assets/logos/SITservices.png";
import networkSolutions from "./../../../assets/logos/SNetworkSolutions.png";
import webDevelopment from "./../../../assets/logos/SNetworkSolutions.png";

const ServicesGrid = () => {
  const navigate = useNavigate();

  const services = [
    {
      logo: cloud,
      title: "Cloud Solutions",
      description: "Unlock Business 4.0 with our Microsoft Cloud partnership for a smooth edge-to-cloud transformation",
      path: "/cloud",
      features: ["Azure Migration", "Cloud Security", "Cost Optimization"]
    },
    {
      logo: cybersecurity,
      title: "Cybersecurity",
      description: "Cybersecurity: a growth imperative in today's expanding digital threat landscape.",
      path: "/cybersecurity",
      features: ["Threat Detection", "Security Audits", "Incident Response"]
    },
    {
      logo: consulting,
      title: "IT Consulting",
      description: "Thrive amidst change with a transformative strategy centered on purpose.",
      path: "/consulting",
      features: ["Strategy Planning", "Digital Transformation", "Tech Advisory"]
    },
    {
      logo: enterpriseSol,
      title: "Enterprise Solutions",
      description: "Transform your business with intelligent solutions and a holistic approach to enterprise applications.",
      path: "/enterprise-solutions",
      features: ["ERP Systems", "CRM Solutions", "Business Intelligence"]
    },
    {
      logo: itServices,
      title: "IT Services",
      description: "Expert managed IT services for smooth and efficient technology operations.",
      path: "/it-services",
      features: ["24/7 Support", "Infrastructure Management", "Help Desk"]
    },
    {
      logo: networkSolutions,
      title: "Network Solutions",
      description: "Optimize network performance and security with our comprehensive network solutions.",
      path: "/network-solutions",
      features: ["Network Design", "Performance Monitoring", "Security Implementation"]
    },
    {
      logo: webDevelopment,
      title: "Web Development",
      description: "Build modern, responsive websites and web applications that drive business growth.",
      path: "/web-development",
      features: ["Custom Websites", "E-Commerce", "Web Applications"]
    },
  ];

  return (
    <section className="services-grid-section">
      <div className="services-grid-container">
        <div className="services-grid-header">
          <span className="section-badge">OUR SERVICES</span>
          <h2 className="section-title">What We Do</h2>
          <p className="section-description">
            Transforming businesses through technology with comprehensive solutions 
            tailored to your unique needs
          </p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <div className="service-card" key={index}>
              <div className="card-inner">
                <div className="card-front">
                  <div className="card-icon">
                    <img src={service.logo} alt={service.title} />
                  </div>
                  <h3 className="card-title">{service.title}</h3>
                  <p className="card-description">{service.description}</p>
                  <div className="card-hover-indicator">
                    <span>Hover for details</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                <div className="card-back">
                  <h4 className="back-title">Key Features</h4>
                  <ul className="features-list">
                    {service.features.map((feature, idx) => (
                      <li key={idx}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button
                    className="explore-btn"
                    onClick={() => navigate(service.path)}
                  >
                    Explore Service
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;

