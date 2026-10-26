import React from 'react';
import AINew from './AINew';
import PageSEO from '../../Common/PageSEO';
import RelatedServicesAndInsights from '../../Common/RelatedServicesAndInsights';
import { SEO_META } from '../../../config/seoMeta';

const AI = () => {
  const seo = SEO_META.ai;
  return (
    <>
      <PageSEO title={seo.title} description={seo.description} path={seo.path} />
      <AINew />
      <RelatedServicesAndInsights currentPath="/ai" />
    </>
  );
};

export default AI;
