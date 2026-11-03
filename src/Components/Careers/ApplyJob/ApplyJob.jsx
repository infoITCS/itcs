import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../../../config/api";
import PageSEO from "../../Common/PageSEO";
import { SEO_META } from "../../../config/seoMeta";
import "./ApplyJob.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser, 
  faEnvelope, 
  faPhone, 
  faFilePdf, 
  faMessage, 
  faPaperPlane, 
  faCircleCheck,
  faArrowLeft,
  faBriefcase,
  faBuilding
} from '@fortawesome/free-solid-svg-icons';

const ApplyJob = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const job = location.state?.job;

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    experience: "",
    preferredLocation: "",
    linkedin: "",
    coverLetter: "",
    resume: null,
  });

  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      setStatus({ type: "error", message: "Only PDF files are allowed." });
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setStatus({ type: "error", message: "Resume must be 5MB or smaller." });
      e.target.value = "";
      return;
    }

    setFormData((prev) => ({ ...prev, resume: file }));
    setStatus({ type: "", message: "" });
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      let resumeBase64 = "";
      if (formData.resume) {
        resumeBase64 = await fileToBase64(formData.resume);
      }

      const payload = {
        jobId: job?._id || "general",
        jobTitle: job?.title || "General Application",
        jobDepartment: job?.department || "N/A",
        jobLocation: job?.location || "N/A",
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        experience: formData.experience,
        preferredLocation: formData.preferredLocation,
        linkedin: formData.linkedin,
        coverLetter: formData.coverLetter,
        resume: resumeBase64,
        resumeName: formData.resume ? formData.resume.name : "resume.pdf",
      };

      await axios.post(apiUrl("/api/jobs/apply"), payload, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      setStatus({ type: "success", message: "Application submitted successfully! Our team will contact you soon." });
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        experience: "",
        preferredLocation: "",
        linkedin: "",
        coverLetter: "",
        resume: null,
      });
      setTimeout(() => navigate("/careers"), 3000);
    } catch (err) {
      const statusCode = err.response?.status || "Network Error";
      const serverMsg = err.response?.data?.message || "";
      const debugInfo = serverMsg ? ` (${serverMsg})` : "";
      setStatus({ type: "error", message: `Failed to submit application (${statusCode}${debugInfo}). Please try again or email us directly.` });
      console.error("Application submit error:", statusCode, err.response?.data, err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="apply-job-themed">
      <PageSEO
        title={job?.title ? `Apply for ${job.title} | ITCS` : SEO_META.apply.title}
        description={SEO_META.apply.description}
        path={SEO_META.apply.path}
        noindex
      />
      <div className="theme-radial-top"></div>

      <div className="apply-container">
        <div className="apply-header">
          <button className="btn-back" onClick={() => navigate(-1)}>
            <FontAwesomeIcon icon={faArrowLeft} /> Back
          </button>
          <span className="apply-badge">JOB APPLICATION</span>
          <h1>{job ? `Applying for ${job.title}` : "Join Our Team"}</h1>
          <div className="job-meta-pill">
            <FontAwesomeIcon icon={faBuilding} /> {job?.department || "General"} · <FontAwesomeIcon icon={faBriefcase} /> {job?.type || "Full-time"}
          </div>
        </div>

        {status.message && (
          <div className={`status-alert ${status.type}`}>
            <FontAwesomeIcon icon={status.type === 'success' ? faCircleCheck : faMessage} />
            {status.message}
          </div>
        )}

        <form className="apply-form-modern" onSubmit={handleSubmit}>
          <div className="form-section">
            <h3><FontAwesomeIcon icon={faUser} /> Personal Information</h3>
            <div className="form-grid">
              <div className="input-group">
                <label>Full Name</label>
                <div className="input-wrapper">
                  <FontAwesomeIcon icon={faUser} className="field-icon" />
                  <input name="fullName" value={formData.fullName} onChange={handleChange} placeholder="John Doe" required />
                </div>
              </div>
              <div className="input-group">
                <label>Email Address</label>
                <div className="input-wrapper">
                  <FontAwesomeIcon icon={faEnvelope} className="field-icon" />
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" required />
                </div>
              </div>
              <div className="input-group">
                <label>Phone Number</label>
                <div className="input-wrapper">
                  <FontAwesomeIcon icon={faPhone} className="field-icon" />
                  <input name="phone" value={formData.phone} onChange={handleChange} placeholder="+92 300 1234567" required />
                </div>
              </div>
              <div className="input-group">
                <label>Years of Experience</label>
                <div className="input-wrapper">
                  <FontAwesomeIcon icon={faBriefcase} className="field-icon" />
                  <input name="experience" value={formData.experience} onChange={handleChange} placeholder="e.g. 3 years" required />
                </div>
              </div>
              <div className="input-group">
                <label>Preferred Location</label>
                <div className="input-wrapper">
                  <FontAwesomeIcon icon={faBuilding} className="field-icon" />
                  <select name="preferredLocation" value={formData.preferredLocation} onChange={handleChange} required>
                    <option value="">Select Location</option>
                    <option value="Karachi">Karachi</option>
                    <option value="Lahore">Lahore</option>
                    <option value="Islamabad">Islamabad</option>
                    <option value="Rawalpindi">Rawalpindi</option>
                    <option value="Remote">Remote</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3><FontAwesomeIcon icon={faFilePdf} /> Documents & Links</h3>
            <div className="form-grid">
              <div className="input-group">
                <label>LinkedIn Profile</label>
                <div className="input-wrapper">
                  <FontAwesomeIcon icon={faMessage} className="field-icon" />
                  <input name="linkedin" value={formData.linkedin} onChange={handleChange} placeholder="https://linkedin.com/in/..." />
                </div>
              </div>
              <div className="input-group">
                <label>Resume (PDF Only)</label>
                <div className="input-wrapper file-input">
                  <FontAwesomeIcon icon={faFilePdf} className="field-icon" />
                  <input type="file" accept=".pdf" onChange={handleFileChange} required />
                </div>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3><FontAwesomeIcon icon={faMessage} /> Cover Letter / Message</h3>
            <div className="textarea-group">
              <textarea name="coverLetter" value={formData.coverLetter} onChange={handleChange} placeholder="Tell us why you're a great fit for this role..." required />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-submit-apply" disabled={loading}>
              {loading ? "Submitting..." : (
                <>
                  Submit Application <FontAwesomeIcon icon={faPaperPlane} />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyJob;
