import React, { useState, useEffect } from "react";
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
      description: "Unlock Business 4.0 with our Microsoft Cloud partnership for a smooth edge-to-cloud transformation.",
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
    {
      isSvg: true,
      svg: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      ),
      title: "Web Development",
      description: "Build modern, responsive websites and web applications that drive business growth.",
      path: "/services/web-development",
    }
  ];

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getVisibleCount = () => {
    if (windowWidth <= 640) return 1;
    if (windowWidth <= 992) return 2;
    return 3;
  };

  const visibleCount = getVisibleCount();
  const gap = 30; // matches SCSS gap
  const maxIndex = solutions.length - visibleCount;

  const [isPaused, setIsPaused] = useState(false);

  // Auto-scroll logic
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 3500);

    return () => clearInterval(timer);
  }, [maxIndex, isPaused, currentIndex]);

  // Make sure currentIndex stays in valid range when window resizes
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [visibleCount, currentIndex, maxIndex]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  return (
    <section className="home-solutions">
      <div className="solutions-container">
        <div className="solutions-header">
          <span className="feature-badge">OUR SERVICES</span>
          <h2 className="section-title">16+ Years of Industry Experience</h2>
          <p className="section-description">
            We uphold the virtues of superior functional resources and excellent
            customer services with the prime objective of fostering value enablement
            systems, since 2010.
          </p>
        </div>

        <div className="carousel-controls">
          <button className="carousel-nav-btn prev" onClick={prevSlide} aria-label="Previous service">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button className="carousel-nav-btn next" onClick={nextSlide} aria-label="Next service">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        <div
          className="solutions-carousel-wrapper"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="carousel-track-container">
            <div
              className="solutions-carousel-track"
              style={{
                transform: `translateX(calc(-${(currentIndex * 100) / visibleCount}% - ${(currentIndex * gap) / visibleCount}px))`,
                gap: `${gap}px`
              }}
            >
              {solutions.map((solution, index) => (
                <div
                  className="solution-card-container"
                  key={index}
                  style={{
                    width: `calc((100% - ${(visibleCount - 1) * gap}px) / ${visibleCount})`,
                    flexShrink: 0
                  }}
                >
                  <div className="solution-card" onClick={() => navigate(solution.path)}>
                    <div className="card-content-wrapper">
                      <div className="card-icon-container">
                        {solution.isSvg ? (
                          <div className="svg-icon-wrapper">{solution.svg}</div>
                        ) : (
                          <img src={solution.logo} alt={solution.title} />
                        )}
                      </div>
                      <h3 className="card-title">{solution.title}</h3>
                      <p className="card-description">{solution.description}</p>

                      <div className="card-action-link">
                        <span>Explore Solution</span>
                        <svg className="action-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeSolutions;
