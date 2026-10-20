import React from "react";
import "./CareerSection2.scss";
const CareerSection2 = () => {
  const steps = [
    {
      title: "Submission",
      description: "This is where you, as the candidate, apply for the job by sending your resume or CV..",
    },
    {
      title: "Phone Screening",
      description: "This is a preliminary phone call with a recruiter to discuss your interest in the role and quickly assess your fit.",
    },
    {
      title: "Assessment",
      description: "This in-depth stage involves questioning tailored to the role. For creative positions, expect portfolio review. Technical skills might be assessed alongside your experience and what is fit for the company.",
    },
    {
      title: "Final Interview",
      description: "This is the most in-depth stage, usually involving a panel of interviewers who ask questions about your experience, skills, and motivations. It's your chance to showcase your personality, enthusiasm, and how you'd contribute to the company.",
    },
  ];
  return (
    <>
      <section className="recruitment-section">
        <div className="Careerheader">
          <h1>Ready To Join Our Team?</h1>
        </div>
        <div className="content">
          <div className="text">
            <h2>Learn Our Recruitment Process</h2>
            <p>
              The recruitment process begins with the submission of CVs,
              followed by phone screening, assessment, and a final interview. At
              ITCS, we believe in working together and working hard.
            </p>
            <p>
              Discover the difference of working at ITCS – where your career
              takes flight, and your work is more than just a job; it's a
              fulfilling journey.
            </p>
          </div>
          <div className="cards">
            {steps.map((step, index) => (
              <div key={index} className="card">
                <div className="card-inner">
                  <div className="card-front">
                    <span className="icon">➜</span>
                    <h3>{step.title}</h3>
                  </div>
                  <div className="card-back">
                    <p>{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default CareerSection2;
