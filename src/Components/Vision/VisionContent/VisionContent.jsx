import React from "react";
import "./VisionContent.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullseye, faRocket, faLightbulb } from "@fortawesome/free-solid-svg-icons";

const VisionContent = () => {
  const visionPoints = [
    {
      icon: faBullseye,
      title: "Our Vision",
      description: "To be the leading technology partner in the region, driving digital transformation and innovation across industries. We envision a future where technology seamlessly integrates with business to create unprecedented value and opportunities."
    },
    {
      icon: faRocket,
      title: "Our Mission",
      description: "To deliver cutting-edge IT solutions that empower businesses to achieve their full potential. We are committed to excellence, innovation, and building lasting partnerships with our clients through reliable service and expert guidance."
    },
    {
      icon: faLightbulb,
      title: "Our Purpose",
      description: "We exist to simplify complex technology challenges and make innovation accessible to businesses of all sizes. By combining technical expertise with business understanding, we help organizations navigate the digital landscape confidently."
    }
  ];

  const coreValues = [
    {
      number: "01",
      title: "Innovation",
      description: "We embrace change and continuously explore better ways to solve problems and create value. By collaborating with leading industry partners, we ensure you receive best-in-class solutions and outcomes."
    },
    {
      number: "02",
      title: "Excellence",
      description: "We maintain the highest standards in everything we do, from code quality to client service, reinforced by our ISO certified processes and quality management systems."
    },
    {
      number: "03",
      title: "Integrity",
      description: "We conduct business with honesty, transparency, and ethical practices at all times."
    },
    {
      number: "04",
      title: "Collaboration",
      description: "We work together, leveraging diverse perspectives to achieve extraordinary results."
    },
    {
      number: "05",
      title: "Customer Focus",
      description: "We put our clients at the center, understanding their needs and exceeding expectations."
    },
    {
      number: "06",
      title: "Growth",
      description: "We invest in our professionals and foster continuous learning from professional development to internationally recognized standard certifications, to ensure global-level competence and the best for our customers."
    }
  ];

  return (
    <>
      <section className="vision-content">
        <div className="content-container">
          {visionPoints.map((point, index) => (
            <div key={index} className="vision-card">
              <div className="card-icon">
                <FontAwesomeIcon icon={point.icon} />
              </div>
              <h2>{point.title}</h2>
              <p>{point.description}</p>
              <div className="card-glow"></div>
            </div>
          ))}
        </div>
      </section>

      <section className="core-values">
        <div className="values-container">
          <div className="section-header">
            <span className="section-badge">CORE VALUES</span>
            <h2>What We Stand For</h2>
            <p>Our values guide everything we do and shape our culture</p>
          </div>
          <div className="values-grid">
            {coreValues.map((value, index) => (
              <div key={index} className="value-card">
                <div className="value-number">{value.number}</div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default VisionContent;

