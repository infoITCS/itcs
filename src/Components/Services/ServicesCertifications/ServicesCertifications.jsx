import React from 'react'
import './ServicesCertifications.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAward, faCheckCircle, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'

const certifications = [
  { name: 'CCNA 200-301', platform: 'Cisco', description: 'Cisco Certified Network Associate in routing and switching', url: 'https://www.cisco.com/site/us/en/learn/training-certifications/certifications/enterprise/ccna/index.html' },
  { name: 'A+ Certification', platform: 'CompTIA', description: 'Entry-level IT certification for hardware and software', url: 'https://www.comptia.org/en-us/certifications/a' },
  { name: 'Fortinet Certified Associate', platform: 'Fortinet', description: 'Foundation certification for Fortinet network security (NSE 3)', url: 'https://training.fortinet.com/local/staticpage/view.php?page=fca_cybersecurity' },
  { name: 'Fortinet NSE Level-3', platform: 'Fortinet', description: 'Fortinet Certified Associate level exam (FCA)', url: 'https://training.fortinet.com/local/staticpage/view.php?page=fca_cybersecurity' },
  { name: 'Fortinet NSE1 & NSE2', platform: 'Fortinet', description: 'Fortinet Certified Fundamentals cybersecurity awareness', url: 'https://training.fortinet.com/local/staticpage/view.php?page=fcf_cybersecurity' },
  { name: 'Fortinet NSE Level-4', platform: 'Fortinet', description: 'Fortinet Certified Professional level exam (FCP)', url: 'https://training.fortinet.com/local/staticpage/view.php?page=fcp_secure_networking' },
  { name: 'Huawei HCIA Cloud Computing', platform: 'Huawei', description: 'Huawei certified ICT associate in cloud computing', url: 'https://edu.huaweicloud.com/intl/en-us/certificationindex/career/cse.html' },
  { name: 'Kaspersky Next EDR Optimum', platform: 'Kaspersky', description: 'Endpoint detection and response specialist', url: 'https://certification.kaspersky.com/' },
  { name: 'Kaspersky Next XDR Optimum', platform: 'Kaspersky', description: 'Extended detection and response expert', url: 'https://certification.kaspersky.com/' },
  { name: 'MS-140', platform: 'Microsoft', description: 'Microsoft certified professional certification', url: 'https://learn.microsoft.com/en-us/training/browse/' },
  { name: 'MS-801', platform: 'Microsoft', description: 'Microsoft technology associate certification', url: 'https://learn.microsoft.com/en-us/training/browse/' },
  { name: 'AZ-800', platform: 'Microsoft', description: 'Administering hybrid core infrastructure', url: 'https://learn.microsoft.com/en-us/credentials/certifications/exams/az-800/' },
  { name: 'AZ-104', platform: 'Microsoft', description: 'Microsoft Azure administrator certification', url: 'https://learn.microsoft.com/en-us/credentials/certifications/azure-administrator/' },
  { name: 'AZ-900', platform: 'Microsoft', description: 'Microsoft Azure fundamentals certification', url: 'https://learn.microsoft.com/en-us/credentials/certifications/azure-fundamentals/' },
  { name: 'MS-900', platform: 'Microsoft', description: 'Microsoft 365 fundamentals certification', url: 'https://learn.microsoft.com/en-us/credentials/certifications/microsoft-365-fundamentals/' },
  { name: 'SC-300', platform: 'Microsoft', description: 'Microsoft identity and access administrator', url: 'https://learn.microsoft.com/en-us/credentials/certifications/identity-and-access-administrator/' },
  { name: 'AZ-801', platform: 'Microsoft', description: 'Windows server hybrid administrator', url: 'https://learn.microsoft.com/en-us/credentials/certifications/exams/az-801/' },
  { name: 'SC-200', platform: 'Microsoft', description: 'Microsoft security operations analyst', url: 'https://learn.microsoft.com/en-us/credentials/certifications/security-operations-analyst/' },
  { name: 'MS-102', platform: 'Microsoft', description: 'Microsoft 365 administrator expert', url: 'https://learn.microsoft.com/en-us/credentials/certifications/exams/ms-102/' },
  { name: 'AZ-204', platform: 'Microsoft', description: 'Developing Azure solutions certification', url: 'https://learn.microsoft.com/en-us/credentials/certifications/azure-developer/' },
  { name: 'DP-100', platform: 'Microsoft', description: 'Azure data scientist associate certification', url: 'https://learn.microsoft.com/en-us/credentials/certifications/azure-data-scientist/' },
  { name: 'MD-102', platform: 'Microsoft', description: 'Microsoft 365 endpoint administrator', url: 'https://learn.microsoft.com/en-us/credentials/certifications/microsoft-365-endpoint-administrator/' },
  { name: 'MS-800', platform: 'Microsoft', description: 'Microsoft 365 certified professional', url: 'https://learn.microsoft.com/en-us/training/browse/' },
  { name: 'Oracle Certified Professional 19C', platform: 'Oracle', description: 'Oracle database professional certification', url: 'https://education.oracle.com/oracle-certification-path/pFamily_32' },
]

const ServicesCertifications = () => {
  return (
    <section className="services-certifications">
      <div className="container">
        <div className="section-header">
          <span className="badge">
            <FontAwesomeIcon icon={faAward} />
            Our Certifications
          </span>
          <h2>Certified Excellence</h2>
          <p>
            Our team holds industry-leading certifications across multiple
            technologies, ensuring expert-level delivery on every project.
          </p>
        </div>

        <div className="certifications-ticker">
          <div className="ticker-track">
            {[...Array(2)].map((_, dupIdx) => (
              <div className="ticker-group" key={dupIdx}>
                {certifications.map((cert, idx) => (
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cert-card"
                    key={`${dupIdx}-${idx}`}
                  >
                    <div className="card-glow"></div>
                    <h3>{cert.name}</h3>
                    <span className="cert-platform">{cert.platform}</span>
                    <p>{cert.description}</p>
                    <div className="cert-badge">
                      <FontAwesomeIcon icon={faCheckCircle} />
                      <span>Verified</span>
                      <FontAwesomeIcon icon={faExternalLinkAlt} className="external-icon" />
                    </div>
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ServicesCertifications
