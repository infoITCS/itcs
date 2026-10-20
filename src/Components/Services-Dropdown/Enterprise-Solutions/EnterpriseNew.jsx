import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../_shared/service-common.scss';
import './EnterpriseNew.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faChartLine, faHandshake, faCogs, faUsers, faNetworkWired, faCloud, faDatabase } from '@fortawesome/free-solid-svg-icons';
import PartnerLogos from '../_shared/PartnerLogos/PartnerLogos';
import { faMicrosoft, faAws } from '@fortawesome/free-brands-svg-icons';

const enterprisePartners = [
  { icon: faMicrosoft, name: 'Microsoft Enterprise', type: 'Gold Partner', description: 'Enterprise licensing and solutions partner for Dynamics 365, Power Platform, and Azure enterprise services.', status: 'Verified Partner' },
  { icon: faAws, name: 'AWS Enterprise', type: 'Advanced Partner', description: 'AWS enterprise partner delivering scalable cloud infrastructure and digital transformation solutions.', status: 'Verified Partner' },
  { icon: faBuilding, name: 'SAP Integration', type: 'Implementation Partner', description: 'Certified SAP integration partner for enterprise resource planning and business process optimization.', status: 'Verified Partner' },
];

const EnterpriseHero = () => {
  const navigate = useNavigate();
  
  return (
    <section className="enterprise-hero-section">
      <div className="hero-badge">
        <FontAwesomeIcon icon={faBuilding} />
        <span>ENTERPRISE SOLUTIONS</span>
      </div>
      <h1 className="hero-title">
        Enterprise Solutions for<br />
        <span className="gradient-text">Business Growth</span>
      </h1>
      <p className="hero-description">
        Transform your business with comprehensive enterprise solutions. 
        We help organizations streamline operations, enhance efficiency, and make data-driven decisions.
      </p>
      <div className="hero-actions">
        <button className="btn-secondary" onClick={() => navigate('/contact')}>
          Explore Solutions
          <span>→</span>
        </button>
      </div>
    </section>
  );
};

const EnterpriseSection2 = () => {
  const services = [
    { icon: faChartLine, title: 'Business Intelligence', desc: 'Data-driven insights for better decisions' },
    { icon: faCogs, title: 'Process Automation', desc: 'Automate workflows for efficiency' },
    { icon: faNetworkWired, title: 'System Integration', desc: 'Connect all your business systems' },
    { icon: faUsers, title: 'Team Collaboration', desc: 'Enhance team productivity' }
  ]

  return (
    <div className='enterpriseSection2'>
      <div className="enterpriseSection2-wrapper">
        <div className="content-side">
          <h2>Comprehensive Enterprise Solutions</h2>
          <p>Transform your business with our end-to-end enterprise solutions. We deliver scalable, integrated systems tailored to meet your specific business requirements.</p>
          <p>From small businesses to large enterprises, our solutions grow with you, providing the tools you need to succeed in today's competitive market.</p>
          
          <div className="services-list">
            {services.map((item, idx) => (
              <div className="service-item" key={idx}>
                <div className="service-icon">
                  <FontAwesomeIcon icon={item.icon} />
                </div>
                <div>
                  <strong>{item.title}</strong>
                  <span>{item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="image-side">
          <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600" alt="Enterprise Solutions" />
        </div>
      </div>
    </div>
  )
}

const EnterpriseFeatures = () => {
  const features = [
    { icon: faBuilding, title: 'ERP Solutions', description: 'Enterprise resource planning for streamlined operations' },
    { icon: faDatabase, title: 'Data Management', description: 'Secure and efficient data storage solutions' },
    { icon: faCloud, title: 'Cloud Integration', description: 'Seamless cloud migration and integration' },
    { icon: faCogs, title: 'Process Automation', description: 'Automate business processes for efficiency' },
    { icon: faUsers, title: 'Team Management', description: 'Tools for effective team collaboration' },
    { icon: faChartLine, title: 'Analytics', description: 'Business intelligence and analytics' }
  ];

  return (
    <section className="enterprise-features-section">
      <div className="section-header">
        <h2>Our Enterprise Solutions</h2>
        <p>Powerful tools to transform your business</p>
      </div>
      <div className="features-grid">
        {features.map((feature, idx) => (
          <div className="feature-card" key={idx}>
            <div className="card-icon">
              <FontAwesomeIcon icon={feature.icon} />
            </div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const EnterpriseSection4 = () => {
  const benefits = [
    { title: 'Scalable Solutions', description: 'Grow your business with flexible systems' },
    { title: 'Expert Support', description: 'Team of certified professionals' },
    { title: 'Data Security', description: 'Enterprise-grade security measures' },
    { title: '24/7 Monitoring', description: 'Round-the-clock system support' }
  ];

  return (
    <div className="enterpriseSection4">
      <div className="section-header">
        <h2>Why Choose ITCS for Enterprise?</h2>
        <p>Trusted by leading enterprises</p>
      </div>
      <div className="benefits-grid">
        {benefits.map((benefit, idx) => (
          <div className="benefit-item" key={idx}>
            <div className="benefit-check">✓</div>
            <div className="benefit-text">
              <strong>{benefit.title}</strong>
              <span>{benefit.description}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const EnterpriseCTA = () => {
  const navigate = useNavigate();
  
  return (
    <section className="enterprise-cta">
      <div className="cta-container">
        <h2>
          Let's Discuss Your <span className="gradient-text">Project</span>
        </h2>
        <p>Get free consultation and transform your business with enterprise solutions.</p>
        <button className="btn-primary" onClick={() => navigate('/contact')}>
          Get Free Consultation
          <span>→</span>
        </button>
        <div className="cta-stats">
          <div className="stat-item">
            <div className="stat-number">150+</div>
            <div className="stat-label">Clients</div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <div className="stat-number">99.5%</div>
            <div className="stat-label">Uptime</div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <div className="stat-number">50M+</div>
            <div className="stat-label">Transactions</div>
          </div>
        </div>
      </div>
    </section>
  );
};

const EnterpriseNew = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <EnterpriseHero />
      <EnterpriseSection2 />
      <EnterpriseFeatures />
      <PartnerLogos partners={enterprisePartners} />
      <EnterpriseSection4 />
      <EnterpriseCTA />
    </>
  );
};

export default EnterpriseNew;