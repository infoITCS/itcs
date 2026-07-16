import React from 'react';
import ITServicesNew from './ITServicesNew';
import PageSEO from '../../Common/PageSEO';
import { SEO_META } from '../../../config/seoMeta';

const ITServices = () => {
  const seo = SEO_META.itServices;
  return (
    <>
      <PageSEO title={seo.title} description={seo.description} path={seo.path} />
      <ITServicesNew />
    </>
  );
};

export default ITServices;