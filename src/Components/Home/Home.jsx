import React from 'react'
import HomeHero from './HomeHero/HomeHero'
import HomeFeature from './HomeFeature/HomeFeature'
import HomeSolutions from './HomeSolutions/HomeSolutions'
import HomeStats from './HomeStats/HomeStats'
import HomePartners from './HomePartners/HomePartners'
import HomeTestimonials from './HomeTestimonials/HomeTestimonials'
import Blog from '../Home/Blog/HomeBlog'
import PageSEO from '../Common/PageSEO'
import { SEO_META } from '../../config/seoMeta'


const Home = () => {
  const seo = SEO_META.home
  return (
    <>
      <PageSEO title={seo.title} description={seo.description} path={seo.path} />
      <HomeHero />
      <HomeSolutions />
      <HomeFeature />
      <HomeStats />
      <HomePartners />
      <HomeTestimonials />
      <Blog />
    
    </>
  )
}

export default Home