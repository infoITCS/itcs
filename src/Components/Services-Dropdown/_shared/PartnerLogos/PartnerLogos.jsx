import React from 'react'
import './PartnerLogos.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faCheckCircle } from '@fortawesome/free-solid-svg-icons'

const tickerVendors = [
  { name: 'Fortinet', type: 'Technology Partner', description: 'Next-gen firewall and network security solutions', status: 'Verified Partner' },
  { name: 'CrowdStrike', type: 'Technology Partner', description: 'Cloud-native endpoint protection platform', status: 'Verified Partner' },
  { name: 'Cisco', type: 'Gold Partner', description: 'Enterprise networking and security infrastructure', status: 'Verified Partner' },
  { name: 'SentinelOne', type: 'Technology Partner', description: 'AI-powered autonomous cybersecurity platform', status: 'Verified Partner' },
  { name: 'Trend Micro', type: 'Technology Partner', description: 'Cloud and endpoint security solutions', status: 'Verified Partner' },
  { name: 'Sophos', type: 'Technology Partner', description: 'Next-generation cybersecurity for businesses', status: 'Verified Partner' },
  { name: 'Cloudflare', type: 'Technology Partner', description: 'Web security, CDN, and DDoS mitigation', status: 'Verified Partner' },
  { name: 'Rapid7', type: 'Technology Partner', description: 'Vulnerability management and threat intelligence', status: 'Verified Partner' },
  { name: 'Barracuda Networks', type: 'Technology Partner', description: 'Email security, network, and data protection', status: 'Verified Partner' },
  { name: 'Kaspersky', type: 'Technology Partner', description: 'Enterprise endpoint security and threat research', status: 'Verified Partner' },
];

const PartnerLogos = ({ partners, ticker, heading, subtext }) => {
  const displayPartners = ticker ? (partners || tickerVendors) : partners;

  return (
    <section className="partner-logos">
      <div className="container">
        <div className="section-header">
          <span className="badge">
            <FontAwesomeIcon icon={faStar} />
            Our Partners
          </span>
          <h2>{heading || 'Trusted Technology Partnerships'}</h2>
          <p>{subtext || 'Strategic alliances with industry-leading technology providers to deliver world-class solutions'}</p>
        </div>

        <div className={`partners-${ticker ? 'ticker' : 'grid'}`}>
          {ticker ? (
            <div className="ticker-track">
              {[...Array(2)].map((_, dupIdx) => (
                <div className="ticker-group" key={dupIdx}>
                  {displayPartners.map((vendor, idx) => (
                    <div className="partner-card" key={`${dupIdx}-${idx}`}>
                      <div className="card-glow"></div>
                      <h3>{vendor.name}</h3>
                      <span className="partner-type">{vendor.type}</span>
                      <p>{vendor.description}</p>
                      <div className="partner-badge">
                        <FontAwesomeIcon icon={faCheckCircle} />
                        <span>{vendor.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ) : (
            partners.map((partner, index) => (
              <div className="partner-card" key={index}>
                <div className="card-glow"></div>
                <div className="card-icon">
                  <FontAwesomeIcon icon={partner.icon} />
                </div>
                <h3>{partner.name}</h3>
                <span className="partner-type">{partner.type}</span>
                <p>{partner.description}</p>
                <div className="partner-badge">
                  <FontAwesomeIcon icon={faCheckCircle} />
                  <span>{partner.status}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  )
}

export default PartnerLogos
