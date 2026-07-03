import React, { useState } from "react";
import axios from "axios";
import { apiUrl } from "../../../config/api";
import "./ContactForm.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faEnvelope, faPhone, faCircleCheck, faMessage } from "@fortawesome/free-solid-svg-icons";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      await axios.post(apiUrl("/api/contact"), formData);
      setStatus({ type: "success", message: "Message sent successfully! We'll get back to you within 24 hours." });
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
    } catch (err) {
      console.error("Contact form error:", err);
      const serverMessage = err.response?.data?.message;
      setStatus({
        type: "error",
        message: serverMessage || "Failed to send message. Please try again later."
      });
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: faMapMarkerAlt,
      title: "Head Office",
      description: "6/K Block 2, P.E.C.H.S, Karachi, Pakistan"
    },
    {
      icon: faEnvelope,
      title: "Email Us",
      description: "info@itcs.com.pk\nsupport@itcs.com.pk"
    },
    {
      icon: faPhone,
      title: "Call Us",
      description: "021 111-482-711\nMon-Fri: 9AM - 6PM"
    }
  ];

  return (
    <section className="contact-form-section">
      <div className="form-container">
        <div className="form-wrapper">
          <div className="form-header">
            <h2>Send Us a Message</h2>
            <p>Fill out the form below and we'll get back to you within 24 hours.</p>
          </div>
          {status.message && (
            <div className={`status-alert ${status.type}`} style={{ padding: "10px", marginBottom: "15px", borderRadius: "5px", backgroundColor: status.type === 'success' ? '#d4edda' : '#f8d7da', color: status.type === 'success' ? '#155724' : '#721c24' }}>
              <FontAwesomeIcon icon={status.type === 'success' ? faCircleCheck : faMessage} style={{ marginRight: '8px' }} />
              {status.message}
            </div>
          )}
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+92 300 1234567"
                />
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help?"
                  required
                />
              </div>
            </div>

            <div className="form-group full-width">
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us more about your project..."
                rows="6"
                required
              ></textarea>
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
              {!loading && <span className="btn-icon">→</span>}
            </button>
          </form>
        </div>

        <div className="contact-info">
          {contactInfo.map((info, index) => (
            <div key={index} className="info-card">
              <div className="info-icon">
                <FontAwesomeIcon icon={info.icon} />
              </div>
              <h3>{info.title}</h3>
              <p>{info.description.split("\n").map((line, idx) => <span key={idx}>{line}<br /></span>)}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ContactForm;