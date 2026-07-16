import React from 'react';
import NetworkNew from './NetworkNew';
import PageSEO from '../../Common/PageSEO';
import { SEO_META } from '../../../config/seoMeta';

const Network = () => {
  const seo = SEO_META.network;
  return (
    <>
      <PageSEO title={seo.title} description={seo.description} path={seo.path} />
      <NetworkNew />
    </>
  );
};

export default Network;