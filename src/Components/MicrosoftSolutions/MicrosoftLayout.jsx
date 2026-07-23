import { Link, NavLink } from 'react-router-dom'
import itcsLogo from '../../assets/logos/itcsLogo.webp'
import { MicrosoftLogo } from './BrandMarks'
import { MS_SOLUTION_LIST } from './data'
import './MicrosoftLayout.scss'

/**
 * Isolated chrome for Microsoft solution landings — not the main site Header/Footer.
 */
const MicrosoftLayout = ({ children }) => {
  return (
    <div className="ms-solutions">
      <a className="ms-skip" href="#ms-main">
        Skip to content
      </a>

      <header className="ms-topbar">
        <div className="ms-topbar__inner">
          <div className="ms-brands" aria-label="Partner brands">
            <Link to="/microsoft" className="ms-brands__itcs">
              <img src={itcsLogo} alt="ITCS logo" width="120" height="66" decoding="async" />
            </Link>
            <span className="ms-brands__divider" aria-hidden="true" />
            <div className="ms-brands__ms">
              <MicrosoftLogo />
              <span>Microsoft Solutions</span>
            </div>
          </div>
          <div className="ms-topbar__actions">
            <Link to="/" className="ms-link-quiet">
              Main website
            </Link>
            <Link to="/contact" className="ms-btn ms-btn--primary">
              Contact ITCS
            </Link>
          </div>
        </div>
      </header>

      <nav className="ms-subnav" aria-label="Microsoft solution areas">
        <div className="ms-subnav__inner">
          {MS_SOLUTION_LIST.map((item) => (
            <NavLink
              key={item.slug}
              to={item.path}
              className={({ isActive }) =>
                `ms-subnav__link${isActive ? ' is-active' : ''}`
              }
            >
              {item.navLabel}
            </NavLink>
          ))}
        </div>
      </nav>

      <main id="ms-main" className="ms-main">
        {children}
      </main>

      <footer className="ms-footer">
        <div className="ms-footer__inner">
          <div className="ms-footer__brands">
            <img src={itcsLogo} alt="ITCS" width="90" height="50" decoding="async" />
            <MicrosoftLogo />
            <span>ITCS — Microsoft technology partner solutions</span>
          </div>
          <ul className="ms-footer__links">
            {MS_SOLUTION_LIST.map((item) => (
              <li key={item.slug}>
                <Link to={item.path}>{item.navLabel}</Link>
              </li>
            ))}
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/privacy-policy">Privacy</Link>
            </li>
          </ul>
          <p className="ms-footer__note">
            Microsoft, Copilot, Azure, Dynamics 365, Power Platform, and Surface are trademarks of
            Microsoft Corporation. ITCS is an independent technology partner.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default MicrosoftLayout
