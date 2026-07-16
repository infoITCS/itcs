import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../../../config/api";
import { getJobUrl } from "../../../utils/blogUrls";
import { isMongoObjectId } from "../../../utils/slugify";
import PageSEO from "../../Common/PageSEO";
import { jobSeoFromJob, SEO_META } from "../../../config/seoMeta";
import "./JobDetail.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faClock,
  faBriefcase,
  faArrowLeft,
  faCircleCheck,
  faStar,
  faGraduationCap,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJob = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get(apiUrl(`/api/jobsAdd/${id}?t=${Date.now()}`));
        const data = res.data;
        setJob(data);

        const canonical = getJobUrl(data).replace("/careers/", "");
        if (canonical && id !== canonical) {
          navigate(`/careers/${canonical}`, { replace: true });
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Position details are currently unavailable.");
        setJob(null);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
    window.scrollTo(0, 0);
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="theme-loading">
        <div className="theme-spinner"></div>
        <p>Loading Position Details...</p>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="theme-error">
        <PageSEO title="Position Not Found | ITCS" description={SEO_META.careers.description} path="/careers" noindex />
        <h2>Position Not Found</h2>
        <p>{error}</p>
        <button className="theme-btn" onClick={() => navigate("/careers")}>
          Back to Careers
        </button>
      </div>
    );
  }

  if (isMongoObjectId(id) && job.slug && id !== job.slug) {
    return (
      <div className="theme-loading">
        <div className="theme-spinner"></div>
        <p>Loading Position Details...</p>
      </div>
    );
  }

  const parseList = (text) => (text ? text.split(/\r?\n/).filter((l) => l.trim() !== "") : []);

  const handleApply = () => {
    navigate("/apply", { state: { job } });
  };

  return (
    <div className="job-detail-themed">
      <PageSEO {...jobSeoFromJob(job)} />
      <div className="theme-radial-top"></div>
      <div className="theme-radial-bottom"></div>

      <div className="detail-wrapper">
        <div className="detail-top-nav">
          <button className="btn-back" onClick={() => navigate("/careers")}>
            <FontAwesomeIcon icon={faArrowLeft} /> Back to Careers
          </button>
        </div>

        <div className="detail-grid">
          <div className="detail-main">
            <header className="detail-header">
              <div className="header-tags">
                <span className="tag-dept">{job.department}</span>
                <span className="tag-type">{job.type}</span>
              </div>
              <h1>{job.title}</h1>
              <div className="header-meta">
                <div className="meta-item">
                  <FontAwesomeIcon icon={faLocationDot} />
                  <span>{job.location}</span>
                </div>
                <div className="meta-item">
                  <FontAwesomeIcon icon={faClock} />
                  <span>{job.experience}</span>
                </div>
              </div>
            </header>

            <div className="content-blocks">
              {job.aboutRole && (
                <section className="detail-section">
                  <div className="section-head">
                    <div className="head-icon">
                      <FontAwesomeIcon icon={faStar} />
                    </div>
                    <h2>About This Role</h2>
                  </div>
                  <div className="section-body">
                    <p>{job.aboutRole}</p>
                  </div>
                </section>
              )}
            </div>
          </div>

          <div className="detail-sidebar">
            <div className="sidebar-sticky">
              <div className="apply-card-themed">
                <h3>Start Your Journey</h3>
                <p>Join ITCS and collaborate with the best in the industry to build future-ready solutions.</p>
                <button className="btn-apply-themed" onClick={handleApply}>
                  Apply For This Job
                </button>
                <div className="sidebar-status">
                  <div className="pulse-dot"></div>
                  <span>Accepting Applications</span>
                </div>
              </div>

              <div className="contact-card-themed">
                <h4>Support & Questions</h4>
                <div className="contact-info">
                  <a href="mailto:info@itcs.com.pk">
                    <FontAwesomeIcon icon={faBriefcase} />
                    <span>info@itcs.com.pk</span>
                  </a>
                  <a href="tel:021111482711">
                    <FontAwesomeIcon icon={faBriefcase} />
                    <span>021 111-482-711</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="full-width-content">
          {job.responsibilities && (
            <section className="detail-section-full">
              <div className="section-head">
                <div className="head-icon">
                  <FontAwesomeIcon icon={faCircleCheck} />
                </div>
                <h2>Key Responsibilities</h2>
              </div>
              <div className="section-body">
                <ul className="full-theme-list">
                  {parseList(job.responsibilities).map((item, i) => (
                    <li key={i}>
                      <FontAwesomeIcon icon={faChevronRight} className="li-arrow" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {job.qualifications && (
            <section className="detail-section-full">
              <div className="section-head">
                <div className="head-icon">
                  <FontAwesomeIcon icon={faGraduationCap} />
                </div>
                <h2>Qualifications & Skills</h2>
              </div>
              <div className="section-body">
                <div className="full-qual-grid">
                  {parseList(job.qualifications).map((item, i) => (
                    <div className="qual-item-pro" key={i}>
                      <div className="item-dot"></div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          <section className="benefits-section-full">
            <div className="section-head-centered">
              <div className="head-icon">
                <FontAwesomeIcon icon={faStar} />
              </div>
              <h2>Exclusive Employee Benefits</h2>
              <p>We invest in our people to ensure a fulfilling and rewarding career journey.</p>
            </div>
            <div className="benefits-bento-pro">
              {[
                { title: "Health Insurance", desc: "Complete medical coverage for self & family" },
                { title: "Provident Fund", desc: "Long-term financial security plans" },
                { title: "Annual Paid Leaves", desc: "Generous time off for work-life balance" },
                { title: "Compensation Plans", desc: "Competitive salary & performance bonuses" },
                { title: "Paid Certifications", desc: "Upskill with company-sponsored training" },
                { title: "Monthly Rewards", desc: "Recognition for outstanding performance" },
                { title: "Quarterly Meetups", desc: "Team building & social engagements" },
                { title: "Referral Bonuses", desc: "Rewards for bringing in top talent" },
              ].map((benefit, i) => (
                <div className="benefit-card-full" key={i}>
                  <div className="card-icon">
                    <FontAwesomeIcon icon={faStar} />
                  </div>
                  <div className="card-info">
                    <h4>{benefit.title}</h4>
                    <p>{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
