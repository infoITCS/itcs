import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud, faServer, faDatabase, faNetworkWired, faCheckCircle, faArrowRight, faLaptop, faBuilding, faShop } from '@fortawesome/free-solid-svg-icons';
import '../../_shared/nested-pages.scss';
import PageSEO from '../../../Common/PageSEO';
import { SEO_META } from '../../../../config/seoMeta';

const CloudDesign = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const seo = SEO_META.cloudDesign;

  const benefits = [
    { icon: faCheckCircle, title: 'Scalable Architecture', description: 'Future-proof cloud designs that grow with your business' },
    { icon: faCheckCircle, title: 'Cost Optimization', description: 'Reduce infrastructure costs with efficient cloud architecture' },
    { icon: faCheckCircle, title: 'High Availability', description: '99.99% uptime with redundant cloud infrastructure' },
    { icon: faCheckCircle, title: 'Security First', description: 'Built-in security best practices from the ground up' }
  ];

  const services = [
    { icon: faServer, title: 'Azure Architecture', description: 'Microsoft Azure cloud solutions' },
    { icon: faDatabase, title: 'AWS Solutions', description: 'Amazon Web Services design' },
    { icon: faNetworkWired, title: 'Hybrid Cloud', description: 'Combine on-prem with cloud' },
    { icon: faCloud, title: 'Multi-Cloud', description: 'Strategic multi-cloud strategies' }
  ];

  return (
    <div className="nested-page">
      <PageSEO title={seo.title} description={seo.description} path={seo.path} />
      <section className="nested-hero">
        <div className="hero-content">
          <div className="breadcrumb">
            <Link to="/services">Services</Link>
            <span>/</span>
            <Link to="/cloud">Cloud Solutions</Link>
            <span>/</span>
            <span className="current">Cloud Design</span>
          </div>
          <h1>
            Professional <span className="gradient-text">Cloud Architecture</span> Design
          </h1>
          <p className="hero-subtitle">
            Design your cloud infrastructure for success. We create scalable, secure, and 
            cost-effective cloud architectures tailored to your business requirements using 
            Microsoft Azure and AWS.
          </p>
          <div className="hero-buttons">
            <Link to="/contact" className="btn-primary">
              Get Free Consultation
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
              <h2>Expert Cloud Architecture Design</h2>
              <p>
                As a Microsoft Gold Partner, ITCS delivers enterprise-grade cloud architecture 
                solutions. Our certified architects design infrastructures that ensure scalability, 
                security, and cost-efficiency.
              </p>
              <p>
                Whether you're migrating to the cloud or building from scratch, we provide 
                comprehensive architecture services for Azure, AWS, and hybrid environments.
              </p>
              <ul className="feature-list">
                <li><FontAwesomeIcon icon={faCheckCircle} /> Cloud migration strategy</li>
                <li><FontAwesomeIcon icon={faCheckCircle} /> Infrastructure as Code (IaC)</li>
                <li><FontAwesomeIcon icon={faCheckCircle} /> Containerization & Kubernetes</li>
                <li><FontAwesomeIcon icon={faCheckCircle} /> Disaster recovery planning</li>
              </ul>
            </div>
            <div className="overview-image">
              <div className="image-card">
                <FontAwesomeIcon icon={faCloud} className="main-icon" />
                <div className="icon-overlay">
                  <FontAwesomeIcon icon={faServer} />
                  <FontAwesomeIcon icon={faDatabase} />
                  <FontAwesomeIcon icon={faNetworkWired} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="nested-sections">
        <div className="container">
          <h2>Why Choose Our Cloud Design?</h2>
          <p className="section-desc">We deliver enterprise-grade cloud solutions tailored to your business needs</p>
          <div className="cards-grid">
            {benefits.map((benefit, idx) => (
              <div className="info-card" key={idx}>
                <div className="card-icon">
                  <FontAwesomeIcon icon={benefit.icon} />
                </div>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="nested-sections alt-bg">
        <div className="container">
          <h2>Cloud Platforms We Work With</h2>
          <p className="section-desc">Industry-leading cloud platforms for your business</p>
          <div className="cards-grid">
            {services.map((service, idx) => (
              <div className="info-card" key={idx}>
                <div className="card-icon">
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
          <h2>Our Cloud Design Process</h2>
          <div className="process-steps">
            <div className="process-step">
              <div className="step-number">01</div>
              <h3>Assessment</h3>
              <p>Analyze current infrastructure and requirements.</p>
            </div>
            <div className="process-step">
              <div className="step-number">02</div>
              <h3>Architecture</h3>
              <p>Design scalable cloud architecture blueprint.</p>
            </div>
            <div className="process-step">
              <div className="step-number">03</div>
              <h3>Implementation</h3>
              <p>Deploy and configure cloud resources.</p>
            </div>
            <div className="process-step">
              <div className="step-number">04</div>
              <h3>Optimization</h3>
              <p>Fine-tune for performance and cost savings.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="nested-cta">
        <div className="container">
          <h2>Ready to Design Your Cloud?</h2>
          <p>Contact our cloud architects for a free consultation.</p>
          <div className="cta-buttons">
            <Link to="/contact" className="btn-primary">
              Get Free Consultation
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

export default CloudDesign;