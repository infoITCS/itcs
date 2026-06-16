import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomeSolutions.scss";
import cloud from "./../../../assets/logos/Cloud.png";
import cybersecurity from "./../../../assets/logos/Cybersecurity.png";
import consulting from "./../../../assets/logos/Consulting.png";
import enterpriseSol from "./../../../assets/logos/EnterpriseSol.png";
import itServices from "./../../../assets/logos/ITservices.png";
import networkSolutions from "./../../../assets/logos/NetworkSolutions.png";

const HomeSolutions = () => {
  const navigate = useNavigate();

  const solutions = [
    {
      logo: cloud,
      title: "Cloud",
      description: "Unlock Business 4.0 with our Microsoft Cloud partnership for a smooth edge-to-cloud transformation",
      path: "/services/cloud",
    },
    {
      logo: cybersecurity,
      title: "Cyber-security",
      description: "Cybersecurity: a growth imperative in today's expanding digital threat landscape.",
      path: "/services/cyber-security",
    },
    {
      logo: consulting,
      title: "Consulting",
      description: "Thrive amidst change with a transformative strategy centered on purpose.",
      path: "/services/consulting",
    },
    {
      logo: enterpriseSol,
      title: "Enterprise Solutions",
      description: "Transform your business with intelligent solutions and a holistic approach to enterprise applications.",
      path: "/services/enterprise-solutions",
    },
    {
      logo: itServices,
      title: "IT Services",
      description: "Expert managed IT services for smooth and efficient technology operations.",
      path: "/services/it-services",
    },
    {
      logo: networkSolutions,
      title: "Network Solutions",
      description: "Optimize network performance and security with our comprehensive network solutions.",
      path: "/services/network-solutions",
    },
  ];

  return (
    <section className="home-solutions">
      <div className="solutions-container">
        <div className="solutions-header">
          <span className="section-badge">WHY CHOOSE US</span>
          <h2 className="section-title">16+ Years of Industry Experience</h2>
          <p className="section-description">
            We uphold the virtues of superior functional resources and excellent
            customer services with the prime objective of fostering value enablement
            systems, since 2011. By deploying problem-focused and solution-centered
            approaches with functional expertise and strategic partnerships with Tier 1
            firms, we ensure customer success.
          </p>
        </div>

        <div className="solutions-grid">
          {solutions.map((solution, index) => (
            <div className="solution-card" key={index}>
              <div className="card-inner">
                <div className="card-front">
                  <div className="card-icon">
                    <img src={solution.logo} alt={solution.title} />
                  </div>
                  <h3 className="card-title">{solution.title}</h3>
                  <p className="card-description">{solution.description}</p>
                </div>
                <div className="card-back">
                  <button
                    className="explore-btn"
                    onClick={() => navigate(solution.path)}
                  >
                    <span>Explore {solution.title}</span>
                    <span className="btn-arrow">→</span>
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

export default HomeSolutions;

