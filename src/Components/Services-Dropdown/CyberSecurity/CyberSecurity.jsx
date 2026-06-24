import React, { useEffect } from 'react';
import CyberHero from './CyberHero/CyberHero';
import CyberSection2 from './CyberSection2/CyberSection2';
import CyberSection4 from './CyberSection4/CyberSection4';
import CyberFeatures from './CyberFeatures/CyberFeatures';
import CyberCTA from './CyberCTA/CyberCTA';
import PartnerLogos from '../_shared/PartnerLogos/PartnerLogos';

const CyberSecurity = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <CyberHero />
      <CyberSection2 />
      <CyberFeatures />
      <PartnerLogos ticker />
      <CyberSection4 />
      <CyberCTA />
    </>
  );
};

export default CyberSecurity;