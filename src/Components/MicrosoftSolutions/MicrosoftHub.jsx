import { Link } from 'react-router-dom'
import PageSEO from '../Common/PageSEO'
import MicrosoftLayout from './MicrosoftLayout'
import { MicrosoftLogo, SERVICE_LOGOS } from './BrandMarks'
import { MS_SOLUTION_LIST, MS_SOLUTIONS_HUB } from './data'
import itcsLogo from '../../assets/logos/itcsLogo.webp'
import './MicrosoftLandingPage.scss'

const MicrosoftHub = () => {
  return (
    <MicrosoftLayout>
      <div className="ms-page" style={{ '--page-accent': '#0078D4' }}>
        <PageSEO
          title={MS_SOLUTIONS_HUB.title}
          description={MS_SOLUTIONS_HUB.description}
          path={MS_SOLUTIONS_HUB.path}
        />

        <section className="ms-hero">
          <div className="ms-hero__inner">
            <p className="ms-eyebrow">ITCS · Microsoft Solution Areas</p>
            <div className="ms-logo-row" aria-label="Partner brands">
              <div className="ms-logo-chip">
                <img src={itcsLogo} alt="ITCS logo" width="100" height="55" decoding="async" />
              </div>
              <div className="ms-logo-chip">
                <MicrosoftLogo />
                <span>Microsoft</span>
              </div>
            </div>
            <h1>Microsoft Solutions built for your business</h1>
            <p className="ms-lead">
              Dedicated landing pages for five Microsoft solution areas — separate from the main
              ITCS site experience — with clear intent, product coverage, and next-step CTAs.
            </p>
            <div className="ms-cta-row">
              <Link className="ms-btn ms-btn--primary" to="/contact?intent=microsoft">
                Talk to ITCS
              </Link>
            </div>
          </div>
        </section>

        <section className="ms-section ms-section--alt" aria-labelledby="ms-hub-list">
          <div className="ms-section__inner">
            <h2 id="ms-hub-list">Choose a Microsoft solution area</h2>
            <ul className="ms-related" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
              {MS_SOLUTION_LIST.map((page) => {
                const Logo = SERVICE_LOGOS[page.serviceLogoKey] || MicrosoftLogo
                return (
                  <li key={page.slug}>
                    <Link to={page.path}>
                      <Logo />
                      <span>{page.navLabel}</span>
                      <em>{page.serviceBrand}</em>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </section>
      </div>
    </MicrosoftLayout>
  )
}

export default MicrosoftHub
