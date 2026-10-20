import React, { useEffect } from 'react'
import './SecurityAssessment.scss'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShieldAlt, faSearch, faLock, faBug, faServer, faFingerprint } from '@fortawesome/free-solid-svg-icons'
import PageSEO from '../../../Common/PageSEO'
import { SEO_META } from '../../../../config/seoMeta'

const SecurityAssessment = () => {
  const navigate = useNavigate()
  const seo = SEO_META.securityAssessment

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const assessments = [
    { icon: faSearch, title: 'Vulnerability Assessment', description: 'Identify weaknesses in your infrastructure' },
    { icon: faLock, title: 'Penetration Testing', description: 'Simulate real attacks to test defenses' },
    { icon: faBug, title: 'Malware Analysis', description: 'Detect and analyze malicious software' },
    { icon: faShieldAlt, title: 'Security Audit', description: 'Comprehensive security posture review' },
    { icon: faServer, title: 'Network Security', description: 'Evaluate network infrastructure' },
    { icon: faFingerprint, title: 'Identity Access', description: 'Review access controls and permissions' }
  ]

  const process = [
    { step: '01', title: 'Discovery', description: 'We gather information about your infrastructure' },
    { step: '02', title: 'Scanning', description: 'Automated vulnerability scanning tools' },
    { step: '03', title: 'Analysis', description: 'Expert analysis of findings' },
    { step: '04', title: 'Report', description: 'Detailed report with recommendations' }
  ]

  return (
    <div className="security-assessment">
      <PageSEO title={seo.title} description={seo.description} path={seo.path} />
      <section className="sa-hero">
        <div className="hero-badge">
          <FontAwesomeIcon icon={faShieldAlt} />
          <span>SECURITY ASSESSMENT</span>
        </div>
        <h1>Comprehensive Security Assessment for Your Business</h1>
        <p>Identify vulnerabilities before attackers do. Our expert team provides thorough security assessments to protect your digital assets.</p>
      </section>

      <section className="sa-overview">
        <div className="container">
          <div className="section-header">
            <h2>What We Assess</h2>
            <p>Our comprehensive assessment covers all aspects of your security infrastructure</p>
          </div>
          <div className="assessment-grid">
            {assessments.map((item, idx) => (
              <div className="assessment-card" key={idx}>
                <div className="card-icon">
                  <FontAwesomeIcon icon={item.icon} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sa-process">
        <div className="container">
          <div className="section-header">
            <h2>Our Assessment Process</h2>
            <p>A systematic approach to identifying and addressing security gaps</p>
          </div>
          <div className="process-grid">
            {process.map((item, idx) => (
              <div className="process-card" key={idx}>
                <div className="step-number">{item.step}</div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sa-benefits">
        <div className="container">
          <div className="section-header">
            <h2>Why Get a Security Assessment?</h2>
            <p>Protect your business from evolving cyber threats</p>
          </div>
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon"><FontAwesomeIcon icon={faSearch} /></div>
              <h3>Identify Vulnerabilities</h3>
              <p>Find weak points before attackers do</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon"><FontAwesomeIcon icon={faLock} /></div>
              <h3>Protect Data</h3>
              <p>Safeguard customer information</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon"><FontAwesomeIcon icon={faShieldAlt} /></div>
              <h3>Stay Compliant</h3>
              <p>Meet ISO, SOC2 requirements</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon"><FontAwesomeIcon icon={faBug} /></div>
              <h3>Reduce Risk</h3>
              <p>Prevent data breaches</p>
            </div>
          </div>
        </div>
      </section>

      <section className="sa-cta">
        <div className="container">
          <h2>Ready to Secure Your Business?</h2>
          <p>Contact our security experts today for a personalized assessment quote</p>
          <button className="btn-primary" onClick={() => navigate('/contact')}>
            Get Free Consultation
          </button>
        </div>
      </section>
    </div>
  )
}

export default SecurityAssessment