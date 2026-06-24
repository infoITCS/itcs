import React from "react";
import "./AboutTeam.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLaptopCode, faPalette, faLock, faChartBar, faHeadset } from "@fortawesome/free-solid-svg-icons";


const AboutTeam = () => {
  const teamStats = [
    {
      number: "50+",
      label: "Professionals",
      description: "Experts across various domains"
    },
    {
      number: "15+",
      label: "Certifications",
      description: "Industry-recognized credentials"
    },
    {
      number: "20+",
      label: "Years Avg.",
      description: "Combined team experience"
    }
  ];

  const departments = [
    {
      icon: faLaptopCode,
      title: "Development Team",
      count: "20+ Engineers",
      skills: ["Full Stack", "Mobile", "Cloud", "DevOps"]
    },
    {
      icon: faPalette,
      title: "Design Team",
      count: "8+ Designers",
      skills: ["UI/UX", "Graphics", "Branding", "Motion"]
    },
    {
      icon: faLock,
      title: "Security Team",
      count: "6+ Specialists",
      skills: ["Pentesting", "Compliance", "Audit", "SOC"]
    },
    {
      icon: faChartBar,
      title: "Consulting Team",
      count: "10+ Consultants",
      skills: ["Strategy", "Digital Transform", "PM", "BA"]
    },
    {
      icon: faHeadset,
      title: "Support Team",
      count: "20+ Specialists",
      skills: ["IT Support", "Help Desk", "Network Ops", "24/7 Service"]
    }
  ];


  return (
    <section className="about-team">
      <div className="team-container">
        <div className="section-header">
          <span className="section-badge">OUR TEAM</span>
          <h2>Meet the People Behind the Success</h2>
          <p>A diverse team of passionate professionals dedicated to delivering excellence</p>
        </div>

        <div className="team-stats">
          {teamStats.map((stat, index) => (
            <div key={index} className="stat-card">
              <h3>{stat.number}</h3>
              <h4>{stat.label}</h4>
              <p>{stat.description}</p>
            </div>
          ))}
        </div>

        <div className="departments-grid">
          {departments.map((dept, index) => (
            <div key={index} className="dept-card">
              <div className="dept-icon">
                <FontAwesomeIcon icon={dept.icon} />
              </div>
              <h3>{dept.title}</h3>
              <p className="dept-count">{dept.count}</p>
              <div className="skills-list">
                {dept.skills.map((skill, idx) => (
                  <span key={idx} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="join-cta">
          <h3>Want to Join Our Team?</h3>
          <p>We're always looking for talented individuals to join our growing family</p>
          <a href="/careers" className="cta-button">
            View Open Positions →
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutTeam;

