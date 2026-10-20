import React from "react";
import "./AboutValues.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb, faBullseye, faHandshake, faRocket, faUsers, faHeart } from "@fortawesome/free-solid-svg-icons";

const AboutValues = () => {
  const values = [
    {
      icon: faLightbulb,
      title: "Innovation",
      description: "We embrace cutting-edge technologies and creative solutions to stay ahead of the curve."
    },
    {
      icon: faBullseye,
      title: "Excellence",
      description: "We maintain the highest standards in service delivery and customer satisfaction."
    },
    {
      icon: faHandshake,
      title: "Integrity",
      description: "We build trust through transparency, honesty, and ethical business practices."
    },
    {
      icon: faRocket,
      title: "Growth",
      description: "We invest in continuous learning and development for our team and clients."
    },
    {
      icon: faUsers,
      title: "Teamwork",
      description: "We collaborate effectively to achieve extraordinary results together."
    },
    {
      icon: faHeart,
      title: "Customer Focus",
      description: "We put our clients first and build lasting partnerships based on mutual success."
    }
  ];

  return (
    <section className="about-values">
      <div className="values-container">
        <div className="section-header">
          <span className="section-badge">OUR VALUES</span>
          <h2>What Drives Us Forward</h2>
          <p>These core principles guide our actions and define who we are as a company</p>
        </div>
        <div className="values-grid">
          {values.map((value, index) => (
            <div key={index} className="value-card" data-index={index}>
              <div className="value-icon">
                <FontAwesomeIcon icon={value.icon} />
              </div>
              <h3>{value.title}</h3>
              <p>{value.description}</p>
              <div className="card-hover-effect"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutValues;

