import React, { useRef } from 'react';
import "./HomePartners.scss";
import Acunetix from "./../../../assets/images/Acunetix.webp";
import Adobe from "./../../../assets/images/Adobe.webp";
import AutoDesk from "./../../../assets/images/AutoDesk.webp";
import Barracuda from "./../../../assets/images/Barracuda.webp";
import CorelDraw from "./../../../assets/images/CorelDraw.webp";
import CPanel from "./../../../assets/images/CPanel.webp";
import Digicert from "./../../../assets/images/Digicert.webp";
import Dynamics365 from "./../../../assets/images/Dynamics365.webp";
import Fortinet from "./../../../assets/images/Fortinet.webp";
import Kaspersky from "./../../../assets/images/Kaspersky.webp";
import ManageEngine from "./../../../assets/images/ManageEngine.webp";
import Microsoft from "./../../../assets/images/Microsoft.webp";
import Nvidia from "./../../../assets/images/Nvidia.webp";
import Office365 from "./../../../assets/images/Office365.webp";
import Plesk from "./../../../assets/images/Plesk.webp";
import PortSwigger from "./../../../assets/images/PortSwigger.webp";
import Rapid from "./../../../assets/images/Rapid.webp";
import Ruigie from "./../../../assets/images/Ruigie.webp";
import SolarWinds from "./../../../assets/images/SolarWinds.webp";
import Sophos from "./../../../assets/images/Sophos.webp";
import Symantec from "./../../../assets/images/Symantec.webp";
import Veeam from "./../../../assets/images/Veeam.webp";
import Vmware from "./../../../assets/images/Vmware.webp";
import Zoom from "./../../../assets/images/Zoom.webp";

const logos = [
  { img: Acunetix, url: "https://www.acunetix.com" },
  { img: Adobe, url: "https://www.adobe.com" },
  { img: AutoDesk, url: "https://www.autodesk.com" },
  { img: Barracuda, url: "https://www.barracuda.com" },
  { img: CorelDraw, url: "https://www.corel.com" },
  { img: CPanel, url: "https://cpanel.net" },
  { img: Digicert, url: "https://www.digicert.com" },
  { img: Dynamics365, url: "https://dynamics.microsoft.com" },
  { img: Fortinet, url: "https://www.fortinet.com" },
  { img: Kaspersky, url: "https://www.kaspersky.com" },
  { img: ManageEngine, url: "https://www.manageengine.com" },
  { img: Microsoft, url: "https://www.microsoft.com" },
  { img: Nvidia, url: "https://www.nvidia.com" },
  { img: Office365, url: "https://www.microsoft.com/microsoft-365" },
  { img: Plesk, url: "https://www.plesk.com" },
  { img: PortSwigger, url: "https://portswigger.net" },
  { img: Rapid, url: "https://rapidapi.com" },
  { img: Ruigie, url: "https://www.ruigie.com" },
  { img: SolarWinds, url: "https://www.solarwinds.com" },
  { img: Sophos, url: "https://www.sophos.com" },
  { img: Symantec, url: "https://www.broadcom.com/products/enterprise-software/security" },
  { img: Veeam, url: "https://www.veeam.com" },
  { img: Vmware, url: "https://www.vmware.com" },
  { img: Zoom, url: "https://zoom.us" },
];

const HomePartners = () => {
  const sliderTrackRef = useRef(null);

  const handleMouseEnter = () => {
    if (sliderTrackRef.current) {
      sliderTrackRef.current.style.animationPlayState = "paused";
    }
  };

  const handleMouseLeave = () => {
    if (sliderTrackRef.current) {
      sliderTrackRef.current.style.animationPlayState = "running";
    }
  };

  return (
    <section className="home-partners">
      <div className="partners-container">
        <div className="partners-header">
          <span className="section-badge">TRUSTED BY INDUSTRY LEADERS</span>
          <h2 className="section-title">Our Technology Partners</h2>
          <p className="section-description">
            We collaborate with the world's leading technology providers to deliver 
            exceptional solutions
          </p>
        </div>

        <div className="partners-slider">
          <div
            className="slider-track"
            ref={sliderTrackRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {logos.filter(logo => logo.img).map((logo, index) => (
              <div className="logo-wrapper" key={index}>
                <a href={logo.url} target="_blank" rel="noopener noreferrer">
                  <img src={logo.img} alt={`Partner ${index + 1}`} />
                </a>
              </div>
            ))}
            {/* Duplicate for seamless loop */}
            {logos.filter(logo => logo.img).map((logo, index) => (
              <div className="logo-wrapper" key={`duplicate-${index}`}>
                <a href={logo.url} target="_blank" rel="noopener noreferrer">
                  <img src={logo.img} alt={`Partner Duplicate ${index + 1}`} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePartners;

