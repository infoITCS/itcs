import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../_shared/service-common.scss';
import './WebDevelopment.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faLaptopCode, faMobileAlt, faShoppingCart, faSearch, faCloud, faPalette, faRocket, faCheckCircle, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import PartnerLogos from '../_shared/PartnerLogos/PartnerLogos';
import { faMicrosoft, faGoogle, faWordpress } from '@fortawesome/free-brands-svg-icons';
import PageSEO from '../../Common/PageSEO';
import { SEO_META } from '../../../config/seoMeta';

const webPartners = [
  { icon: faMicrosoft, name: 'Microsoft Technologies', type: 'Technology Partner', description: 'Built on Microsoft technologies including .NET, Azure, and SharePoint for enterprise web solutions.', status: 'Verified Partner' },
  { icon: faGoogle, name: 'Google Technologies', type: 'Technology Partner', description: 'Google-certified developers for Angular, Firebase, and cloud-based web applications.', status: 'Verified Partner' },
  { icon: faWordpress, name: 'WordPress Ecosystem', type: 'Development Partner', description: 'Expert WordPress development for custom themes, plugins, and enterprise-scale content management.', status: 'Verified Partner' },
];

const WebDevelopment = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const seo = SEO_META.webDevelopment;

  const services = [
    { icon: faCode, title: 'Custom Websites', desc: 'Tailored web solutions' },
    { icon: faLaptopCode, title: 'Web Applications', desc: 'Full-stack development' },
    { icon: faMobileAlt, title: 'Responsive Design', desc: 'Mobile-first approach' },
    { icon: faShoppingCart, title: 'E-Commerce', desc: 'Online store solutions' }
  ];

  const features = [
    { icon: faCheckCircle, title: 'Modern Technologies', description: 'Latest frameworks and tools' },
    { icon: faCheckCircle, title: 'SEO Optimized', description: 'Search engine friendly code' },
    { icon: faCheckCircle, title: 'Fast Performance', description: 'Optimized for speed' },
    { icon: faCheckCircle, title: 'Secure Code', description: 'Best security practices' },
    { icon: faPalette, title: 'UI/UX Design', description: 'Beautiful user interfaces' },
    { icon: faRocket, title: 'Scalable Solutions', description: 'Grow with your business' }
  ];

  const benefits = [
    { title: 'Custom Solutions', description: 'Tailored to your needs' },
    { title: 'Fast Delivery', description: 'Quick turnaround time' },
    { title: 'Ongoing Support', description: 'Maintenance included' },
    { title: 'Expert Team', description: 'Skilled developers' }
  ];

  const stats = [
    { text: '200+ Projects' },
    { text: '100% Satisfaction' },
    { text: '24/7 Support' },
    { text: 'Industry Experts' }
  ];

  return (
    <div className="nested-page">
      <PageSEO title={seo.title} description={seo.description} path={seo.path} />
      <section className="network-hero-section">
        <div className="hero-badge">
          <FontAwesomeIcon icon={faCode} />
          <span>WEB DEVELOPMENT</span>
        </div>
        <h1 className="hero-title">
          Professional <span className="gradient-text">Web Development</span> Services
        </h1>
        <p className="hero-description">
          We build modern, responsive websites and web applications that drive business growth. 
          From simple landing pages to complex e-commerce platforms, we deliver solutions that convert visitors into customers.
        </p>
      </section>

      <div className='networkSection2'>
        <div className="networkSection2-wrapper">
          <div className="content-side">
            <h2>End-to-End Web Development Solutions</h2>
            <p>At ITCS, we create stunning websites that not only look great but also perform exceptionally. Our team of skilled developers uses the latest technologies to build scalable, secure, and high-performance web solutions.</p>
            <p>Whether you need a brand new website, a redesign, or a complex web application, we have the expertise to bring your vision to life.</p>
            
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
            <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600" alt="Web Development" />
          </div>
        </div>
      </div>

      <section className="network-features-section">
        <div className="section-header">
          <h2>Why Choose Our Web Development?</h2>
          <p>We deliver exceptional web solutions tailored to your business needs</p>
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

      <PartnerLogos partners={webPartners} />

      <div className="networkSection4">
        <div className="section-header">
          <h2>Our Web Development Process</h2>
          <p>Proven methodology for successful projects</p>
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

      <section className="network-cta">
        <div className="cta-container">
          <h2>
            Ready to Build Your <span className="gradient-text">Website</span>
          </h2>
          <p>Contact our web development experts for a free consultation.</p>
          <Link to="/contact" className="btn-primary">
            Get Free Consultation
            <span>→</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default WebDevelopment;