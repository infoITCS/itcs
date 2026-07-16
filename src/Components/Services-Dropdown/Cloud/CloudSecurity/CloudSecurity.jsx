import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldAlt, faLock, faEye, faUserShield, faServer, faShieldVirus, faLockOpen, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import '../../_shared/nested-pages.scss';
import PageSEO from '../../../Common/PageSEO';
import { SEO_META } from '../../../../config/seoMeta';

const CloudSecurity = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const seo = SEO_META.cloudSecurity;

  const benefits = [
    { icon: faShieldAlt, title: 'Data Protection', description: 'Enterprise-grade encryption and security controls' },
    { icon: faUserShield, title: 'Identity Management', description: 'Azure AD and conditional access policies' },
    { icon: faEye, title: 'Continuous Monitoring', description: '24/7 security monitoring and alerts' },
    { icon: faShieldVirus, title: 'Threat Protection', description: 'Advanced threat detection and response' }
  ];

  const services = [
    { icon: faLock, title: 'Cloud Access Security', description: 'CASB solutions for cloud apps' },
    { icon: faShieldVirus, title: 'Threat Detection', description: 'AI-powered threat analysis' },
    { icon: faLockOpen, title: 'Identity & Access', description: 'Zero trust architecture' },
    { icon: faServer, title: 'Compliance', description: 'SOC 2, ISO 27001, GDPR' }
  ];

  return (
    <div className="nested-page">
      <PageSEO title={seo.title} description={seo.description} path={seo.path} />
      <section className="nested-hero">
        <div className="nested-hero-bg">
          <div className="network-pattern"></div>
        </div>
        <div className="nested-hero-content">
          <div className="breadcrumb">
            <Link to="/services">Services</Link>
            <span>/</span>
            <Link to="/cloud">Cloud Solutions</Link>
            <span>/</span>
            <span className="current">Cloud Security</span>
          </div>
          <h1>
            Enterprise <span className="gradient-text">Cloud Security</span> Solutions
          </h1>
          <p className="hero-subtitle">
            Secure your cloud infrastructure with comprehensive security solutions. 
            Protect your data, applications, and users with advanced security measures 
            from Microsoft Gold Partner ITCS.
          </p>
          <div className="hero-buttons">
            <Link to="/contact" className="btn-primary">
              Get Security Assessment
              <FontAwesomeIcon icon={faArrowRight} />
            </Link>
            <Link to="/cloud" className="btn-secondary">
              Back to Cloud Solutions
            </Link>
          </div>
        </div>
      </section>

      <section className="nested-overview">
        <div className="container">
          <div className="overview-grid">
            <div className="overview-content">
              <h2>Comprehensive Cloud Security</h2>
              <p>
                ITCS provides enterprise-grade cloud security services to protect your 
                Microsoft Azure and AWS environments. Our security solutions cover 
                identity, data, applications, and infrastructure.
              </p>
              <p>
                As a Microsoft Gold Partner, we leverage advanced security tools 
                and best practices to defend against evolving cyber threats.
              </p>
              <ul className="feature-list">
                <li><FontAwesomeIcon icon={faShieldAlt} /> Cloud security posture management</li>
                <li><FontAwesomeIcon icon={faLock} /> Data encryption & key management</li>
                <li><FontAwesomeIcon icon={faEye} /> Security monitoring & SIEM</li>
                <li><FontAwesomeIcon icon={faUserShield} /> Identity & access management</li>
              </ul>
            </div>
            <div className="overview-image">
              <div className="image-card">
                <FontAwesomeIcon icon={faShieldAlt} className="main-icon" />
                <div className="icon-overlay">
                  <FontAwesomeIcon icon={faLock} />
                  <FontAwesomeIcon icon={faEye} />
                  <FontAwesomeIcon icon={faShieldVirus} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="nested-benefits">
        <div className="container">
          <h2>Security Benefits</h2>
          <div className="benefits-grid">
            {benefits.map((benefit, idx) => (
              <div className="benefit-card" key={idx}>
                <div className="benefit-icon">
                  <FontAwesomeIcon icon={benefit.icon} />
                </div>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="nested-industries">
        <div className="container">
          <h2>Security Services</h2>
          <div className="industries-grid">
            {services.map((service, idx) => (
              <div className="industry-card" key={idx}>
                <div className="industry-icon">
                  <FontAwesomeIcon icon={service.icon} />
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="nested-process">
        <div className="container">
          <h2>Our Security Approach</h2>
          <div className="process-steps">
            <div className="process-step">
              <div className="step-number">01</div>
              <h3>Assess</h3>
              <p>Evaluate security posture and identify gaps.</p>
            </div>
            <div className="process-step">
              <div className="step-number">02</div>
              <h3>Design</h3>
              <p>Create security architecture blueprint.</p>
            </div>
            <div className="process-step">
              <div className="step-number">03</div>
              <h3>Implement</h3>
              <p>Deploy security controls and policies.</p>
            </div>
            <div className="process-step">
              <div className="step-number">04</div>
              <h3>Monitor</h3>
              <p>Continuous monitoring and response.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="nested-cta">
        <div className="container">
          <h2>Secure Your Cloud Today</h2>
          <p>Get a comprehensive security assessment from our experts.</p>
          <div className="cta-buttons">
            <Link to="/contact" className="btn-primary">
              Get Free Assessment
              <FontAwesomeIcon icon={faArrowRight} />
            </Link>
            <Link to="/cloud" className="btn-secondary">
              View All Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CloudSecurity;