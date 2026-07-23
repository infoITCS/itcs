import React from 'react';
import itcsLogo from "../../assets/logos/itcsLogo.webp";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faXTwitter, faFacebookF, faInstagram, faLinkedinIn
} from '@fortawesome/free-brands-svg-icons';
import {
  faMapMarkerAlt, faEnvelope, faPhoneAlt, faFax,
  faArrowRight, faGlobe
} from '@fortawesome/free-solid-svg-icons';
import "./Footer.scss";

const Footer = () => {
  const year = new Date().getFullYear();

  const socialLinks = [
    { icon: faXTwitter, url: 'https://x.com/itcspakistan', label: 'X (Twitter)', color: '#1da1f2' },
    { icon: faFacebookF, url: 'https://www.facebook.com/itcspakistan', label: 'Facebook', color: '#1877f2' },
    { icon: faInstagram, url: 'https://www.instagram.com/itcs.pakistan', label: 'Instagram', color: '#e4405f' },
    { icon: faLinkedinIn, url: 'https://www.linkedin.com/company/itconsultingandservices', label: 'LinkedIn', color: '#0a66c2' },
  ];

  const services = [
    { name: 'Cloud Solutions', path: '/cloud' },
    { name: 'IT Consulting', path: '/consulting' },
    { name: 'Enterprise Solutions', path: '/enterprise-solutions' },
    { name: 'IT Services', path: '/it-services' },
    { name: 'Network Solutions', path: '/network-solutions' },
    { name: 'Cybersecurity', path: '/cybersecurity' },
    { name: 'Web Development', path: '/web-development' },
  ];

  const quickLinks = [
    { name: 'About Us', path: '/about-us' },
    { name: 'Microsoft Solutions', path: '/microsoft' },
    { name: 'Contact', path: '/contact' },
    { name: 'Careers', path: '/careers' },
    { name: 'Blog', path: '/blog' },
    { name: 'Privacy Policy', path: '/privacy-policy' },
    { name: 'Login', path: '/login' },
  ];

  return (
    <footer className="footer">
      <div className="footer-glow" />
      <div className="footer-container">

        <div className="footer-col brand-col">
          <a href="/" className="footer-logo-link">
            <img src={itcsLogo} alt="ITCS Logo" className="footer-logo" width="150" height="83" loading="lazy" decoding="async" />
          </a>
          <p className="footer-desc">
            ITCS strives to provide its customers with the best possible
            solutions using the latest available technology.
          </p>
          <div className="social-row">
            {socialLinks.map((s, i) => (
              <a
                key={i}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-link"
                aria-label={s.label}
                style={{ '--brand': s.color }}
              >
                <FontAwesomeIcon icon={s.icon} />
              </a>
            ))}
          </div>
        </div>

        <div className="footer-col info-col">
          <h3 className="footer-heading">Head Office</h3>
          <ul className="contact-list">
            <li>
              <span className="contact-icon"><FontAwesomeIcon icon={faMapMarkerAlt} /></span>
              <span>6/K Block 2, P.E.C.H.S, Karachi, Pakistan</span>
            </li>
            <li>
              <span className="contact-icon"><FontAwesomeIcon icon={faEnvelope} /></span>
              <a href="mailto:info@itcs.com.pk">info@itcs.com.pk</a>
            </li>
            <li>
              <span className="contact-icon"><FontAwesomeIcon icon={faPhoneAlt} /></span>
              <a href="tel:+9221111482711">021 111-482-711</a>
            </li>
            <li>
              <span className="contact-icon"><FontAwesomeIcon icon={faFax} /></span>
              <span>Fax: 021 4554818</span>
            </li>
          </ul>
        </div>

        <div className="footer-col links-col">
          <h3 className="footer-heading">Services</h3>
          <ul className="footer-links">
            {services.map((s, i) => (
              <li key={i}>
                <Link to={s.path}>
                  <FontAwesomeIcon icon={faArrowRight} className="link-arrow" />
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-col links-col">
          <h3 className="footer-heading">Quick Links</h3>
          <ul className="footer-links">
            {quickLinks.map((l, i) => (
              <li key={i}>
                <Link to={l.path}>
                  <FontAwesomeIcon icon={faArrowRight} className="link-arrow" />
                  {l.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-inner" style={{ justifyContent: 'center' }}>
          <p style={{ textAlign: 'center' }}>&copy; {year} ITCS Pakistan. All rights reserved. Powered by <a href="https://itcs.com.pk" target="_blank" rel="noopener noreferrer" className="footer-site-link">ITCS</a></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
