import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../_shared/service-common.scss';
import './NetworkNew.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faNetworkWired, faShieldAlt, faWifi, faServer, faTools, faProjectDiagram, faLock, faSignal } from '@fortawesome/free-solid-svg-icons';
import PartnerLogos from '../_shared/PartnerLogos/PartnerLogos';


const networkPartners = [
  { name: 'Cisco Secure Agile Exchange', type: 'Technology Partner', description: 'Secure, agile network exchange for modern enterprises', status: 'Verified Partner' },
  { name: 'Fortinet Secure SD-WAN', type: 'Technology Partner', description: 'Next-gen SD-WAN with integrated security', status: 'Verified Partner' },
  { name: 'Palo Alto Networks Prisma SASE', type: 'Technology Partner', description: 'Cloud-delivered secure access service edge', status: 'Verified Partner' },
  { name: 'HPE Aruba EdgeConnect', type: 'Technology Partner', description: 'WAN edge networking with built-in security', status: 'Verified Partner' },
  { name: 'VMware VeloCloud', type: 'Technology Partner', description: 'Software-defined WAN for cloud-ready connectivity', status: 'Verified Partner' },
  { name: 'FortiGate Next-Generation Firewall', type: 'Technology Partner', description: 'Enterprise-grade NGFW with advanced threat protection', status: 'Verified Partner' },
  { name: 'Barracuda CloudGen WAN', type: 'Technology Partner', description: 'Simplified SD-WAN with cloud-native management', status: 'Verified Partner' },
];

const NetworkHero = () => {
  const navigate = useNavigate();
  
  return (
    <section className="network-hero-section">
      <div className="hero-badge">
        <FontAwesomeIcon icon={faGlobe} />
        <span>NETWORK SOLUTIONS</span>
      </div>
      <h1 className="hero-title">
        Advanced Network Solutions<br />
        <span className="gradient-text">for Your Business</span>
      </h1>
      <p className="hero-description">
        Empowering organizations with robust network solutions for seamless connectivity. 
        We design, implement, and manage networks that drive business productivity.
      </p>
      <div className="hero-actions">
        <button className="btn-secondary" onClick={() => navigate('/network-solutions/design')}>
          Network Design
          <span>→</span>
        </button>
      </div>
    </section>
  );
};

const NetworkSection2 = () => {
  const services = [
    { icon: faNetworkWired, title: 'Network Design', desc: 'Custom network architecture' },
    { icon: faShieldAlt, title: 'Network Security', desc: 'Advanced protection' },
    { icon: faWifi, title: 'Wireless Solutions', desc: 'Enterprise WiFi' },
    { icon: faServer, title: 'Server Solutions', desc: 'Reliable hosting' }
  ]

  return (
    <div className='networkSection2'>
      <div className="networkSection2-wrapper">
        <div className="content-side">
          <h2>Comprehensive Network Solutions</h2>
          <p>Transform your business with our end-to-end network solutions. We deliver scalable, secure, and reliable networks tailored to meet your specific requirements.</p>
          <p>From small businesses to large enterprises, our network solutions grow with your business, providing the connectivity you need to succeed.</p>
          
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
          <img src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600" alt="Network Solutions" />
        </div>
      </div>
    </div>
  )
}

const NetworkFeatures = () => {
  const features = [
    { icon: faProjectDiagram, title: 'Network Design', description: 'Custom architecture for your needs' },
    { icon: faShieldAlt, title: 'Network Security', description: 'Advanced firewall and VPN protection' },
    { icon: faWifi, title: 'Wireless Solutions', description: 'Enterprise-grade WiFi deployment' },
    { icon: faTools, title: 'Network Support', description: '24/7 monitoring and maintenance' },
    { icon: faServer, title: 'Data Center', description: 'Secure data center solutions' },
    { icon: faSignal, title: 'Connectivity', description: 'High-speed internet solutions' }
  ];

  return (
    <section className="network-features-section">
      <div className="section-header">
        <h2>Our Network Solutions</h2>
        <p>Complete networking services</p>
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

const NetworkSection4 = () => {
  const benefits = [
    { title: 'Fast Deployment', description: 'Quick network setup and configuration' },
    { title: 'Enterprise Security', description: 'Advanced security measures' },
    { title: 'Scalable Solutions', description: 'Grow your network as needed' },
    { title: '24/7 Support', description: 'Round-the-clock assistance' }
  ];

  return (
    <div className="networkSection4">
      <div className="section-header">
        <h2>Why Choose ITCS for Networks?</h2>
        <p>Trusted network solutions provider</p>
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

const NetworkCTA = () => {
  const navigate = useNavigate();
  
  return (
    <section className="network-cta">
      <div className="cta-container">
        <h2>
          Let's Discuss Your <span className="gradient-text">Project</span>
        </h2>
        <p>Get free consultation and transform your business with expert network solutions.</p>
        <button className="btn-primary" onClick={() => navigate('/contact')}>
          Get Free Consultation
          <span>→</span>
        </button>
        <div className="cta-stats">
          <div className="stat-item">
            <div className="stat-number">300+</div>
            <div className="stat-label">Networks</div>
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

const NetworkNew = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <NetworkHero />
      <NetworkSection2 />
      <NetworkFeatures />
      <PartnerLogos partners={networkPartners} ticker heading="Trusted Network Partners" subtext="Strategic alliances with leading network technology providers to deliver robust connectivity solutions" />
      <NetworkSection4 />
      <NetworkCTA />
    </>
  );
};

export default NetworkNew;