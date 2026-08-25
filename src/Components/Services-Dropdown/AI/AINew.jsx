import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../_shared/service-common.scss';
import './AINew.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faRobot,
  faKey,
  faChartLine,
  faClipboardCheck,
  faShieldHalved,
  faCogs,
  faGraduationCap,
  faLock,
  faBuilding,
  faCode,
  faGlobe,
  faMobileScreen,
  faLayerGroup,
  faDatabase,
} from '@fortawesome/free-solid-svg-icons';
import PartnerLogos from '../_shared/PartnerLogos/PartnerLogos';
import { faMicrosoft } from '@fortawesome/free-brands-svg-icons';
import aiImg from 'assets/images/Consulting-images/business-consulting-new.webp';

const aiPartners = [
  {
    icon: faMicrosoft,
    name: 'Microsoft Copilot & Power Platform',
    type: 'Gold Partner',
    description:
      'Enterprise Copilot licensing (Microsoft 365, Sales, Security) and Power BI / Power Automate with AI Builder.',
    status: 'Verified Partner',
  },
  {
    icon: faBuilding,
    name: 'Anthropic Claude Enterprise',
    type: 'Enterprise AI',
    description:
      'Claude Enterprise procurement and governed deployment with data isolation and zero-retention aligned to corporate policy.',
    status: 'Enterprise Ready',
  },
  {
    icon: faRobot,
    name: 'OpenAI ChatGPT Enterprise',
    type: 'Enterprise AI',
    description:
      'ChatGPT Enterprise and Team licensing with secure workspace setup, admin controls, and adoption support for business teams.',
    status: 'Enterprise Ready',
  },
  {
    icon: faCode,
    name: 'Cursor & GitHub Copilot',
    type: 'Developer AI',
    description:
      'Cursor and GitHub Copilot Business seats for development teams — onboarding, secure usage patterns, and enablement programs.',
    status: 'Developer Enablement',
  },
];

const enterpriseLicenses = [
  { name: 'Microsoft Copilot', detail: 'Microsoft 365, Copilot for Sales, Copilot for Security' },
  { name: 'Anthropic Claude Enterprise', detail: 'Enterprise seats with governed data controls' },
  { name: 'OpenAI ChatGPT Enterprise / Team', detail: 'Business workspace licensing and admin setup' },
  { name: 'Cursor', detail: 'AI code editor for development teams' },
  { name: 'GitHub Copilot Business', detail: 'AI-assisted coding across your repositories' },
  { name: 'Google Gemini for Workspace', detail: 'Enterprise AI within Google Workspace' },
  { name: 'Perplexity Enterprise', detail: 'Available on requirement' },
  { name: 'Specialized AI tools', detail: 'Procured on requirement based on security and compliance needs' },
];

const AIHero = () => {
  const navigate = useNavigate();

  return (
    <section className="ai-hero-section">
      <div className="ai-container">
        <div className="hero-badge">
          <FontAwesomeIcon icon={faRobot} />
          <span>ENTERPRISE AI SERVICES</span>
        </div>
        <h1 className="hero-title">
          Enterprise AI Services<br />
          <span className="gradient-text">&amp; Licensing</span>
        </h1>
        <p className="hero-description">
          Help your leadership team adopt AI safely — with official enterprise licenses for
          Microsoft Copilot, Claude, ChatGPT, Cursor, and other tools on requirement,
          plus governed implementation, automation, and training that drives real utilization.
        </p>
        <div className="hero-actions">
          <button className="btn-secondary" onClick={() => navigate('/contact?intent=ai-services')}>
            Book an AI Strategy Call
            <span>→</span>
          </button>
        </div>
      </div>
    </section>
  );
};

const AISection2 = () => {
  const highlights = [
    { icon: faKey, title: 'AI Licensing', desc: 'Copilot, Claude, ChatGPT, Cursor & more on requirement' },
    { icon: faChartLine, title: 'Microsoft AI', desc: 'Power BI & Power Automate with AI Builder' },
    { icon: faShieldHalved, title: 'AI Governance', desc: 'Data isolation & zero-retention setup' },
    { icon: faGraduationCap, title: 'Adoption', desc: 'Workshops and developer enablement' },
  ];

  return (
    <div className="aiSection2">
      <div className="ai-container">
        <div className="aiSection2-wrapper">
          <div className="content-side">
            <h2>From AI ambition to governed execution</h2>
            <p>
              CTOs, IT Directors, and operations leaders need more than tool demos — they need
              licensed seats, secure configuration, clear ROI, and teams that actually use AI.
              ITCS delivers enterprise AI end to end: procurement, readiness assessments,
              Microsoft AI solutions, custom automation, and adoption programs.
            </p>
            <p>
              We help you avoid shelfware. Before you buy seats, we map infrastructure, data
              readiness, and high-value use cases. After deployment, we train your workforce and
              measure utilization so licensing spend converts into business outcomes.
            </p>
            <p>
              Looking for tailored solutions and licensing?{' '}
              <Link to="/microsoft/enterprise-ai-services">Explore our Enterprise AI Services</Link>.
            </p>

            <div className="services-list">
              {highlights.map((item, idx) => (
                <div className="service-item" key={idx}>
                  <div className="service-icon">
                    <FontAwesomeIcon icon={item.icon} />
                  </div>
                  <div>
                    <strong>{item.title}</strong>
                    <span>{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="image-side">
            <img
              src={aiImg}
              alt="Enterprise AI services and licensing consulting at ITCS"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const AILicensing = () => {
  return (
    <section className="ai-licensing-section">
      <div className="ai-container">
        <div className="section-header">
          <h2>Enterprise AI Licenses We Procure</h2>
          <p>
            Official seats and subscriptions with centralized billing — plus additional tools
            sourced on requirement to match your security, compliance, and team needs.
          </p>
        </div>
        <ul className="ai-license-list">
          {enterpriseLicenses.map((item) => (
            <li key={item.name} className="ai-license-item">
              <strong>{item.name}</strong>
              <span>{item.detail}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

const AIFeatures = () => {
  const features = [
    {
      icon: faKey,
      title: 'Enterprise AI Licensing & Procurement',
      description:
        'Official seats for Microsoft Copilot, Claude Enterprise, ChatGPT Enterprise, Cursor, GitHub Copilot, Gemini, and other AI tools on requirement — with centralized billing.',
    },
    {
      icon: faChartLine,
      title: 'Microsoft AI Solutions',
      description:
        'Power BI for AI-assisted predictive analytics and Power Automate with AI Builder for intelligent document processing.',
    },
    {
      icon: faClipboardCheck,
      title: 'AI Strategy & Readiness Assessments',
      description:
        'Infrastructure audits, ROI mapping, and data readiness evaluations before you buy seats or deploy tools.',
    },
    {
      icon: faLock,
      title: 'Data Security & AI Governance',
      description:
        'Data isolation, zero-retention setup, and controls so corporate data is not used to train public LLM models.',
    },
    {
      icon: faCogs,
      title: 'Custom AI Workflow Automation',
      description:
        'Intelligent workflows with Power Automate, custom LLM wrappers, and AI agents for HR, finance, and IT support.',
    },
    {
      icon: faGraduationCap,
      title: 'Employee Adoption & Training',
      description:
        'Prompt workshops, Copilot and ChatGPT onboarding, and Cursor / GitHub Copilot enablement for high utilization.',
    },
  ];

  return (
    <section className="ai-features-section">
      <div className="ai-container">
        <div className="section-header">
          <h2>Our Enterprise AI Services</h2>
          <p>Licensing, implementation, governance, automation, and adoption — one accountable partner</p>
        </div>
        <div className="features-grid">
          {features.map((feature, idx) => (
            <div className="feature-card" key={idx}>
              <div className="card-icon">
                <FontAwesomeIcon icon={feature.icon} />
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AIDevPlatforms = () => {
  const platforms = [
    {
      icon: faGlobe,
      title: 'AI-Powered Web Platforms',
      description:
        'Custom websites, customer portals, and internal web apps with embedded AI assistants, smart search, document intelligence, and personalized experiences.',
      points: ['AI chat & support widgets', 'Intelligent search & recommendations', 'Document Q&A and knowledge bases'],
    },
    {
      icon: faMobileScreen,
      title: 'AI-Powered Mobile Apps',
      description:
        'iOS and Android applications with on-device and cloud AI features — from conversational assistants to image recognition and workflow automation.',
      points: ['Cross-platform app delivery', 'Voice & vision AI features', 'Secure API / LLM backends'],
    },
    {
      icon: faLayerGroup,
      title: 'Custom LLM Integrations',
      description:
        'Connect Claude, ChatGPT, Azure OpenAI, Gemini, and other models into your web and app products with enterprise auth, logging, and governance.',
      points: ['API wrappers & agents', 'Role-based access & audit trails', 'Cost & usage controls'],
    },
    {
      icon: faDatabase,
      title: 'Data-Connected AI Experiences',
      description:
        'Ground AI responses in your business data — CRMs, ERPs, SharePoint, databases, and knowledge stores — so web and app users get accurate answers.',
      points: ['RAG / knowledge grounding', 'Secure data connectors', 'Private deployment options'],
    },
  ];

  return (
    <section className="ai-dev-platforms-section">
      <div className="ai-container">
        <div className="section-header">
          <h2>AI Development Platforms — Web &amp; App</h2>
          <p>
            Beyond licensing and automation — we design and build AI-enabled web platforms and
            mobile applications your customers and teams actually use.
          </p>
        </div>
        <div className="ai-dev-grid">
          {platforms.map((item) => (
            <article className="ai-dev-card" key={item.title}>
              <div className="card-icon">
                <FontAwesomeIcon icon={item.icon} />
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <ul>
                {item.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

const AISection4 = () => {
  const benefits = [
    {
      title: 'Licensing without procurement chaos',
      description:
        'Centralized quoting and consolidated billing for Copilot, Claude, ChatGPT, Cursor, GitHub Copilot, and other approved AI tools on requirement.',
    },
    {
      title: 'AI that respects your data boundaries',
      description:
        'Governance and zero-retention controls your security and legal teams can defend to the board.',
    },
    {
      title: 'Adoption that protects ROI',
      description:
        'Training and enablement so licenses are used — and outcomes are visible to the C-suite.',
    },
    {
      title: 'Strategy before spend',
      description:
        'Readiness assessments and ROI mapping so you buy the right seats for the right use cases.',
    },
  ];

  return (
    <div className="aiSection4">
      <div className="ai-container">
        <div className="section-header">
          <h2>Why Choose ITCS for Enterprise AI?</h2>
          <p>Built for CTOs, IT Directors, and operations leaders</p>
        </div>
        <div className="benefits-grid">
          {benefits.map((benefit, idx) => (
            <div className="benefit-item" key={idx}>
              <div className="benefit-check">✓</div>
              <div className="benefit-text">
                <strong>{benefit.title}</strong>
                <span>{benefit.description}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const AICTA = () => {
  const navigate = useNavigate();

  return (
    <section className="ai-cta">
      <div className="ai-container">
        <div className="cta-container">
          <h2>
            Ready to Adopt AI <span className="gradient-text">Without the Risk?</span>
          </h2>
          <p>
            Book a strategy call or request an enterprise AI licensing quote — we will map the
            fastest path from assessment to secure, measurable adoption.
          </p>
          <button className="btn-primary" onClick={() => navigate('/contact?intent=ai-services')}>
            Talk to an AI Expert
            <span>→</span>
          </button>
          <div className="cta-stats">
            <div className="stat-item">
              <div className="stat-number">6+</div>
              <div className="stat-label">AI Service Pillars</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-number">15+</div>
              <div className="stat-label">Years</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-number">98%</div>
              <div className="stat-label">Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const AINew = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="ai-page">
      <AIHero />
      <AISection2 />
      <AILicensing />
      <AIFeatures />
      <AIDevPlatforms />
      <PartnerLogos
        partners={aiPartners}
        heading="Enterprise AI Platforms We Support"
        subtext="Official licensing pathways and implementation expertise across leading enterprise AI tools"
      />
      <AISection4 />
      <AICTA />
    </div>
  );
};

export default AINew;
