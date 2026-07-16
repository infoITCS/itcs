import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldAlt, faLock, faEye, faBug, faUserShield, faServer, faArrowRight, faFire, faFingerprint } from '@fortawesome/free-solid-svg-icons';
import './NetworkSecurity.scss';
import PageSEO from '../../../Common/PageSEO';
import { SEO_META } from '../../../../config/seoMeta';

const NetworkSecurity = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const seo = SEO_META.networkSecurity;

  const features = [
    { icon: faShieldAlt, title: 'Firewall Implementation', description: 'Enterprise-grade firewalls to protect your network from external threats' },
    { icon: faLock, title: 'VPN Solutions', description: 'Secure remote access for your distributed workforce' },
    { icon: faEye, title: '24/7 Monitoring', description: 'Real-time threat detection and response' },
    { icon: faBug, title: 'Intrusion Prevention', description: 'Advanced IDS/IPS to block malicious traffic' }
  ];

  const benefits = [
    { icon: faUserShield, title: 'Data Protection', description: 'Safeguard sensitive business data' },
    { icon: faServer, title: 'Infrastructure Security', description: 'Protect your critical infrastructure' },
    { icon: faFire, title: 'Threat Prevention', description: 'Proactive defense against cyber threats' },
    { icon: faFingerprint, title: 'Access Control', description: 'Manage who can access your network' }
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
            <Link to="/network-solutions">Network Solutions</Link>
            <span>/</span>
            <span className="current">Network Security</span>
          </div>
          <h1>
            Advanced <span className="gradient-text">Network Security</span> Solutions
          </h1>
          <p className="hero-subtitle">
            Protect your network infrastructure with our comprehensive security solutions. 
            From firewalls to intrusion detection, we safeguard your business against 
            evolving cyber threats.
          </p>
          <div className="hero-buttons">
            <Link to="/contact" className="btn-primary">
              Get Free Security Assessment
              <FontAwesomeIcon icon={faArrowRight} />
            </Link>
            <Link to="/network-solutions" className="btn-secondary">
              Back to Network Solutions
            </Link>
          </div>
        </div>
      </section>

      <section className="nested-overview">
        <div className="container">
          <div className="overview-grid">
            <div className="overview-content">
              <h2>Comprehensive Network Security</h2>
              <p>
                In today's digital landscape, network security is more critical than ever. 
                ITCS provides end-to-end security solutions that protect your infrastructure 
                from external threats, internal vulnerabilities, and data breaches.
              </p>
              <p>
                Our team of certified security professionals implements industry-leading 
                security technologies and best practices to ensure your network remains 
                secure and compliant.
              </p>
              <ul className="feature-list">
                <li><FontAwesomeIcon icon={faShieldAlt} /> Next-generation firewalls</li>
                <li><FontAwesomeIcon icon={faLock} /> Multi-factor authentication</li>
                <li><FontAwesomeIcon icon={faEye} /> Real-time threat monitoring</li>
                <li><FontAwesomeIcon icon={faBug} /> Zero-day threat protection</li>
              </ul>
            </div>
            <div className="overview-image">
              <div className="image-card">
                <FontAwesomeIcon icon={faShieldAlt} className="main-icon" />
                <div className="icon-overlay">
                  <FontAwesomeIcon icon={faLock} />
                  <FontAwesomeIcon icon={faEye} />
                  <FontAwesomeIcon icon={faFire} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="nested-benefits">
        <div className="container">
          <h2>Our Security Services</h2>
          <div className="benefits-grid">
            {features.map((feature, idx) => (
              <div className="benefit-card" key={idx}>
                <div className="benefit-icon">
                  <FontAwesomeIcon icon={feature.icon} />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="nested-industries">
        <div className="container">
          <h2>Security Benefits</h2>
          <div className="industries-grid">
            {benefits.map((benefit, idx) => (
              <div className="industry-card" key={idx}>
                <div className="industry-icon">
                  <FontAwesomeIcon icon={benefit.icon} />
                </div>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
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
              <h3>Security Assessment</h3>
              <p>We conduct thorough vulnerability assessments of your network.</p>
            </div>
            <div className="process-step">
              <div className="step-number">02</div>
              <h3>Strategy Development</h3>
              <p>Create a comprehensive security roadmap based on findings.</p>
            </div>
            <div className="process-step">
              <div className="step-number">03</div>
              <h3>Implementation</h3>
              <p>Deploy security solutions aligned with your business needs.</p>
            </div>
            <div className="process-step">
              <div className="step-number">04</div>
              <h3>Continuous Monitoring</h3>
              <p>24/7 monitoring and rapid response to emerging threats.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="nested-cta">
        <div className="container">
          <h2>Secure Your Network Today</h2>
          <p>Get a comprehensive security assessment from our experts.</p>
          <div className="cta-buttons">
            <Link to="/contact" className="btn-primary">
              Get Free Consultation
              <FontAwesomeIcon icon={faArrowRight} />
            </Link>
            <Link to="/network-solutions" className="btn-secondary">
              View All Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NetworkSecurity;