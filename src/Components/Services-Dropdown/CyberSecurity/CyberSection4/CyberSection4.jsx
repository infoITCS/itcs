import React from "react";
import "./CyberSection4.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faCertificate, faShield, faTools, faHeadset, faLock } from '@fortawesome/free-solid-svg-icons';

const CyberSection4 = () => {
  const benefits = [
    { icon: faMapMarkerAlt, title: 'Local Expertise', description: 'On-ground presence in Pakistan with deep understanding of local market needs' },
    { icon: faCertificate, title: 'Certified Professionals', description: 'Team of certified cybersecurity experts with international credentials' },
    { icon: faShield, title: 'Proven Track Record', description: 'Successfully secured 500+ businesses across various industries' },
    { icon: faTools, title: 'Tailored Solutions', description: 'Customized security strategies designed for your specific business requirements' },
    { icon: faLock, title: 'Advanced Technology', description: 'Latest security tools and technologies for maximum protection' },
    { icon: faHeadset, title: '24/7 Support', description: 'Round-the-clock security monitoring and incident response' }
  ];

  return (
    <div className="cyberSection4">
      <div className="cyberSection4-wrapper">
        <div className="cyberSection4-content">
          <h2>Why Choose ITCS for Your Cybersecurity?</h2>
          <p>
            ITCS is a leading cybersecurity provider in Pakistan with a team of certified 
            professionals and industry experts. We help organizations protect their digital 
            assets from evolving cyber threats. Our team will assess your security posture, 
            identify vulnerabilities, and implement robust solutions accordingly.
          </p>
          
          <div className="benefits-grid">
            {benefits.map((benefit, idx) => (
              <div className="benefit-item" key={idx}>
                <div className="benefit-icon">
                  <FontAwesomeIcon icon={benefit.icon} />
                </div>
                <div className="benefit-text">
                  <strong>{benefit.title}</strong>
                  <span>{benefit.description}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CyberSection4;