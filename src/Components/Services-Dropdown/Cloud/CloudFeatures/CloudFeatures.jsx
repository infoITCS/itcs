import React from 'react';
import './CloudFeatures.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud, faShieldAlt, faServer, faDatabase, faGlobe, faNetworkWired, faCode, faLock, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const CloudFeatures = () => {
  
  const cloudServices = [
    {
      icon: faCloud,
      title: 'Microsoft Azure',
      description: 'Enterprise-grade cloud computing platform for building, deploying, and managing applications through Microsoft data centers.',
      features: ['Virtual Machines', 'App Services', 'Azure Functions', 'Container Instances']
    },
    {
      icon: faServer,
      title: 'Cloud Infrastructure',
      description: 'Scalable and reliable cloud infrastructure solutions designed to meet your enterprise workload requirements.',
      features: ['Dedicated Servers', 'Auto Scaling', 'Load Balancing', 'Global CDN']
    },
    {
      icon: faGlobe,
      title: 'Web Hosting',
      description: 'Professional web hosting solutions with high performance, reliability, and enterprise-grade security.',
      features: ['Shared Hosting', 'VPS Hosting', 'WordPress Hosting', 'Reseller Hosting']
    },
    {
      icon: faDatabase,
      title: 'Database Services',
      description: 'Fully managed database services for cloud applications with high availability and automatic backups.',
      features: ['SQL Database', 'NoSQL Database', 'Redis Cache', 'Database Migration']
    },
    {
      icon: faLock,
      title: 'Cloud Security',
      description: 'Comprehensive security solutions to protect your cloud infrastructure and data from cyber threats.',
      features: ['Firewall', 'DDoS Protection', 'SSL/TLS Certificates', 'Security Audits']
    },
    {
      icon: faNetworkWired,
      title: 'Hybrid Cloud',
      description: 'Seamlessly integrate your on-premises infrastructure with cloud for maximum flexibility and control.',
      features: ['VPN Gateway', 'ExpressRoute', 'Hybrid Connections', 'Multi-Cloud']
    }
  ];

  return (
    <section className="cloud-features">
      <div className="features-container">
        <div className="features-header">
          <span className="section-label">OUR SERVICES</span>
          <h2 className="section-title">Comprehensive Cloud Solutions</h2>
          <p className="section-desc">
            From infrastructure to productivity, we offer end-to-end cloud solutions 
            tailored to your business needs. As a Microsoft Gold Partner, we deliver 
            enterprise-grade cloud services across Pakistan and beyond.
          </p>
        </div>

        <div className="services-grid">
          {cloudServices.map((service, index) => (
            <div className="service-card" key={index}>
              <div className="card-header">
                <div className="card-icon">
                  <FontAwesomeIcon icon={service.icon} />
                </div>
                <h3 className="card-title">{service.title}</h3>
              </div>
              <p className="card-description">{service.description}</p>
              <ul className="card-features">
                {service.features.map((feature, idx) => (
                  <li key={idx}>
                    <FontAwesomeIcon icon={faCheckCircle} className="feature-icon" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CloudFeatures;