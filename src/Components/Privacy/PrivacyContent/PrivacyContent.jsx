import React from "react";
import "./PrivacyContent.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserShield,
  faDatabase,
  faClipboardList,
  faShareNodes,
  faLock,
  faScaleBalanced,
} from "@fortawesome/free-solid-svg-icons";

const PrivacyContent = () => {
  const infoTypes = [
    {
      title: "Personal Information",
      description: "This includes your name, email address, phone number, and other contact details.",
    },
    {
      title: "Professional Information",
      description: "This may include your job title, company name, and industry.",
    },
    {
      title: "Usage Data",
      description: "Information about how you interact with our website, such as your IP address, browser type, and pages visited.",
    },
    {
      title: "Payment Information",
      description: "If you make a purchase, we may collect your payment card details and billing address.",
    },
  ];

  const collectionMethods = [
    {
      title: "Directly from you",
      description: "When you provide information through our website, contact forms, or email.",
    },
    {
      title: "Automatically",
      description: "Through the use of cookies and similar technologies to track your usage and preferences.",
    },
  ];

  const usePurposes = [
    {
      title: "Providing Services",
      description: "To deliver the IT consulting and services you have requested.",
    },
    {
      title: "Communication",
      description: "To respond to your inquiries, provide updates, and send relevant information.",
    },
    {
      title: "Improving Our Services",
      description: "To analyze usage patterns and make improvements to our website and services.",
    },
    {
      title: "Marketing and Sales",
      description: "To send you marketing materials and promotional offers, subject to your consent.",
    },
    {
      title: "Compliance with Legal Obligations",
      description: "To comply with applicable laws and regulations.",
    },
  ];

  const sharingParties = [
    {
      title: "Service Providers",
      description: "Third-party service providers who assist us in delivering our services.",
    },
    {
      title: "Legal Authorities",
      description: "If required by law or to protect our rights.",
    },
  ];

  const userRights = [
    { title: "Access", description: "Request access to your personal information." },
    { title: "Rectification", description: "Request correction of inaccurate or incomplete information." },
    { title: "Erasure", description: "Request deletion of your personal information." },
    { title: "Restriction", description: "Request restriction of processing your personal information." },
    { title: "Data Portability", description: "Request transfer of your personal information to another data controller." },
    { title: "Object", description: "Object to processing of your personal information." },
  ];

  return (
    <section className="privacy-content">
      <div className="content-container">

        <article className="privacy-card">
          <div className="card-icon">
            <FontAwesomeIcon icon={faUserShield} />
          </div>
          <span className="card-badge">INTRODUCTION</span>
          <h2>Introduction</h2>
          <p>
            ITCS (IT Consulting and Services) is committed to protecting the privacy and security of your personal information.
            This Privacy Policy outlines how we collect, use, disclose, and safeguard your personal information when you
            interact with our website, services, or otherwise engage with us.
          </p>
        </article>

        <article className="privacy-card">
          <div className="card-icon">
            <FontAwesomeIcon icon={faDatabase} />
          </div>
          <span className="card-badge">INFORMATION WE COLLECT</span>
          <h2>We may collect the following types of personal information</h2>
          <div className="privacy-list">
            {infoTypes.map((item) => (
              <div key={item.title} className="privacy-list-item">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="privacy-card">
          <div className="card-icon">
            <FontAwesomeIcon icon={faClipboardList} />
          </div>
          <span className="card-badge">HOW WE COLLECT INFORMATION</span>
          <h2>We collect information through various methods, including</h2>
          <div className="privacy-grid two-col">
            {collectionMethods.map((item) => (
              <div key={item.title} className="privacy-grid-item">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="privacy-card highlight">
          <span className="card-badge light">HOW WE USE YOUR INFORMATION</span>
          <h2>We use your personal information for the following purposes</h2>
          <div className="privacy-list compact">
            {usePurposes.map((item) => (
              <div key={item.title} className="privacy-list-item">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="privacy-card">
          <div className="card-icon">
            <FontAwesomeIcon icon={faShareNodes} />
          </div>
          <span className="card-badge">SHARING YOUR INFORMATION</span>
          <h2>We may share your personal information with</h2>
          <div className="privacy-grid two-col">
            {sharingParties.map((item) => (
              <div key={item.title} className="privacy-grid-item">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
          <div className="security-note">
            <div className="security-icon">
              <FontAwesomeIcon icon={faLock} />
            </div>
            <div>
              <h3>Data Security</h3>
              <p>
                We implement reasonable security measures to protect your personal information from unauthorized access,
                disclosure, alteration, or destruction. However, please note that no security system is completely impenetrable.
              </p>
            </div>
          </div>
        </article>

        <article className="privacy-card highlight">
          <div className="card-icon light">
            <FontAwesomeIcon icon={faScaleBalanced} />
          </div>
          <span className="card-badge light">YOUR RIGHTS</span>
          <h2>You have the right to</h2>
          <div className="privacy-grid three-col">
            {userRights.map((item) => (
              <div key={item.title} className="privacy-grid-item">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="privacy-card contact-card">
          <h2>Questions about this policy?</h2>
          <p>
            If you have any questions or concerns about this Privacy Policy, please contact us at{" "}
            <a href="mailto:info@itcs.com.pk">info@itcs.com.pk</a>.
          </p>
        </article>

      </div>
    </section>
  );
};

export default PrivacyContent;
