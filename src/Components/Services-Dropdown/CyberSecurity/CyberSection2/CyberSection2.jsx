import React from 'react'
import "./CyberSection2.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldAlt, faLock, faUserShield, faBell, faFingerprint, faServer } from '@fortawesome/free-solid-svg-icons';
import CyberImg from './../../../../assets/images/CyberSecurity-images/cyberSection3-img.webp';

const CyberSection2 = () => {
  const services = [
    { icon: faShieldAlt, title: 'Threat Protection', desc: 'Advanced defense against cyber threats' },
    { icon: faLock, title: 'Data Encryption', desc: 'Secure your sensitive data' },
    { icon: faUserShield, title: 'Access Control', desc: 'Manage user permissions securely' },
    { icon: faBell, title: 'Real-time Monitoring', desc: '24/7 threat detection' }
  ]

  return (
    <div className='cyberSection2'>
      <div className="cyberSection2-wrapper">
        <div className="content-side">
          <h2>Enterprise Cybersecurity Solutions for Modern Business</h2>
          <p>Protect your business from evolving cyber threats with our comprehensive security solutions. We deliver scalable, secure, and cost-effective cybersecurity services tailored to meet your specific business requirements.</p>
          <p>From startups to enterprises, our security solutions grow with your business, providing the protection you need in today's digital age.</p>
          
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
          <img src={CyberImg} alt="Cybersecurity Solutions" />
        </div>
      </div>
    </div>
  )
}

export default CyberSection2