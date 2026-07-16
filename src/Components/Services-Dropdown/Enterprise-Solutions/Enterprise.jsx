import React from 'react';
import EnterpriseNew from './EnterpriseNew';
import PageSEO from '../../Common/PageSEO';
import { SEO_META } from '../../../config/seoMeta';

const Enterprise = () => {
  const seo = SEO_META.enterprise;
  return (
    <>
      <PageSEO title={seo.title} description={seo.description} path={seo.path} />
      <EnterpriseNew />
    </>
  );
};

export default Enterprise;