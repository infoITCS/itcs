import React from 'react';
import './CyberCTA.scss';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const CyberCTA = () => {
  const navigate = useNavigate();
  
  return (
    <section className="cyber-cta">
      <div className="cta-container">
        <div className="cta-content">
          <h2 className="cta-title">
            Let's Discuss Your <span className="gradient-text">Security</span>
          </h2>
          <p className="cta-description">
            Get free consultation and let us know your security requirements. 
            ITCS strives to provide its customers with the best possible cybersecurity solutions.
          </p>
          <div className="cta-actions">
            <button className="btn-primary" onClick={() => navigate('/contact')}>
              Get Free Consultation
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
        </div>

        <div className="cta-stats">
          <div className="stat-item">
            <div className="stat-number">500+</div>
            <div className="stat-label">Businesses Secured</div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <div className="stat-number">99.9%</div>
            <div className="stat-label">Uptime</div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <div className="stat-number">24/7</div>
            <div className="stat-label">Monitoring</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CyberCTA;