import React from 'react';
import AINew from './AINew';
import PageSEO from '../../Common/PageSEO';
import { SEO_META } from '../../../config/seoMeta';

const AI = () => {
  const seo = SEO_META.ai;
  return (
    <>
      <PageSEO title={seo.title} description={seo.description} path={seo.path} />
      <AINew />
    </>
  );
};

export default AI;
