import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../_shared/service-common.scss';
import './NetworkDesign.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faProjectDiagram, faNetworkWired, faServer, faShieldAlt, faCheckCircle, faArrowRight, faWifi, faTools, faSignal } from '@fortawesome/free-solid-svg-icons';
import PageSEO from '../../../Common/PageSEO';
import { SEO_META } from '../../../../config/seoMeta';

const NetworkDesign = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const seo = SEO_META.networkDesign;

  const services = [
    { icon: faNetworkWired, title: 'LAN/WAN Design', desc: 'Local and wide area networks' },
    { icon: faServer, title: 'Data Center', desc: 'Enterprise data center solutions' },
    { icon: faShieldAlt, title: 'Network Security', desc: 'Advanced protection measures' },
    { icon: faProjectDiagram, title: 'Cloud Integration', desc: 'Seamless cloud connectivity' }
  ];

  const features = [
    { icon: faCheckCircle, title: 'Scalable Architecture', description: 'Future-proof designs that grow with your business' },
    { icon: faCheckCircle, title: 'High Availability', description: '99.99% uptime with redundant infrastructure' },
    { icon: faCheckCircle, title: 'Optimized Performance', description: 'Low latency and maximum throughput' },
    { icon: faCheckCircle, title: 'Cost Efficiency', description: 'Reduced operational costs through efficient design' },
    { icon: faShieldAlt, title: 'Network Security', description: 'Advanced firewall and VPN protection' },
    { icon: faTools, title: 'Network Support', description: '24/7 monitoring and maintenance' }
  ];

  const benefits = [
    { title: 'Expert Architects', description: 'Certified network professionals' },
    { title: 'Custom Solutions', description: 'Tailored to your specific needs' },
    { title: 'Scalable Designs', description: 'Grow your network as needed' },
    { title: '24/7 Support', description: 'Round-the-clock assistance' }
  ];

  const stats = [
    { text: '500+ Designs' },
    { text: '99.9% Uptime' },
    { text: '24/7 Support' },
    { text: 'Industry Experts' }
  ];

  return (
    <div className="nested-page">
      <PageSEO title={seo.title} description={seo.description} path={seo.path} />
      <section className="network-hero-section">
        <div className="hero-badge">
          <FontAwesomeIcon icon={faProjectDiagram} />
          <span>NETWORK DESIGN</span>
        </div>
        <h1 className="hero-title">
          Professional <span className="gradient-text">Network Design</span> Services
        </h1>
        <p className="hero-description">
          Custom network architecture tailored to your business requirements. 
          We design scalable, secure, and high-performance network infrastructure 
          that forms the backbone of your digital operations.
        </p>
      </section>

      <div className='networkSection2'>
        <div className="networkSection2-wrapper">
          <div className="content-side">
            <h2>End-to-End Network Design Solutions</h2>
            <p>At ITCS, we understand that a well-designed network is crucial for business success. Our team of certified network architects provides comprehensive network design services that align with your business objectives and technical requirements.</p>
            <p>Whether you're building a new network from scratch or modernizing existing infrastructure, we deliver solutions that ensure seamless connectivity, robust security, and optimal performance.</p>
            
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
            <img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600" alt="Network Design" />
          </div>
        </div>
      </div>

      <section className="network-features-section">
        <div className="section-header">
          <h2>Why Choose Our Network Design?</h2>
          <p>We deliver enterprise-grade network solutions tailored to your business needs</p>
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

      <div className="networkSection4">
        <div className="section-header">
          <h2>Our Network Design Process</h2>
          <p>Proven methodology for success</p>
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
            Ready to Design Your <span className="gradient-text">Network</span>
          </h2>
          <p>Contact our network experts for a free consultation.</p>
          <Link to="/contact" className="btn-primary">
            Get Free Consultation
            <span>→</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default NetworkDesign;