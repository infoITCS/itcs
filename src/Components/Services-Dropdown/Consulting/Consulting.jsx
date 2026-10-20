import React from 'react';
import ConsultingNew from './ConsultingNew';
import PageSEO from '../../Common/PageSEO';
import { SEO_META } from '../../../config/seoMeta';

const Consulting = () => {
  const seo = SEO_META.consulting;
  return (
    <>
      <PageSEO title={seo.title} description={seo.description} path={seo.path} />
      <ConsultingNew />
    </>
  );
};

export default Consulting;