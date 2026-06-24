import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../_shared/service-common.scss';
import './ITServicesNew.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faServer, faNetworkWired, faCloud, faShieldAlt, faHeadset, faClock, faWrench, faTools, faDatabase } from '@fortawesome/free-solid-svg-icons';
import PartnerLogos from '../_shared/PartnerLogos/PartnerLogos';
import { faMicrosoft, faAws, faLinux } from '@fortawesome/free-brands-svg-icons';

const itPartners = [
  { icon: faMicrosoft, name: 'Microsoft Services', type: 'Gold Partner', description: 'Authorized managed services partner for Microsoft 365, Azure, and enterprise support solutions.', status: 'Verified Partner' },
  { icon: faAws, name: 'AWS Managed Services', type: 'Advanced Partner', description: 'AWS managed service provider delivering infrastructure management, monitoring, and optimization.', status: 'Verified Partner' },
  { icon: faLinux, name: 'Linux Foundation', type: 'Technology Partner', description: 'Open-source technology partner for enterprise Linux support, automation, and infrastructure management.', status: 'Verified Partner' },
];

const ITHero = () => {
  const navigate = useNavigate();
  
  return (
    <section className="it-hero-section">
      <div className="hero-badge">
        <FontAwesomeIcon icon={faCog} />
        <span>IT SERVICES</span>
      </div>
      <h1 className="hero-title">
        Reliable IT Services for<br />
        <span className="gradient-text">Your Business</span>
      </h1>
      <p className="hero-description">
        Comprehensive IT solutions including technical support, network management, 
        cloud services, and cybersecurity. We empower organizations with reliable technology.
      </p>
      <div className="hero-actions">
        <button className="btn-secondary" onClick={() => navigate('/contact')}>
          Get Support
          <span>→</span>
        </button>
      </div>
    </section>
  );
};

const ITSection2 = () => {
  const services = [
    { icon: faServer, title: 'Server Management', desc: 'Reliable server hosting and management' },
    { icon: faNetworkWired, title: 'Network Solutions', desc: 'Complete network design and support' },
    { icon: faCloud, title: 'Cloud Services', desc: 'Scalable cloud infrastructure' },
    { icon: faShieldAlt, title: 'IT Security', desc: 'Protect your systems and data' }
  ]

  return (
    <div className='itSection2'>
      <div className="itSection2-wrapper">
        <div className="content-side">
          <h2>Professional IT Services</h2>
          <p>Transform your business with our comprehensive IT solutions. We deliver reliable, scalable, and cost-effective services tailored to meet your specific requirements.</p>
          <p>From startups to enterprises, our IT services grow with your business, providing the technology foundation you need to succeed.</p>
          
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
          <img src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600" alt="IT Services" />
        </div>
      </div>
    </div>
  )
}

const ITFeatures = () => {
  const features = [
    { icon: faHeadset, title: 'Technical Support', description: '24/7 expert technical assistance' },
    { icon: faWrench, title: 'System Maintenance', description: 'Proactive IT infrastructure management' },
    { icon: faCloud, title: 'Cloud Solutions', description: 'Cloud migration and management' },
    { icon: faShieldAlt, title: 'Cybersecurity', description: 'Enterprise security solutions' },
    { icon: faDatabase, title: 'Data Management', description: 'Secure data storage and backup' },
    { icon: faTools, title: 'IT Consulting', description: 'Strategic technology planning' }
  ];

  return (
    <section className="it-features-section">
      <div className="section-header">
        <h2>Our IT Services</h2>
        <p>End-to-end technology solutions</p>
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

const ITSection4 = () => {
  const benefits = [
    { icon: faHeadset, title: '24/7 Support', description: 'Round-the-clock technical assistance' },
    { icon: faCog, title: 'Expert Team', description: 'Certified IT professionals' },
    { icon: faClock, title: 'Quick Response', description: 'Fast resolution times' },
    { icon: faTools, title: 'Cost Effective', description: 'Flexible pricing plans' }
  ];

  return (
    <div className="itSection4">
      <div className="section-header">
        <h2>Why Choose ITCS for IT Services?</h2>
        <p>Your trusted IT partner</p>
      </div>
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
  );
};

const ITCTA = () => {
  const navigate = useNavigate();
  
  return (
    <section className="it-cta">
      <div className="cta-container">
        <h2>
          Let's Discuss Your <span className="gradient-text">Project</span>
        </h2>
        <p>Get free consultation and transform your business with expert IT services.</p>
        <button className="btn-primary" onClick={() => navigate('/contact')}>
          Get Free Consultation
          <span>→</span>
        </button>
        <div className="cta-stats">
          <div className="stat-item">
            <div className="stat-number">500+</div>
            <div className="stat-label">Clients</div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <div className="stat-number">99.9%</div>
            <div className="stat-label">Uptime</div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <div className="stat-number">24/7</div>
            <div className="stat-label">Support</div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ITServicesNew = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <ITHero />
      <ITSection2 />
      <ITFeatures />
      <PartnerLogos partners={itPartners} />
      <ITSection4 />
      <ITCTA />
    </>
  );
};

export default ITServicesNew;