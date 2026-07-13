import React from 'react';
import './CyberHero.scss';
import { useNavigate } from 'react-router-dom';

const CyberHero = () => {
  const navigate = useNavigate();

  return (
    <section className="cyber-hero">
      <div className="hero-background">
        <div className="cyber-grid"></div>
        <div className="shield-icon shield-1" style={{ position: 'absolute', top: '15%', left: '15%', fontSize: '50px', opacity: '0.1' }}>🛡️</div>
        <div className="shield-icon shield-2" style={{ position: 'absolute', top: '65%', right: '10%', fontSize: '50px', opacity: '0.1' }}>🔒</div>
        <div className="shield-icon shield-3" style={{ position: 'absolute', bottom: '15%', left: '50%', fontSize: '50px', opacity: '0.1' }}>🔐</div>
      </div>

      <div className="hero-container">
        <div className="hero-badge">
          <span className="badge-icon">🛡️</span>
          <span>PROTECT WHAT MATTERS</span>
        </div>

        <h1 className="hero-title">
          Cybersecurity That Stops
          <span className="gradient-text"> Threats Before They Start</span>
        </h1>

        <p className="hero-description">
          Cybersecurity has evolved beyond compliance and risk management - it has become a key factor
          in driving business growth and success. In today's increasingly digitized world, cybersecurity
          is critical for protecting your digital assets and ensuring business continuity.
        </p>

        <div className="hero-actions">
          <button className="btn-secondary" onClick={() => navigate('/cybersecurity/assessment')}>
            Security Assessment
            <span className="btn-icon">▶</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default CyberHero;
