import React, { useEffect } from 'react';
import CloudHero from './CloudHero/CloudHero';
import CloudFeatures from './CloudFeatures/CloudFeatures';
import CloudCTA from './CloudCTA/CloudCTA';
import CloudSection2 from './CloudSection2/CloudSection2';
import CloudSection4 from './CloudSection4/CloudSection4';
import PartnerLogos from '../_shared/PartnerLogos/PartnerLogos';
import { faMicrosoft, faAws, faGoogle } from '@fortawesome/free-brands-svg-icons';
import PageSEO from '../../Common/PageSEO';
import { SEO_META } from '../../../config/seoMeta';

const cloudPartners = [
  { icon: faMicrosoft, name: 'Microsoft Azure', type: 'Gold Partner', description: 'Certified cloud solutions architect with deep expertise in Azure infrastructure, migration, and managed services.', status: 'Verified Partner' },
  { icon: faAws, name: 'Amazon Web Services', type: 'Advanced Partner', description: 'Advanced tier AWS partner delivering scalable cloud infrastructure, DevOps, and enterprise migration solutions.', status: 'Verified Partner' },
  { icon: faGoogle, name: 'Google Cloud', type: 'Partner', description: 'Specialized in GCP solutions for data analytics, machine learning, and cloud-native application development.', status: 'Verified Partner' },
];

const Cloud = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const seo = SEO_META.cloud;
  return (
    <>
      <PageSEO title={seo.title} description={seo.description} path={seo.path} />
      <CloudHero />
      <CloudSection2 />
      <CloudFeatures />
      <PartnerLogos partners={cloudPartners} />
      <CloudSection4 />
      <CloudCTA />
    </>
  );
};

export default Cloud;
