import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt, faServer, faDatabase, faSync, faCheckCircle, faArrowRight, faArrowLeft, faTasks, faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import '../../_shared/nested-pages.scss';
import PageSEO from '../../../Common/PageSEO';
import { SEO_META } from '../../../../config/seoMeta';

const CloudMigration = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const seo = SEO_META.cloudMigration;

  const benefits = [
    { icon: faCheckCircle, title: 'Zero Downtime', description: 'Seamless migration with minimal business disruption' },
    { icon: faCheckCircle, title: 'Data Integrity', description: 'Secure transfer with complete data integrity assurance' },
    { icon: faCheckCircle, title: 'Cost Efficient', description: 'Optimized migration to reduce operational costs' },
    { icon: faCheckCircle, title: 'Risk Mitigation', description: 'Thorough testing and rollback strategies' }
  ];

  const services = [
    { icon: faServer, title: 'On-Prem to Cloud', description: 'Migrate physical servers to Azure/AWS' },
    { icon: faDatabase, title: 'Database Migration', description: 'SQL Server, Oracle, and more' },
    { icon: faSync, title: 'Workload Migration', description: 'Applications, VMs, and containers' },
    { icon: faShieldAlt, title: 'Hybrid Solutions', description: 'Combine cloud with on-premise' }
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
            <span className="current">Cloud Migration</span>
          </div>
          <h1>
            Seamless <span className="gradient-text">Cloud Migration</span> Services
          </h1>
          <p className="hero-subtitle">
            Transform your business with smooth cloud migration. Our certified experts ensure 
            safe, efficient, and cost-effective migration to Microsoft Azure, AWS, or hybrid solutions 
            with zero business disruption.
          </p>
          <div className="hero-buttons">
            <Link to="/contact" className="btn-primary">
              Get Migration Quote
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
              <h2>Expert Cloud Migration Solutions</h2>
              <p>
                ITCS provides comprehensive cloud migration services as a Microsoft Gold Partner. 
                We help businesses of all sizes migrate their infrastructure, applications, 
                and data to the cloud with minimal risk and downtime.
              </p>
              <p>
                Our proven methodology ensures systematic planning, execution, and validation 
                of every migration project, delivering immediate value to your business.
              </p>
              <ul className="feature-list">
                <li><FontAwesomeIcon icon={faCheckCircle} /> Assessment & planning</li>
                <li><FontAwesomeIcon icon={faCheckCircle} /> Application modernization</li>
                <li><FontAwesomeIcon icon={faCheckCircle} /> Data migration & validation</li>
                <li><FontAwesomeIcon icon={faCheckCircle} /> Post-migration optimization</li>
              </ul>
            </div>
            <div className="overview-image">
              <div className="image-card">
                <FontAwesomeIcon icon={faCloudUploadAlt} className="main-icon" />
                <div className="icon-overlay">
                  <FontAwesomeIcon icon={faArrowLeft} />
                  <FontAwesomeIcon icon={faServer} />
                  <FontAwesomeIcon icon={faArrowRight} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="nested-sections">
        <div className="container">
          <h2>Migration Benefits</h2>
          <p className="section-desc">Why choose our migration services</p>
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
          <h2>Migration Services</h2>
          <p className="section-desc">Comprehensive migration solutions for your needs</p>
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
          <h2>Our Migration Process</h2>
          <div className="process-steps">
            <div className="process-step">
              <div className="step-number">01</div>
              <h3>Assess</h3>
              <p>Evaluate current infrastructure and readiness.</p>
            </div>
            <div className="process-step">
              <div className="step-number">02</div>
              <h3>Plan</h3>
              <p>Create detailed migration roadmap.</p>
            </div>
            <div className="process-step">
              <div className="step-number">03</div>
              <h3>Migrate</h3>
              <p>Execute migration with proven methodology.</p>
            </div>
            <div className="process-step">
              <div className="step-number">04</div>
              <h3>Validate</h3>
              <p>Test and optimize post-migration.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="nested-cta">
        <div className="container">
          <h2>Start Your Migration Today</h2>
          <p>Get a free assessment and migration plan from our experts.</p>
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

export default CloudMigration;