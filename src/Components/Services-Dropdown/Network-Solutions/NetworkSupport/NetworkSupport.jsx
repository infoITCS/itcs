import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadset, faTools, faClock, faPhoneAlt, faArrowRight, faServer, faWifi, faNetworkWired } from '@fortawesome/free-solid-svg-icons';
import '../NetworkNew.scss';
import PageSEO from '../../../Common/PageSEO';
import { SEO_META } from '../../../../config/seoMeta';

const NetworkSupport = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const seo = SEO_META.networkSupport;

  const services = [
    { icon: faTools, title: 'Network Maintenance', description: 'Regular maintenance to keep your network running optimally' },
    { icon: faClock, title: '24/7 Support', description: 'Round-the-clock monitoring and support for critical issues' },
    { icon: faHeadset, title: 'Help Desk', description: 'Dedicated support team for all your network queries' },
    { icon: faServer, title: 'Infrastructure Management', description: 'Complete management of your network infrastructure' }
  ];

  const benefits = [
    { icon: faWifi, title: 'Minimal Downtime', description: 'Quick resolution times to keep your business running' },
    { icon: faNetworkWired, title: 'Proactive Monitoring', description: 'Identify issues before they become problems' },
    { icon: faClock, title: 'Fast Response', description: 'SLA-backed response times for urgent issues' },
    { icon: faHeadset, title: 'Expert Team', description: 'Certified professionals with years of experience' }
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
            <span className="current">Network Support</span>
          </div>
          <h1>
            Professional <span className="gradient-text">Network Support</span> Services
          </h1>
          <p className="hero-subtitle">
            Keep your network running smoothly with our comprehensive support services. 
            From routine maintenance to emergency response, our team ensures your 
            infrastructure remains reliable and efficient.
          </p>
          <div className="hero-buttons">
            <Link to="/contact" className="btn-primary">
              Get Support Today
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
              <h2>Reliable Network Support & Maintenance</h2>
              <p>
                ITCS provides comprehensive network support services designed to keep 
                your infrastructure running at peak performance. Our team of certified 
                professionals offers proactive monitoring, preventive maintenance, and 
                rapid response to ensure maximum uptime.
              </p>
              <p>
                Whether you need ongoing support or assistance with specific issues, 
                we deliver tailored solutions that meet your business requirements.
              </p>
              <ul className="feature-list">
                <li><FontAwesomeIcon icon={faTools} /> Preventive maintenance</li>
                <li><FontAwesomeIcon icon={faClock} /> 24/7/365 support availability</li>
                <li><FontAwesomeIcon icon={faHeadset} /> Dedicated account manager</li>
                <li><FontAwesomeIcon icon={faServer} /> Remote and on-site support</li>
              </ul>
            </div>
            <div className="overview-image">
              <div className="image-card">
                <FontAwesomeIcon icon={faHeadset} className="main-icon" />
                <div className="icon-overlay">
                  <FontAwesomeIcon icon={faTools} />
                  <FontAwesomeIcon icon={faClock} />
                  <FontAwesomeIcon icon={faServer} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="nested-benefits">
        <div className="container">
          <h2>Our Support Services</h2>
          <div className="benefits-grid">
            {services.map((service, idx) => (
              <div className="benefit-card" key={idx}>
                <div className="benefit-icon">
                  <FontAwesomeIcon icon={service.icon} />
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="nested-industries">
        <div className="container">
          <h2>Benefits of Our Support</h2>
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
          <h2>Support Plans</h2>
          <div className="process-steps">
            <div className="process-step">
              <div className="step-number">Basic</div>
              <h3>Business Hours</h3>
              <p>Support during business hours with 24-hour response time.</p>
            </div>
            <div className="process-step">
              <div className="step-number">Standard</div>
              <h3>Extended Hours</h3>
              <p>12/5 support with 8-hour response for critical issues.</p>
            </div>
            <div className="process-step">
              <div className="step-number">Premium</div>
              <h3>24/7 Support</h3>
              <p>Round-the-clock support with 4-hour response time.</p>
            </div>
            <div className="process-step">
              <div className="step-number">Enterprise</div>
              <h3>Dedicated Team</h3>
              <p>Dedicated support team with 1-hour response SLA.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="nested-cta">
        <div className="container">
          <h2>Get Network Support Today</h2>
          <p>Contact us to discuss your support requirements.</p>
          <div className="cta-buttons">
            <Link to="/contact" className="btn-primary">
              Contact Support
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

export default NetworkSupport;