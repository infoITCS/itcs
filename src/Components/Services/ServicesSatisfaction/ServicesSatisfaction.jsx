import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import "./ServicesSatisfaction.scss";
import monumentImage from "./../../../assets/images/services-side.webp";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud, faLock, faBuilding, faCog, faNetworkWired, faBriefcase } from '@fortawesome/free-solid-svg-icons';

const ServicesSatisfaction = () => {
  const [progressValues, setProgressValues] = useState(Array(6).fill(0));

  const satisfactionData = [
    { title: "Cloud Solutions", percentage: 97, icon: faCloud },
    { title: "Cybersecurity", percentage: 82, icon: faLock },
    { title: "Enterprise Solutions", percentage: 87, icon: faBuilding },
    { title: "IT Services", percentage: 89, icon: faCog },
    { title: "Network Solutions", percentage: 80, icon: faNetworkWired },
    { title: "Consulting", percentage: 92, icon: faBriefcase },
  ];


  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  useEffect(() => {
    if (inView) {
      satisfactionData.forEach((item, index) => {
        let currentProgress = 0;
        const targetProgress = item.percentage;
        const stepDuration = 10;

        const interval = setInterval(() => {
          if (currentProgress < targetProgress) {
            currentProgress += 1;
            setProgressValues((prev) => {
              const newValues = [...prev];
              newValues[index] = currentProgress;
              return newValues;
            });
          } else {
            clearInterval(interval);
          }
        }, stepDuration);
      });
    }
  }, [inView]);

  return (
    <section className="services-satisfaction" ref={ref}>
      <div className="satisfaction-container">
        <div className="satisfaction-content">
          <span className="section-badge">CUSTOMER SATISFACTION</span>
          <h2 className="section-title">Delighted Customers</h2>
          <p className="section-description">
            We are proud to have achieved the highest ranking in a survey of over
            100 C-level executives from top IT firms in Pakistan, as evidenced by
            our exceptional overall satisfaction scores.
          </p>

          <div className="satisfaction-scores">
            {satisfactionData.map((item, index) => (
              <div key={index} className="satisfaction-item">
                <div className="item-header">
                  <div className="item-info">
                    <span className="item-icon">
                      <FontAwesomeIcon icon={item.icon} color="#ffffff" />
                    </span>
                    <span className="item-title">{item.title}</span>
                  </div>
                  <span className="item-percentage">
                    {progressValues[index]}%
                  </span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress"
                    style={{
                      width: `${progressValues[index]}%`,
                    }}
                  >
                    <div className="progress-glow"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="satisfaction-stats">
            <div className="stat-item">
              <div className="stat-number">100+</div>
              <div className="stat-label">C-Level Executives Surveyed</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-number">88%</div>
              <div className="stat-label">Average Satisfaction</div>
            </div>
          </div>
        </div>

        <div className="satisfaction-image">
          <div className="image-decoration"></div>
          <img src={monumentImage} alt="Customer Satisfaction" />
          <div className="image-overlay"></div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSatisfaction;

