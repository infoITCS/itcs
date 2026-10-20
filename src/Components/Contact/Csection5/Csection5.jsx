import React from "react";
import "./Csection5.scss";

const Csection5 = () => {
  return (
    <div style={{ textAlign: "center", margin: "2rem 0" }}>
      <h2>Our Office Location</h2>
      <p>Visit us at our office location below:</p>
      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <iframe
          title="office-location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3619.873179931061!2d67.0462726760749!3d24.868180644947245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33e89987a1ccd%3A0xbb93870fb6e868a4!2sPlot%206%20K%2C%20Block%202%20PECHS%2C%20Karachi%2C%20Karachi%20City%2C%20Sindh%2C%20Pakistan!5e0!3m2!1sen!2s!4v1739512737149!5m2!1sen!2s"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default Csection5;
