import React from 'react'
import CareerHero from './CareerHero/CareerHero'
import CareerBenefits from './CareerBenefits/CareerBenefits'
import CareerPositions from './CareerPositions/CareerPositions'
import PageSEO from '../Common/PageSEO'
import { SEO_META } from '../../config/seoMeta'

const Careers = () => {
  const seo = SEO_META.careers
  return (
    <>
      <PageSEO title={seo.title} description={seo.description} path={seo.path} />
      <CareerHero />
      <CareerBenefits />
      <CareerPositions />
    </>
  )
}

export default Careers