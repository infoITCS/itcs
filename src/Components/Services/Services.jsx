import React from "react";
import ServicesHero from "./ServicesHero/ServicesHero";
import ServicesGrid from "./ServicesGrid/ServicesGrid";
import ServicesSatisfaction from "./ServicesSatisfaction/ServicesSatisfaction";
import ServicesCertifications from "./ServicesCertifications/ServicesCertifications";
import PageSEO from "../Common/PageSEO";
import { SEO_META } from "../../config/seoMeta";

const Services = () => {
  const seo = SEO_META.services;
  return (
    <>
      <PageSEO title={seo.title} description={seo.description} path={seo.path} />
      <ServicesHero />
      <ServicesGrid />
      <ServicesCertifications />
      <ServicesSatisfaction />
    </>
  );
};

export default Services;
