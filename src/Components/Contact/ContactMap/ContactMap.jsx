import React from "react";
import "./ContactMap.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapLocationDot, faLocationDot, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const ContactMap = () => {
  const offices = [
    {
      city: "Karachi",
      address: "6/K Block 2, P.E.C.H.S, Karachi, Pakistan",
      phone: "021 111-482-711",
      email: "info@itcs.com.pk",
      mapUrl: "https://www.google.com/maps/dir//6%2FK+Block+2+P.E.C.H.S+Karachi+Pakistan"
    },
    {
      city: "Lahore",
      address: "Office No. 32, 1st Floor, I.T Tower 73-E/1، Hali Rd, Block A Gulberg III Lahore, Pakistan",
      phone: "042 378-74358",
      email: "info@itcs.com.pk",
      mapUrl: "https://www.google.com/maps/dir//I.T+Tower+73-E%2F1+Hali+Rd+Gulberg+III+Lahore+Pakistan"
    },
    {
      city: "Islamabad",
      address: "Office # 14, Ground Floor, Malik Plaza F-8 Markaz, Islamabad",
      phone: "+92 51 2744956",
      email: "info@itcs.com.pk",
      mapUrl: "https://www.google.com/maps/dir//Malik+Plaza+F-8+Markaz+Islamabad+Pakistan"
    }
  ];

  return (
    <section className="contact-map-section">
      <div className="map-container">
        <div className="section-header">
          <span className="section-badge">OUR LOCATIONS</span>
          <h2>Find Us</h2>
          <p>Visit our offices across Pakistan or get in touch remotely.</p>
        </div>

        <div className="offices-grid">
          {offices.map((office, index) => (
            <div key={index} className="office-card">
              <div className="office-icon"><FontAwesomeIcon icon={faMapLocationDot} size="xs" /></div>
              <h3>{office.city}</h3>
              <div className="office-details">
                <p className="office-address">
                  <FontAwesomeIcon icon={faLocationDot} className="detail-icon" />
                  {office.address}
                </p>
                <p className="office-phone">
                  <FontAwesomeIcon icon={faPhone} className="detail-icon" />
                  {office.phone}
                </p>
                <p className="office-email">
                  <FontAwesomeIcon icon={faEnvelope} className="detail-icon" />
                  {office.email}
                </p>
              </div>
              <a href={office.mapUrl} target="_blank" rel="noopener noreferrer" className="directions-btn">
                Get Directions →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactMap;