import React from 'react'
import VisionHero from './VisionHero/VisionHero'
import VisionContent from './VisionContent/VisionContent'
import PageSEO from '../Common/PageSEO'
import { SEO_META } from '../../config/seoMeta'

const Vision = () => {
  const seo = SEO_META.missionVision
  return (
    <>
      <PageSEO title={seo.title} description={seo.description} path={seo.path} />
      <VisionHero />
      <VisionContent />
    </>
  )
}

export default Vision