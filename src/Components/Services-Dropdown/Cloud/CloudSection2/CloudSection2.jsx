import React from 'react'
import "./CloudSection2.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud, faDatabase, faGlobe, faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import CloudHeroImg from './../../../../assets/images/cloudSection2.jpg'

const CloudSection2 = () => {
  const services = [
    { icon: faCloud, title: 'Cloud Infrastructure', desc: 'Scalable and reliable cloud servers' },
    { icon: faDatabase, title: 'Data Storage', desc: 'Secure cloud databases' },
    { icon: faGlobe, title: 'Global Network', desc: 'Worldwide data centers' },
    { icon: faShieldAlt, title: 'Advanced Security', desc: 'Enterprise-grade protection' }
  ];

  return (
    <div className='cloudSection2'>
      <div className="cloudSection2-wrapper">
        <div className="content-side">
          <h2>Enterprise Cloud Solutions for Modern Business</h2>
          <p>Legacy infrastructure slows growth, fragments operations, and locks IT teams
            into constant maintenance while limiting access, scalability, and control. On-prem systems create
            bottlenecks in performance, visibility, and speed—holding businesses back when they need to
            move faster. At ITCS, we replace this with cloud environments built for adaptability, resilience,
            and always-on availability—centralizing access, removing hardware constraints, and enabling
            systems that scale on demand. The result is faster execution, lower overhead, and infrastructure
            that works for the business, not against it.

          </p>

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
          <img src={CloudHeroImg} alt="Cloud Solutions" />
        </div>
      </div>
    </div>
  )
}

export default CloudSection2