import React, { useState } from "react";
import "./HomeTestimonials.scss";

const HomeTestimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      company: "Getz Pharma",
      role: "Manager IT",
      text: "I have no words to say thanks because from one strange call for IT support from my colleague, you provided highly technical support and spent almost full day to restore our IT services running on domain environment.",
      rating: 5,
    },
    {
      company: "Hawks Merchants",
      role: "Manager IT",
      text: "I had an excellent experience with ITCS for my web development, SEO and design needs. Their professionalism and attention to detail were outstanding. They delivered a stunning, user-friendly website that perfectly aligned with my vision. Communication was seamless, and their support continued even after project completion. I highly recommend ITCS for high-quality web services!",
      rating: 5,
    },
    {
      company: "The Sind Club",
      role: "Manager IT",
      text: "The ITCS support team is awesome. They are very professional and never hesitate to go above and beyond to satisfy us. Keep up the good work!",
      rating: 5,
    },
    {
      company: "Brands of the Year Awards",
      role: "CEO",
      text: "Our migration to the cloud via Office 365 was made very simple by ITCS. Excellent service and courteous staff!",
      rating: 5,
    },

  ];

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="home-testimonials">
      <div className="testimonials-container">
        <div className="testimonials-header">
          <div className="header-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 21C3 17.134 9 14 9 14C9 14 3 11.866 3 8C3 6.93913 3.42143 5.92172 4.17157 5.17157C4.92172 4.42143 5.93913 4 7 4C8.06087 4 9.07828 4.42143 9.82843 5.17157C10.5786 5.92172 11 6.93913 11 8C11 11.866 5 14 5 14C5 14 11 16.134 11 20C11 21.0609 10.5786 22.0783 9.82843 22.8284C9.07828 23.5786 8.06087 24 7 24C5.93913 24 4.92172 23.5786 4.17157 22.8284C3.42143 22.0783 3 21.0609 3 21ZM14 21C14 17.134 20 14 20 14C20 14 14 11.866 14 8C14 6.93913 14.4214 5.92172 15.1716 5.17157C15.9217 4.42143 16.9391 4 18 4C19.0609 4 20.0783 4.42143 20.8284 5.17157C21.5786 5.92172 22 6.93913 22 8C22 11.866 16 14 16 14C16 14 22 16.134 22 20C22 21.0609 21.5786 22.0783 20.8284 22.8284C20.0783 23.5786 19.0609 24 18 24C16.9391 24 15.9217 23.5786 15.1716 22.8284C14.4214 22.0783 14 21.0609 14 21Z" fill="currentColor" />
            </svg>
          </div>
          <span className="section-badge">TESTIMONIALS</span>
          <h2 className="section-title">What Our Customers Are Saying</h2>
          <p className="section-description">
            World class customer service is our core value
          </p>
        </div>

        <div className="testimonials-content">
          <button className="nav-btn prev-btn" onClick={prevSlide}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="testimonials-slider">
            {testimonials.map((testimonial, index) => (
              <div
                className={`testimonial-card ${index === activeIndex ? 'active' : ''}`}
                key={index}
                style={{ transform: `translateX(${(index - activeIndex) * 110}%)` }}
              >
                <div className="quote-icon">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="#fff" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 21C3 17.134 9 14 9 14C9 14 3 11.866 3 8C3 6.93913 3.42143 5.92172 4.17157 5.17157C4.92172 4.42143 5.93913 4 7 4C8.06087 4 9.07828 4.42143 9.82843 5.17157C10.5786 5.92172 11 6.93913 11 8C11 11.866 5 14 5 14C5 14 11 16.134 11 20C11 21.0609 10.5786 22.0783 9.82843 22.8284C9.07828 23.5786 8.06087 24 7 24C5.93913 24 4.92172 23.5786 4.17157 22.8284C3.42143 22.0783 3 21.0609 3 21Z" />
                  </svg>
                </div>


                <div className="stars">
                  {Array.from({ length: testimonial.rating }, (_, i) => (
                    <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                    </svg>
                  ))}
                </div>

                <p className="testimonial-text">"{testimonial.text}"</p>

                <div className="testimonial-author">
                  <div className="author-avatar">
                    {testimonial.company.charAt(0)}
                  </div>
                  <div className="author-info">
                    <h4 className="author-name">{testimonial.company}</h4>
                    <p className="author-role">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="nav-btn next-btn" onClick={nextSlide}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <div className="testimonials-indicators">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === activeIndex ? 'active' : ''}`}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeTestimonials;

