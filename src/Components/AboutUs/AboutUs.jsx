import React from 'react'
import AboutHero from './AboutHero/AboutHero'
import AboutStory from './AboutStory/AboutStory'
import AboutValues from './AboutValues/AboutValues'
import AboutTeam from './AboutTeam/AboutTeam'
import PageSEO from '../Common/PageSEO'
import { SEO_META } from '../../config/seoMeta'

const AboutUs = () => {
  const seo = SEO_META.about
  return (
    <>
      <PageSEO title={seo.title} description={seo.description} path={seo.path} />
      <AboutHero />
      <AboutStory />
      <AboutValues />
      <AboutTeam />
    </>
  )
}

export default AboutUs