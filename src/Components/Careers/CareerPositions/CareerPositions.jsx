import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../../../config/api";
import { getJobUrl } from "../../../utils/blogUrls";
import "./CareerPositions.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faClock, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const CareerPositions = () => {
  const navigate = useNavigate();
  const [positions, setPositions] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [loading, setLoading] = useState(false);

  const departments = ["All", "Engineering", "Design", "Security", "Product", "Sales", "Marketing", "HR", "Support"];

  useEffect(() => {
    const loadJobs = async () => {
      setLoading(true);
      try {
        const res = await axios.get(apiUrl("/api/jobsAdd?t=" + Date.now()));
        setPositions(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error loading jobs:", err);
        setPositions([]);
      } finally {
        setLoading(false);
      }
    };
    loadJobs();
  }, []);

  const filteredPositions =
    selectedDepartment === "All"
      ? positions
      : positions.filter((pos) => pos.department === selectedDepartment);

  return (
    <section className="career-positions" id="positions">
      <div className="positions-container">
        <div className="section-header">
          <span className="section-badge">OPPORTUNITIES</span>
          <h2>Join Our Talent Network</h2>
          <p>We're looking for passionate individuals to help us build the next generation of IT solutions.</p>
        </div>

        <div className="department-filter">
          {departments.map((dept) => (
            <button
              key={dept}
              className={`filter-btn ${selectedDepartment === dept ? "active" : ""}`}
              onClick={() => setSelectedDepartment(dept)}
            >
              {dept}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="loading-state">
            <div className="theme-spinner"></div>
            <p>Scanning for active positions...</p>
          </div>
        ) : filteredPositions.length === 0 ? (
          <div className="no-positions">
            <p>No active openings in this department right now. Check back soon!</p>
          </div>
        ) : (
          <div className="positions-grid">
            {filteredPositions.map((position) => (
              <div
                key={position._id}
                className="position-card"
                onClick={() => navigate(getJobUrl(position))}
              >
                <div className="card-top">
                  <div className="tags">
                    <span className="dept-tag">{position.department}</span>
                    <span className="type-tag">{position.type}</span>
                  </div>
                  <div className="view-arrow">
                    <FontAwesomeIcon icon={faArrowRight} />
                  </div>
                </div>

                <h3>{position.title}</h3>

                <div className="position-meta">
                  <div className="meta-item">
                    <FontAwesomeIcon icon={faLocationDot} />
                    <span>{position.location}</span>
                  </div>
                  <div className="meta-item">
                    <FontAwesomeIcon icon={faClock} />
                    <span>{position.experience}</span>
                  </div>
                </div>

                <p className="position-description">
                  {position.aboutRole
                    ? position.aboutRole.substring(0, 130) + "..."
                    : position.description?.substring(0, 130) + "..."}
                </p>

                <div className="card-footer">
                  <span className="post-date">Active Position</span>
                  <button className="view-btn">View Details</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CareerPositions;
