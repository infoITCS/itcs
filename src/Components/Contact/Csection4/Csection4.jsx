import React from "react";
import "./Csection4.scss";
import KarachiImage from "./../../../assets/images/Karachi-office.webp";
import LahoreImage from "./../../../assets/images/Lahore-office.webp";
import IslamabadImage from "./../../../assets/images/Islamabad-office.webp";
const Csection4 = () => {
  const offices = [
    {
      city: "Karachi",
      address: "6/K, Block 2, P.E.C.H.S, Near Model School, Karachi, Pakistan",
      phone: "+92 21 34188536-8",
      fax: "+92 21 34554818",
      uan: "+92 21 111-482-711",
      image: KarachiImage,
    },
    {
      city: "Lahore",
      address:
        "Office No. 32, 1st Floor, I.T Tower 73-E/1, Hali Rd, Block A Gulberg III, Lahore, Pakistan",
      phone: "04237874358",
      fax: "+92 21 34554818",
      uan: "+92 21 111-482-711",
      image: LahoreImage,
    },
    {
      city: "Islamabad",
      address: "Office # 14, Ground Floor, Malik Plaza, F-8 Markaz, Islamabad",
      phone: "+92 51 2744956",
      fax: "+92 21 34554818",
      uan: "+92 21 111-482-711",
      image: IslamabadImage,
    },
  ];
  return (
    <>
      <div className="office-locations">
        <div className="header2">
          <h4>OUR OFFICES</h4>
          <h2>Our Office Locations</h2>
          <p>
            We have strategically placed offices in key locations throughout
            Pakistan, ensuring easy access for all major cities.
          </p>
        </div>
        <div className="offices">
          {offices.map((office, index) => (
            <div className="office-card" key={index}>
              <img src={office.image} alt={`${office.city} Office`} />
              <div className="office-details">
                <h3>{office.city} Office</h3>
                <p>{office.address}</p>
                <p>
                  <strong>Phone:</strong> {office.phone}
                </p>
                <p>
                  <strong>Fax:</strong> {office.fax}
                </p>
                <p>
                  <strong>UAN:</strong> {office.uan}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Csection4;
