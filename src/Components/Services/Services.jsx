import React from "react";
import ServicesHero from "./ServicesHero/ServicesHero";
import ServicesGrid from "./ServicesGrid/ServicesGrid";
import ServicesSatisfaction from "./ServicesSatisfaction/ServicesSatisfaction";
import ServicesCertifications from "./ServicesCertifications/ServicesCertifications";

const Services = () => {
  return (
    <>
      <ServicesHero />
      <ServicesGrid />
      <ServicesCertifications />
      <ServicesSatisfaction />
    </>
  );
};

export default Services;
