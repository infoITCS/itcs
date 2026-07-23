import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import PageSEO from '../Common/PageSEO'
import MicrosoftLayout from './MicrosoftLayout'
import { MicrosoftLogo, SERVICE_LOGOS } from './BrandMarks'
import { MS_SOLUTIONS } from './data'
import itcsLogo from '../../assets/logos/itcsLogo.webp'
import './MicrosoftLandingPage.scss'

const MicrosoftLandingPage = ({ slug }) => {
  const page = MS_SOLUTIONS[slug]
  if (!page) return null

  const ServiceLogo = SERVICE_LOGOS[page.serviceLogoKey] || MicrosoftLogo

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `https://www.itcs.com.pk${page.path}#webpage`,
        url: `https://www.itcs.com.pk${page.path}`,
        name: page.metaTitle,
        description: page.metaDescription,
        isPartOf: {
          '@type': 'WebSite',
          name: 'ITCS',
          url: 'https://www.itcs.com.pk',
        },
        about: {
          '@type': 'Service',
          name: page.h1,
          provider: {
            '@type': 'Organization',
            name: 'ITCS',
            url: 'https://www.itcs.com.pk',
          },
          areaServed: 'Pakistan',
          brand: {
            '@type': 'Brand',
            name: 'Microsoft',
          },
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Microsoft Solutions',
            item: 'https://www.itcs.com.pk/microsoft',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: page.navLabel,
            item: `https://www.itcs.com.pk${page.path}`,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: page.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.a,
          },
        })),
      },
    ],
  }

  return (
    <MicrosoftLayout>
      <div className="ms-page" style={{ '--page-accent': page.accent }}>
        <PageSEO
          title={page.metaTitle}
          description={page.metaDescription}
          path={page.path}
        />
        <Helmet>
          <script type="application/ld+json">{JSON.stringify(schema)}</script>
        </Helmet>

        <section className="ms-hero">
          <div className="ms-hero__inner">
            <p className="ms-eyebrow">{page.eyebrow}</p>

            <div className="ms-logo-row" aria-label="Featured brands">
              <div className="ms-logo-chip">
                <img src={itcsLogo} alt="ITCS logo" width="100" height="55" decoding="async" />
              </div>
              <div className="ms-logo-chip">
                <MicrosoftLogo />
                <span>Microsoft</span>
              </div>
              <div className="ms-logo-chip ms-logo-chip--service">
                <ServiceLogo />
                <span>{page.serviceBrand}</span>
              </div>
            </div>

            <h1>{page.h1}</h1>
            <p className="ms-lead">{page.lead}</p>

            <div className="ms-cta-row">
              <Link className="ms-btn ms-btn--primary" to={page.primaryCta.href}>
                {page.primaryCta.label}
              </Link>
              <Link className="ms-btn ms-btn--ghost" to={page.secondaryCta.href}>
                {page.secondaryCta.label}
              </Link>
            </div>
          </div>
        </section>

        <section className="ms-section" aria-labelledby="ms-products-heading">
          <div className="ms-section__inner">
            <h2 id="ms-products-heading">{page.headings.h2Products}</h2>
            <p className="ms-section__intro">
              Highlighted Microsoft products and services under this solution area that ITCS can
              implement, license-advise on, and support.
            </p>
            <ul className="ms-product-grid">
              {page.products.map((product) => (
                <li key={product.name}>
                  <h3>{product.name}</h3>
                  <p>{product.desc}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="ms-section ms-section--alt" aria-labelledby="ms-benefits-heading">
          <div className="ms-section__inner">
            <h2 id="ms-benefits-heading">{page.headings.h2Benefits}</h2>
            <ul className="ms-benefit-list">
              {page.benefits.map((item) => (
                <li key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="ms-section" aria-labelledby="ms-how-heading">
          <div className="ms-section__inner">
            <h2 id="ms-how-heading">{page.headings.h2How}</h2>
            <ol className="ms-steps">
              {page.steps.map((step, index) => (
                <li key={step.title}>
                  <span className="ms-steps__num" aria-hidden="true">
                    {index + 1}
                  </span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="ms-intent" aria-labelledby="ms-intent-heading">
          <div className="ms-intent__inner">
            <h2 id="ms-intent-heading">{page.intentBlock.title}</h2>
            <p>{page.intentBlock.body}</p>
            <Link className="ms-btn ms-btn--primary" to={page.primaryCta.href}>
              {page.primaryCta.label}
            </Link>
          </div>
        </section>

        <section className="ms-section" aria-labelledby="ms-faq-heading">
          <div className="ms-section__inner">
            <h2 id="ms-faq-heading">{page.headings.h2Faq}</h2>
            <div className="ms-faq">
              {page.faqs.map((faq) => (
                <details key={faq.q}>
                  <summary>{faq.q}</summary>
                  <div className="ms-faq__body">
                    <h3 className="ms-faq__visually-hidden">{faq.q}</h3>
                    <p>{faq.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="ms-section ms-section--alt" aria-labelledby="ms-related-heading">
          <div className="ms-section__inner">
            <h2 id="ms-related-heading">Explore related Microsoft solution areas</h2>
            <ul className="ms-related">
              {page.related.map((relatedSlug) => {
                const related = MS_SOLUTIONS[relatedSlug]
                if (!related) return null
                return (
                  <li key={relatedSlug}>
                    <Link to={related.path}>
                      <span>{related.navLabel}</span>
                      <em>{related.serviceBrand}</em>
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

export default MicrosoftLandingPage
