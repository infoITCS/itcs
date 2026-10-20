import React from 'react';
import './CyberFeatures.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faLock, faShieldAlt, faEye, faBolt, faCloud } from '@fortawesome/free-solid-svg-icons';

const CyberFeatures = () => {
  const features = [
    {
      icon: faShieldAlt,
      title: 'Cybersecurity Consulting',
      description: 'Discover the ultimate fit for your specific cybersecurity requirements with our tailor-made solutions.'
    },
    {
      icon: faLock,
      title: 'Digital Identity Management',
      description: 'Enhance the security of your identity and access management with expert consulting.'
    },
    {
      icon: faEye,
      title: 'Security as a Service',
      description: 'Elevate your business security level with our platform-centric approach.'
    },
    {
      icon: faCloud,
      title: 'Secure Cloud Transformation',
      description: 'Stay ahead of cyber threats with our Cloud Security Services solution.'
    },
    {
      icon: faSearch,
      title: 'Vulnerability Management',
      description: 'Strengthen your defense against cyber attacks with vulnerability assessment.'
    },
    {
      icon: faBolt,
      title: 'Zero Trust Security',
      description: 'Protect your digital assets by modernizing and securing user access.'
    }
  ];

  return (
    <section className="cyber-features">
      <div className="features-container">
        <div className="features-header">
          <span className="section-badge">OUR SERVICES</span>
          <h2 className="section-title">Ensuring Business Growth through Proactive Cybersecurity</h2>
          <p className="section-description">
            In today's dynamic digital landscape, cybersecurity is critical for driving business growth 
            and success. With the threat perimeter constantly expanding, we provide robust cybersecurity 
            measures to protect your organization.
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div className="feature-card" key={index}>
              <div className="card-icon">
                <FontAwesomeIcon icon={feature.icon} />
              </div>
              <h3 className="card-title">{feature.title}</h3>
              <p className="card-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CyberFeatures;