import React, { Suspense, lazy, useEffect, useRef, useState } from 'react'
import HomeHero from './HomeHero/HomeHero'
import PageSEO from '../Common/PageSEO'
import { SEO_META } from '../../config/seoMeta'

// Below-the-fold sections are split out of the initial bundle. On a throttled
// phone their parse/eval cost was landing directly in TBT and LCP.
const HomeSolutions = lazy(() => import('./HomeSolutions/HomeSolutions'))
const HomeFeature = lazy(() => import('./HomeFeature/HomeFeature'))
const HomeStats = lazy(() => import('./HomeStats/HomeStats'))
const HomePartners = lazy(() => import('./HomePartners/HomePartners'))
const HomeTestimonials = lazy(() => import('./HomeTestimonials/HomeTestimonials'))
const Blog = lazy(() => import('../Home/Blog/HomeBlog'))

const SECTIONS = [
  { key: 'solutions', minHeight: '720px', Comp: HomeSolutions },
  { key: 'feature', minHeight: '640px', Comp: HomeFeature },
  { key: 'stats', minHeight: '360px', Comp: HomeStats },
  { key: 'partners', minHeight: '420px', Comp: HomePartners },
  { key: 'testimonials', minHeight: '560px', Comp: HomeTestimonials },
  { key: 'blog', minHeight: '720px', Comp: Blog },
]

/**
 * Reveals one extra section per idle callback once the page has loaded.
 *
 * Mounting every chunk in a single tick produced one long main-thread task and
 * pushed TBT from ~140ms to ~350ms, so the safety net is deliberately
 * staggered. Crawlers and slow connections still receive the full page, and the
 * work is spread across idle periods instead of landing in one burst.
 */
function useIdleReveal(total) {
  const [revealed, setRevealed] = useState(0);
  useEffect(() => {
    let timer;
    let cancelled = false;
    const step = () => {
      if (cancelled) return;
      setRevealed((n) => {
        if (n >= total) return n;
        schedule();
        return n + 1;
      });
    };
    const schedule = () => {
      if ('requestIdleCallback' in window) {
        timer = window.requestIdleCallback(step, { timeout: 2000 });
      } else {
        timer = window.setTimeout(step, 400);
      }
    };
    const start = () => setTimeout(schedule, 1500);
    if (document.readyState === 'complete') start();
    else window.addEventListener('load', start, { once: true });
    return () => {
      cancelled = true;
      if ('cancelIdleCallback' in window) window.cancelIdleCallback(timer);
      else window.clearTimeout(timer);
    };
  }, [total]);
  return revealed;
}

const Section = ({ minHeight, revealed, children }) => {
  const ref = useRef(null);
  const [near, setNear] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: '500px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const ready = near || revealed;
  return (
    <div ref={ref} style={{ minHeight, contentVisibility: 'auto', containIntrinsicSize: minHeight }}>
      {ready && <Suspense fallback={null}>{children}</Suspense>}
    </div>
  );
};

const Home = () => {
  const seo = SEO_META.home
  const revealed = useIdleReveal(SECTIONS.length);
  return (
    <>
      <PageSEO title={seo.title} description={seo.description} path={seo.path} />
      <HomeHero />
      {SECTIONS.map(({ key, minHeight, Comp }, i) => (
        <Section key={key} minHeight={minHeight} revealed={revealed > i}>
          <Comp />
        </Section>
      ))}
    </>
  )
}

export default Home
