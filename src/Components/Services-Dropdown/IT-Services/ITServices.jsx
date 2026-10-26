import React from 'react';
import ITServicesNew from './ITServicesNew';
import PageSEO from '../../Common/PageSEO';
import RelatedServicesAndInsights from '../../Common/RelatedServicesAndInsights';
import { SEO_META } from '../../../config/seoMeta';

const ITServices = () => {
  const seo = SEO_META.itServices;
  return (
    <>
      <PageSEO title={seo.title} description={seo.description} path={seo.path} />
      <ITServicesNew />
      <RelatedServicesAndInsights currentPath="/it-services" />
    </>
  );
};

export default ITServices;