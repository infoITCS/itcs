import React from "react";
import PrivacyHero from "./PrivacyHero/PrivacyHero";
import PrivacyContent from "./PrivacyContent/PrivacyContent";
import PageSEO from "../Common/PageSEO";
import { SEO_META } from "../../config/seoMeta";

const Privacy = () => {
  const seo = SEO_META.privacy;
  return (
    <>
      <PageSEO title={seo.title} description={seo.description} path={seo.path} />
      <PrivacyHero />
      <PrivacyContent />
    </>
  );
};

export default Privacy;
