import React from "react";
import "./CloudSection4.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faCertificate, faAward, faTools, faCoins, faHeadset } from '@fortawesome/free-solid-svg-icons';

const CloudSection4 = () => {
  const benefits = [
    { icon: faMapMarkerAlt, title: 'Local Expertise', description: 'On-ground presence in Pakistan with deep understanding of local market needs' },
    { icon: faCertificate, title: 'Microsoft Certified', description: 'Gold partner with certified professionals and trainers' },
    { icon: faAward, title: 'Proven Track Record', description: 'Successfully delivered 500+ cloud projects across various industries' },
    { icon: faTools, title: 'Tailored Solutions', description: 'Customized cloud strategies designed for your specific business requirements' },
    { icon: faCoins, title: 'Cost Optimization', description: 'Maximize ROI with efficient cloud spend management and resource optimization' },
    { icon: faHeadset, title: '24/7 Support', description: 'Round-the-clock expert assistance for all your cloud infrastructure needs' }
  ];

  return (
    <div className="cloudSection4">
      <div className="cloudSection4-wrapper">
        <div className="cloudSection4-content">
          <h2>Why Choose ITCS for Your Cloud Journey?</h2>
          <p>
            ITCS is Microsoft Gold Partner and value-added reseller working as 
            Microsoft Cloud Service Provider (CSP – Tier 1) in Pakistan. We have 
            a qualified team with Microsoft-certified trainers and professional 
            industry experts to help you deploy Microsoft Azure in your business 
            organization. Our team will discuss your business requirements, 
            available resources, and cost and then customize the solution accordingly.
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

export default CloudSection4;